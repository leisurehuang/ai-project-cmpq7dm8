import Phaser from 'phaser';
import GameManager from '../managers/GameManager';
import { Audio } from '../config/AssetKeys';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;
    
    // 清除可能存在的旧UI回调，防止在菜单界面触发游戏UI更新
    GameManager.scoreManager.onUpdate = null;

    // 标题
    this.add.text(width / 2, height / 2 - 100, '太 空 侵 略 者', {
      fontFamily: '"Courier New", monospace',
      fontSize: '48px',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    // 历史最高分
    const highScore = GameManager.getHighScore();
    this.add.text(width / 2, height / 2, `最高分: ${highScore}`, {
      fontFamily: 'monospace', fontSize: '24px', color: '#ff0000'
    }).setOrigin(0.5);

    // 闪烁提示文本
    const startText = this.add.text(width / 2, height / 2 + 100, '按 [空格] 开始游戏', {
      fontFamily: 'monospace', fontSize: '20px', color: '#00ff00'
    }).setOrigin(0.5);

    // 动画：文字闪烁
    this.tweens.add({
      targets: startText,
      alpha: 0,
      duration: 800,
      ease: 'Power2',
      yoyo: true,
      repeat: -1
    });

    // 监听空格键切换到主场景
    this.input.keyboard.once('keydown-SPACE', () => {
      // 启动背景音乐
      if (!this.sound.get(Audio.BGM_THEME)?.isPlaying) {
        const bgm = this.sound.add(Audio.BGM_THEME, { loop: true, volume: 0.3 });
        bgm.play();
      }
      GameManager.startNewGame();
      this.scene.start('MainScene');
    });
  }
}
