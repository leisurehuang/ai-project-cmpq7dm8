/**
 * 本地持久化对象数据模型
 * 对应需求：本地持久化对象
 */
export default interface IPersistedState {
  /** 历史最高得分记录 */
  highScore: number;
}
