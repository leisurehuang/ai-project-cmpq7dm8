import Phaser from 'phaser';
import Enemy, { EnemyState, EnemyType } from '../entities/Enemy';
import { Images } from '../config/AssetKeys';

export default class EnemySwarm {
  private scene: Phaser.Scene;
  private enemies: Enemy[];
  private enemyGroup: Phaser.Physics.Arcade.Group;
  
  // 阵列运动参数
  private swarmSpeed: number = 30; // 初始平移速度
  private dropDistance: number = 10; // 每次下压距离
  private direction: 1 | -1 = 1; // 1向右, -1向左
  private diveProbability: number = 0.002; // 每帧每架敌机发起俯冲的概率

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.enemies = [];
    this.enemyGroup = scene.physics.add.group();
  }

  /**
   * 生成初始敌机阵列
   */
  public createFormation(): void {
    const startX = 100;
    const startY = 80;
    const spacingX = 48;
    const spacingY = 40;

    // 纹理映射：敌机类型 -> 资源 Key
    const textureMap: Record<number, string> = {
      [EnemyType.BEE]: Images.ENEMY_BEE,
      [EnemyType.BUTTERFLY]: Images.ENEMY_BUTTERFLY,
      [EnemyType.BOSS]: Images.ENEMY_BOSS,
    };

    // 阵型布局：顶层蜜蜂，中层蝴蝶，底层Boss
    const layout = [
      { type: EnemyType.BEE, rows: 2, cols: 10, points: 50 },
      { type: EnemyType.BUTTERFLY, rows: 2, cols: 10, points: 80 },
      { type: EnemyType.BOSS, rows: 1, cols: 6, points: 150 }
    ];

    // 使用 currentRow 追踪全局行号，避免不同种类敌机层级错乱
    let currentRow = 0;
    layout.forEach(layer => {
      for (let r = 0; r < layer.rows; r++) {
        for (let c = 0; c < layer.cols; c++) {
          const x = startX + c * spacingX;
          const y = startY + currentRow * spacingY;
          
          const enemy = new Enemy(
            this.scene,
            x,
            y,
            textureMap[layer.type],
            layer.type,
            layer.points
          );
          this.enemies.push(enemy);
          this.enemyGroup.add(enemy);
        }
        currentRow++;
      }
    });
  }

  /**
   * 在 update 周期中被调用，驱动整体阵列移动和 AI
   * @param delta 上一帧到这一帧的时间差(ms)
   */
  public update(delta: number): void {
    let hitEdge = false;
    const playerX = this.scene.cameras.main.width / 2; // 简化：使用屏幕中心作为俯冲目标

    this.enemies.forEach(enemy => {
      if (enemy.active && enemy.state !== EnemyState.DIVING) {
        // 1. 水平平移
        enemy.x += this.direction * (this.swarmSpeed / 1000) * delta;
        
        // 2. 边界检测
        if (enemy.x < 50 || enemy.x > 750) {
          hitEdge = true;
        }

        // 3. 随机俯冲判定
        if (Phaser.Math.FloatBetween(0, 1) < this.diveProbability) {
          enemy.startDive(playerX);
        }
      }
    });

    // 整体下压逻辑
    if (hitEdge) {
      this.direction = this.direction === 1 ? -1 : 1;
      this.enemies.forEach(enemy => {
        if (enemy.state !== EnemyState.DIVING) {
          enemy.y += this.dropDistance;
        }
      });
    }
  }

  /**
   * 提升难度（关卡递增时调用）
   * @param level 当前关卡
   */
  public increaseDifficulty(level: number): void {
    this.swarmSpeed = 30 + (level * 10);
    this.diveProbability = 0.002 + (level * 0.0005);
  }
  
  public getActiveCount(): number {
    return this.enemies.filter(e => e.active).length;
  }

  /**
   * 获取敌机物理组，用于碰撞检测注册
   */
  public getEnemyGroup(): Phaser.Physics.Arcade.Group {
    return this.enemyGroup;
  }
}
