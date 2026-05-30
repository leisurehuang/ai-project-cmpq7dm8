import Phaser from 'phaser';

export default class CollisionSystem {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * 添加玩家子弹与敌机阵列的碰撞检测
   * @param playerBullets 玩家子弹物理组
   * @param enemies 敌机物理组
   * @param callback 碰撞发生时的回调函数
   */
  public addPlayerBulletEnemyOverlap(
    playerBullets: Phaser.Physics.Arcade.Group,
    enemies: Phaser.Physics.Arcade.Group,
    callback: (bullet: Phaser.GameObjects.GameObject, enemy: Phaser.GameObjects.GameObject) => void
  ) {
    this.scene.physics.add.overlap(
      playerBullets,
      enemies,
      callback as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this.scene
    );
  }

  /**
   * 添加敌机(或敌机子弹)与玩家的碰撞检测
   * @param player 玩家游戏对象
   * @param enemyObjects 敌机或敌机子弹物理组
   * @param callback 碰撞发生时的回调函数
   */
  public addEnemyPlayerOverlap(
    player: any,
    enemyObjects: Phaser.Physics.Arcade.Group,
    callback: (playerObj: Phaser.GameObjects.GameObject, enemyObj: Phaser.GameObjects.GameObject) => void
  ) {
    this.scene.physics.add.overlap(
      player,
      enemyObjects,
      callback as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this.scene
    );
  }
}
