import ScoreManager from '../systems/ScoreManager';

/**
 * 游戏全局管理器
 * 负责维护跨场景的持久化状态
 */
class GameManager {
  public scoreManager: ScoreManager;
  
  // 当前的游戏进度数据 (内存状态)
  public currentLevel: number;
  
  constructor() {
    this.scoreManager = new ScoreManager();
    this.currentLevel = 1;
  }

  /**
   * 获取历史最高分
   */
  public getHighScore(): number {
    return this.scoreManager.getHighScore();
  }

  /**
   * 准备开始新游戏
   */
  public startNewGame(): void {
    this.currentLevel = 1;
    this.scoreManager.resetGame();
  }

  /**
   * 进入下一关
   */
  public advanceLevel(): void {
    this.currentLevel++;
    // 可在此处根据 currentLevel 触发难度提升
  }
}

// 导出单例供全局使用
export default new GameManager();
