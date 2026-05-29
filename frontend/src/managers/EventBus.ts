import Phaser from 'phaser';

/**
 * 全局事件总线单例
 * 利用 Phaser 内置的事件发射器实现解耦通信
 */
class EventBus {
  private emitter: Phaser.Events.EventEmitter;

  constructor() {
    this.emitter = new Phaser.Events.EventEmitter();
  }

  /**
   * 发布事件
   * @param event 事件名称
   * @param args 携带数据
   */
  public emit(event: string | symbol, ...args: any[]): void {
    this.emitter.emit(event, ...args);
  }

  /**
   * 订阅事件
   * @param event 事件名称
   * @param fn 回调函数
   * @param context 上下文
   */
  public on(event: string | symbol, fn: Function, context?: any): void {
    this.emitter.on(event, fn, context);
  }

  /**
   * 取消订阅
   * @param event 事件名称
   * @param fn 回调函数
   * @param context 上下文
   */
  public off(event: string | symbol, fn?: Function, context?: any): void {
    this.emitter.off(event, fn, context);
  }

  /**
   * 销毁发射器，防止内存泄漏
   */
  public destroy(): void {
    this.emitter.destroy();
  }
}

// 导出单例
export default new EventBus();
