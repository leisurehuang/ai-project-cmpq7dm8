import Phaser from 'phaser';

export enum EnemyState { FORMATION, DIVING }
export enum EnemyType { BEE, BUTTERFLY, BOSS }

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  public enemyType: EnemyType;
  public points: number;
  public state: EnemyState = EnemyState.FORMATION;
  
  // 记录阵型初始位置，俯冲完需要归位
  private formationX: number = 0;
  private formationY: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type: EnemyType, points: number) {
    super(scene, x, y, texture);
    this.enemyType = type;
    this.points = points;
    
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    this.setImmovable(true);
    this.body.setSize(this.width * 0.8, this.height * 0.8); // 缩小一点碰撞盒，使判定更公平
  }

  /**
   * 保存当前在阵型中的坐标
   */
  public saveFormationPosition(): void {
    this.formationX = this.x;
    this.formationY = this.y;
  }

  /**
   * 脱离阵型，对玩家发起俯冲攻击
   */
  public startDive(playerX: number): void {
    if (this.state === EnemyState.DIVING) return;
    
    this.state = EnemyState.DIVING;
    this.saveFormationPosition();
    
    // 计算一个简单的俯冲路径：向下并朝向玩家当前X坐标
    const targetX = playerX;
    const targetY = this.scene.cameras.main.height + 50;

    // 使用 tween 模拟俯冲轨迹
    this.scene.tweens.add({
      targets: this,
      x: targetX,
      y: targetY,
      duration: 1500,
      ease: 'Sine.easeIn',
      onComplete: () => {
        // 检查对象是否仍然有效（未被销毁）
        if (this.scene && this.scene.tweens) {
          this.returnToFormation();
        }
      }
    });
  }

  /**
   * 俯冲结束后（飞出屏幕底端），回到阵型顶部重新出现
   */
  private returnToFormation(): void {
    // 检查对象是否仍然有效（未被销毁）
    if (!this.scene || !this.scene.tweens) return;
    
    // 从屏幕顶部重新出现
    this.y = -20;
    
    this.scene.tweens.add({
      targets: this,
      x: this.formationX,
      y: this.formationY,
      duration: 1000,
      ease: 'Linear',
      onComplete: () => {
        // 再次检查有效性
        if (this.scene) {
          this.state = EnemyState.FORMATION;
        }
      }
    });
  }

  /**
   * 重写销毁方法，清理所有正在进行的tween
   */
  public destroy(): void {
    // 取消所有正在进行的tween
    if (this.scene && this.scene.tweens) {
      this.scene.tweens.killTweensOf(this);
    }
    
    // 调用父类的销毁方法
    super.destroy();
  }
}
