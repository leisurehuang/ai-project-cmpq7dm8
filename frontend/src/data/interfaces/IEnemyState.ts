/**
 * 敌机行为状态枚举
 */
export enum EnemyStateType {
  /** 阵型跟随平移 */
  FORMATION = 'FORMATION',
  /** 脱离阵型俯冲攻击 */
  DIVING = 'DIVING'
}

/**
 * 敌机种类枚举
 */
export enum EnemyType {
  /** 顶层蜜蜂 (基础小兵) */
  BEE = 'BEE',
  /** 中层蝴蝶 (中级小兵) */
  BUTTERFLY = 'BUTTERFLY',
  /** 底层Boss (高级精英) */
  BOSS = 'BOSS'
}

/**
 * 敌机实例数据模型
 * 对应需求：敌机实例
 */
export default interface IEnemyState {
  /** 敌机种类 */
  type: EnemyType;

  /** 击毁后获得的分数 */
  points: number;

  /** 当前的行为状态 */
  state: EnemyStateType;

  /** X轴坐标 */
  posX: number;

  /** Y轴坐标 */
  posY: number;
  
  /** 在阵列中的网格索引（便于管理阵型） */
  gridIndex?: number;
}
