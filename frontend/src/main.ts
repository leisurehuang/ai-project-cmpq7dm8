import './style.css';
import Phaser from 'phaser';
import { gameConfig } from './config/GameConfig';

// 等待 DOM 加载完毕后启动游戏
window.addEventListener('load', () => {
  // 实例化 Phaser 游戏对象，自动挂载到 index.html 的 #game-container 中
  const game = new Phaser.Game(gameConfig);

  // 监听浏览器窗口失焦/隐藏事件，自动暂停/恢复游戏主循环 (应对需求中的风险)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      game.scene.getScenes(true).forEach(scene => scene.scene.pause());
    } else {
      // 恢复活跃场景
      game.scene.getScenes(false).forEach(scene => {
        if (scene.scene.isPaused()) scene.scene.resume();
      });
    }
  });
});
