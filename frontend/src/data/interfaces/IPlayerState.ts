/**
 * 玩家状态数据模型
 * 对应需求：玩家状态单例
 */
export default interface IPlayerState {
  /** 当前剩余生命值 */
  lives: number;

  /** 当前实时分数 */
  score: number;

  /** 是否处于被撞击后的无敌状态 */
  isInvincible: boolean;
}
