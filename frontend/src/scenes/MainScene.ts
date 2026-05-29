import Phaser from 'phaser';
import Player from '../entities/Player';
import EnemySwarm from '../systems/EnemySwarm';
import CollisionSystem from '../systems/CollisionSystem';
import GameManager from '../managers/GameManager';
import Hud from '../ui/Hud';
import { Images, Audio } from '../config/AssetKeys';
import { GameSettings } from '../config/GameSettings';

export class MainScene extends Phaser.Scene {
  private player!: Player;
  private enemySwarm!: EnemySwarm;
  private collisionSystem!: CollisionSystem;
  private hud!: Hud;
  private enemyBullets!: Phaser.Physics.Arcade.Group;
  private isGameOver!: boolean;

  constructor() {
    super({ key: 'MainScene' });
  }

  create(): void {
    this.isGameOver = false;
    
    // 初始化物理组
    this.enemyBullets = this.physics.add.group();

    // 实例化核心实体
    this.player = new Player(this, this.cameras.main.width / 2, this.cameras.main.height - 50);
    this.enemySwarm = new EnemySwarm(this);
    this.collisionSystem = new CollisionSystem(this);
    this.hud = new Hud(this);

    // 阵型难度递增设置
    this.enemySwarm.increaseDifficulty(GameManager.currentLevel);
    this.enemySwarm.createFormation();

    // 配置碰撞检测
    this.collisionSystem.addPlayerBulletEnemyOverlap(
      this.player.getBullets(),
      this.enemySwarm.getEnemyGroup(),
      this.hitEnemy,
      this
    );

    this.collisionSystem.addEnemyPlayerOverlap(
      this.player.getSprite(),
      this.enemySwarm.getEnemyGroup(),
      this.hitPlayer,
      this
    );

    // 注册积分管理器回调
    GameManager.scoreManager.onUpdate = (score, lives) => {
      this.hud.updateDisplay(score, lives);
    };
    this.hud.updateDisplay(GameManager.scoreManager.getScore(), GameSettings.INITIAL_LIVES);
  }

  update(_time: number, delta: number): void {
    if (this.isGameOver) return;

    this.player.update(delta);
    this.enemySwarm.update(delta);

    // 检查是否通关
    if (this.enemySwarm.getActiveCount() === 0) {
      this.nextLevel();
    }
  }

  /**
   * 玩家子弹击中敌机
   */
  private hitEnemy(_playerBullet: Phaser.GameObjects.GameObject, enemyObj: Phaser.GameObjects.GameObject): void {
    const bullet = _playerBullet as Phaser.Physics.Arcade.Image;
    const enemy = enemyObj as Phaser.Physics.Arcade.Image;

    bullet.destroy(); // 销毁子弹
    enemy.destroy();  // 销毁敌机 (实际开发中这里调用敌机自身的 die() 方法)

    // 播放爆炸音效
    this.sound.play(Audio.SFX_EXPLOSION_ENEMY);

    // 增加分数 (此处需根据真实敌机类型获取分值，暂用 50)
    GameManager.scoreManager.addScore(50);
  }

  /**
   * 敌机撞击/子弹击中玩家
   */
  private hitPlayer(_playerObj: Phaser.GameObjects.GameObject, _enemyObj: Phaser.GameObjects.GameObject): void {
    if (!this.player.isAlive() || this.player.isInvincible()) return;

    // 扣除生命
    const remainingLives = GameManager.scoreManager.loseLife();
    this.sound.play(Audio.SFX_EXPLOSION_PLAYER);

    if (remainingLives <= 0) {
      this.gameOver();
    } else {
      // 触发玩家无敌帧闪烁效果
      this.player.triggerInvincibility();
    }
  }

  /**
   * 通关逻辑
   */
  private nextLevel(): void {
    GameManager.advanceLevel();
    this.enemySwarm.increaseDifficulty(GameManager.currentLevel);
    // 重新生成阵型
    this.enemySwarm.createFormation();
  }

  /**
   * 游戏结束
   */
  private gameOver(): void {
    this.isGameOver = true;
    this.player.die();
    this.physics.pause(); // 暂停所有物理活动
    
    // 延迟跳转结算场景
    this.time.delayedCall(1500, () => {
      this.scene.start('GameOverScene');
    });
  }
}
