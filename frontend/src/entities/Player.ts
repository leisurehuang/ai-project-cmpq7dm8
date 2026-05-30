import Phaser from 'phaser';
import { Images, Audio } from '../config/AssetKeys';
import { GameSettings } from '../config/GameSettings';

export default class Player {
  private scene: Phaser.Scene;
  private sprite: Phaser.Physics.Arcade.Sprite;
  private bullets: Phaser.Physics.Arcade.Group;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private spaceKey?: Phaser.Input.Keyboard.Key;
  private isInvincibleFlag: boolean = false;
  private lastShotTime: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    
    // 物理精灵初始化
    this.sprite = scene.physics.add.sprite(x, y, Images.PLAYER_SHIP);
    this.sprite.setCollideWorldBounds(true); // 限制在世界边界内
    this.sprite.setImmovable(true); // 碰撞时不会被撞飞

    // 初始化子弹组
    this.bullets = scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 1, // 限制屏幕上只能有一发子弹 (经典复刻)
      runChildUpdate: true
    });

    // 键盘输入监听
    if (scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
      this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
  }

  public update(delta: number): void {
    if (!this.sprite.active) return;

    // 防御性判断：在无键盘环境（如嵌入式/禁用键盘API）下直接返回，避免空指针崩溃
    if (!this.cursors || !this.spaceKey) return;

    // 1. 水平移动控制
    // Arcade 物理的 setVelocityX 期望像素/秒，直接使用 GameSettings.PLAYER_SPEED
    if (this.cursors.left.isDown) {
      this.sprite.setVelocityX(-GameSettings.PLAYER_SPEED);
    } else if (this.cursors.right.isDown) {
      this.sprite.setVelocityX(GameSettings.PLAYER_SPEED);
    } else {
      this.sprite.setVelocityX(0);
    }

    // 2. 射击控制 (单发限制：池中无子弹时才可射击)
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.shoot();
    }
  }

  private shoot(): void {
    const bullet = this.bullets.getFirstDead(true, this.sprite.x, this.sprite.y - 20, Images.BULLET_PLAYER);
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.setVelocityY(-GameSettings.BULLET_SPEED);
      this.scene.sound.play(Audio.SFX_SHOOT);

      // 子弹飞出屏幕后自动回收
      this.scene.events.on('update', () => {
        if (bullet.y < 0) {
          bullet.setActive(false);
          bullet.setVisible(false);
        }
      });
    }
  }

  /**
   * 触发无敌帧状态
   */
  public triggerInvincibility(): void {
    this.isInvincibleFlag = true;
    this.sprite.setTint(0x00ff00); // 变绿色表示受伤无敌

    // 闪烁动画
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.2,
      duration: 100,
      yoyo: true,
      repeat: 10, // 闪烁10次
      onComplete: () => {
        this.isInvincibleFlag = false;
        this.sprite.clearTint();
        this.sprite.setAlpha(1);
      }
    });
  }

  public die(): void {
    this.sprite.destroy();
  }

  public getSprite(): Phaser.Physics.Arcade.Sprite { return this.sprite; }
  public getBullets(): Phaser.Physics.Arcade.Group { return this.bullets; }
  public isAlive(): boolean { return this.sprite.active; }
  public isInvincible(): boolean { return this.isInvincibleFlag; }
}
