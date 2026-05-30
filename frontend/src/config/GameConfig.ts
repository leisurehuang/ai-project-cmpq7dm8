import Phaser from 'phaser';
import { BootScene } from '../scenes/BootScene';
import { MenuScene } from '../scenes/MenuScene';
import { MainScene } from '../scenes/MainScene';
import { GameOverScene } from '../scenes/GameOverScene';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Galaga Tribute',
  type: Phaser.AUTO, // 自动选择 WebGL 或 Canvas
  
  // 适配不同屏幕，保持复古像素比例 (4:3)
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
    parent: 'game-container'
  },

  // 开启 Arcade 物理引擎以支持包围盒碰撞 (AABB)
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 }, // 俯视视角，无需重力
      debug: false // 生产环境关闭调试边框
    }
  },

  // 禁用浏览器默认的右键菜单，防止游戏操作冲突
  disableContextMenu: true,

  // 像素完美渲染设置
  render: {
    pixelArt: true, // 核心设置：关闭抗锯齿，锐化像素边缘
    roundPixels: true // 防止像素在亚像素级别渲染时产生抖动
  },

  // 注册游戏场景（相当于前端路由配置）
  scene: [
    BootScene,
    MenuScene,
    MainScene,
    GameOverScene
  ]
};
