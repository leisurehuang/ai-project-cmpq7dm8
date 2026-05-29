import Phaser from 'phaser';
import { Images, Audio } from '../config/AssetKeys';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // --- UI 加载进度条 ---
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, height / 2, 320, 50);
    
    const loadingText = this.make.text({ x: width / 2, y: height / 2 - 20, text: '加载中...', style: { font: '20px monospace', color: '#00ff00' } }).setOrigin(0.5);
    const percentText = this.make.text({ x: width / 2, y: height / 2 + 25, text: '0%', style: { font: '16px monospace', color: '#ffffff' } }).setOrigin(0.5);

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x00ff00, 1);
      progressBar.fillRect(250, height / 2 + 10, 300 * value, 30);
      percentText.setText(parseInt(String(value * 100)) + '%');
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      this.scene.start('MenuScene');
    });

    // --- 资源加载清单 ---
    // 像素图资源
    this.load.image(Images.PLAYER_SHIP, 'assets/sprites/player_ship.png');
    this.load.image(Images.BULLET_PLAYER, 'assets/sprites/bullet_player.png');
    this.load.image(Images.ENEMY_BEE, 'assets/sprites/enemy_bee.png');
    this.load.image(Images.ENEMY_BUTTERFLY, 'assets/sprites/enemy_butterfly.png');
    this.load.image(Images.ENEMY_BOSS, 'assets/sprites/enemy_boss.png');

    // 8-bit 音效资源
    this.load.audio(Audio.BGM_THEME, ['assets/audio/bgm_theme.mp3', 'assets/audio/bgm_theme.ogg']);
    this.load.audio(Audio.SFX_SHOOT, 'assets/audio/shoot.mp3');
    this.load.audio(Audio.SFX_EXPLOSION_ENEMY, 'assets/audio/explosion_enemy.mp3');
    this.load.audio(Audio.SFX_EXPLOSION_PLAYER, 'assets/audio/explosion_player.mp3');
  }
}
