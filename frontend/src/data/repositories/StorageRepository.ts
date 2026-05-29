import IPersistedState from '../interfaces/IPersistedState';

/**
 * 本地存储仓库
 * 负责 LocalStorage 的读写与基础防篡改校验
 */
class StorageRepository {
  // 存储在 LocalStorage 中的键名
  private readonly STORAGE_KEY = 'galaga_tribute_data';
  private readonly SIGN_KEY = 'galaga_tribute_sign';

  constructor() {
    // 初始化时确保存储中有默认数据
    this.initialize();
  }

  /**
   * 获取持久化数据
   * @returns IPersistedState
   */
  public getData(): IPersistedState {
    const rawData = localStorage.getItem(this.STORAGE_KEY);
    const rawSign = localStorage.getItem(this.SIGN_KEY);

    if (!rawData) {
      return this.getDefaultData();
    }

    try {
      const parsedData: IPersistedState = JSON.parse(rawData);
      
      // 安全校验：防止用户在控制台随意篡改分数
      if (this.hashData(parsedData.highScore.toString()) !== rawSign) {
        console.warn('检测到分数数据异常，已恢复默认值。');
        this.saveData(this.getDefaultData());
        return this.getDefaultData();
      }

      return parsedData;
    } catch (error) {
      console.error('解析本地存储数据失败', error);
      return this.getDefaultData();
    }
  }

  /**
   * 保存持久化数据
   * @param data 需要保存的数据
   */
  public saveData(data: IPersistedState): void {
    const serializedData = JSON.stringify(data);
    const signature = this.hashData(data.highScore.toString());
    
    localStorage.setItem(this.STORAGE_KEY, serializedData);
    localStorage.setItem(this.SIGN_KEY, signature);
  }

  /**
   * 初始化存储桶
   */
  private initialize(): void {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      this.saveData(this.getDefaultData());
    }
  }

  /**
   * 获取默认数据结构
   * @returns IPersistedState
   */
  private getDefaultData(): IPersistedState {
    return {
      highScore: 0
    };
  }

  /**
   * 简单的哈希混淆函数，用于防篡改（非加密级别，仅用于基础防御）
   * @param str 需要哈希的字符串
   * @returns string
   */
  private hashData(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36); 
  }
}

// 导出单例
export default new StorageRepository();
