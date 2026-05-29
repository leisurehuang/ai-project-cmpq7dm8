import Phaser from 'phaser';
import GameManager from '../managers/GameManager';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    this.add.text(width / 2, height / 2 - 100, 'GAME OVER', {
      fontFamily: '"Courier New", monospace',
      fontSize: '64px',
      color: '#ff0000',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const finalScore = GameManager.scoreManager.getScore();
    const isNewRecord = finalScore > GameManager.getHighScore();

    this.add.text(width / 2, height / 2, `最终得分: ${finalScore}`, {
      fontFamily: 'monospace', fontSize: '32px', color: '#ffffff'
    }).setOrigin(0.5);

    if (isNewRecord) {
      const newRecordText = this.add.text(width / 2, height / 2 + 50, '新纪录!', {
        fontFamily: 'monospace', fontSize: '24px', color: '#ffff00'
      }).setOrigin(0.5);
      
      // 闪烁动画
      this.tweens.add({ targets: newRecordText, alpha: 0, duration: 500, yoyo: true, repeat: 5 });
    }

    const restartText = this.add.text(width / 2, height / 2 + 150, '按 [空格] 返回主菜单', {
      fontFamily: 'monospace', fontSize: '20px', color: '#00ff00'
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('MenuScene');
    });
  }
}
