import StorageRepository from '../data/repositories/StorageRepository';

export default class ScoreManager {
  private score: number = 0;
  private lives: number = 3;
  private highScore: number = 0;
  
  // UI 更新回调
  public onUpdate: ((score: number, lives: number) => void) | null = null;

  constructor() {
    // 从持久化仓库加载最高分
    const persistedData = StorageRepository.getData();
    this.highScore = persistedData.highScore;
  }

  /**
   * 玩家击毁敌机时增加分数
   * @param points 敌机对应的分值
   */
  public addScore(points: number): void {
    this.score += points;
    
    // 实时比对最高分
    if (this.score > this.highScore) {
      this.highScore = this.score;
      // 更新本地存储
      StorageRepository.saveData({ highScore: this.highScore });
    }
    
    this.triggerUpdate();
  }

  /**
   * 玩家受击时扣除生命
   * @returns 返回剩余生命值
   */
  public loseLife(): number {
    this.lives -= 1;
    this.triggerUpdate();
    return this.lives;
  }

  /**
   * 获取当前得分
   */
  public getScore(): number {
    return this.score;
  }

  /**
   * 获取历史最高分
   */
  public getHighScore(): number {
    return this.highScore;
  }

  /**
   * 重置当前局的数据（生命和分数），用于重新开始游戏
   */
  public resetGame(): void {
    this.score = 0;
    this.lives = 3;
    this.triggerUpdate();
  }

  /**
   * 触发 UI 更新通知
   */
  private triggerUpdate(): void {
    if (this.onUpdate) {
      this.onUpdate(this.score, this.lives);
    }
  }
}
