import Phaser from 'phaser';
import GameManager from '../managers/GameManager';
import { Images } from '../config/AssetKeys';

export default class Hud {
  private scene: Phaser.Scene;
  private scoreText: Phaser.GameObjects.Text;
  private highScoreText: Phaser.GameObjects.Text;
  private levelText: Phaser.GameObjects.Text;
  private livesGroup: Phaser.GameObjects.Group;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    const { width } = scene.cameras.main;

    // 基础样式配置
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'monospace',
      fontSize: '24px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    };

    // 顶部 UI 布局
    this.scoreText = scene.add.text(20, 15, 'SCORE: 0', textStyle);
    this.levelText = scene.add.text(width / 2, 15, `WAVE ${GameManager.currentLevel}`, { ...textStyle, color: '#00ffff' }).setOrigin(0.5, 0);
    this.highScoreText = scene.add.text(width - 20, 15, `HI: ${GameManager.getHighScore()}`, { ...textStyle, color: '#ff0000' }).setOrigin(1, 0);

    // 底部生命值图标
    this.livesGroup = scene.add.group();
    this.drawLives(3); // 初始绘制
  }

  /**
   * 刷新界面显示
   */
  public updateDisplay(score: number, lives: number): void {
    this.scoreText.setText(`SCORE: ${score}`);
    this.levelText.setText(`WAVE ${GameManager.currentLevel}`);
    
    // 如果当前分数超过最高分，实时更新最高分显示
    if (score > GameManager.getHighScore()) {
      this.highScoreText.setText(`HI: ${score}`);
    }

    this.drawLives(lives);
  }

  /**
   * 绘制生命值图标
   */
  private drawLives(lives: number): void {
    this.livesGroup.clear(true, true); // 清除旧图标

    // 在左下角绘制剩余的小飞船
    for (let i = 0; i < lives; i++) {
      const x = 30 + (i * 30);
      const y = this.scene.cameras.main.height - 25;
      this.livesGroup.create(x, y, Images.PLAYER_SHIP)
        .setOrigin(0.5, 0.5)
        .setScale(0.8)
        .setAlpha(0.8);
    }
  }
}
