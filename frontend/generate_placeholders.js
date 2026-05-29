const fs = require('fs');
const path = require('path');

// 确保目录存在
const dirs = ['public/assets/sprites', 'public/assets/audio'];
dirs.forEach(dir => {
    fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
    console.log(`目录已创建/确认: ${dir}`);
});

// 生成占位 PNG 图片的函数 (Base64)
function createPlaceholderImage(filename, width = 16, height = 16, color = '#ffffff') {
    // 构建最简单的有效 PNG 文件 (1x1 白色像素)
    // 为了简化，我们直接写一个 base64 解码后的极小图片文件
    const base64PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    const filePath = path.join(__dirname, 'public/assets/sprites', filename);
    
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, Buffer.from(base64PNG, 'base64'));
        console.log(`已生成占位图: ${filename}`);
    } else {
        console.log(`文件已存在，跳过: ${filename}`);
    }
}

// 生成占位 MP3 (无声) 的函数
function createPlaceholderAudio(filename) {
    // 极短的无声 mp3 文件头
    const base64MP3 = 'SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAgAAAbAAkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQ//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAYYgYotSAAAAAAAAAAAAAAAAAAAAAP/7sGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
    const filePath = path.join(__dirname, 'public/assets/audio', filename);
    
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, Buffer.from(base64MP3, 'base64'));
        console.log(`已生成占位音频: ${filename}`);
    } else {
        console.log(`文件已存在，跳过: ${filename}`);
    }
}

// 批量生成项目中 AssetKeys 所需的资源
const images = ['player_ship.png', 'bullet_player.png', 'enemy_bee.png', 'enemy_butterfly.png', 'enemy_boss.png'];
const audios = ['bgm_theme.mp3', 'shoot.mp3', 'explosion_enemy.mp3', 'explosion_player.mp3'];

images.forEach(img => createPlaceholderImage(img));
audios.forEach(audio => createPlaceholderAudio(audio));

console.log('\n所有占位素材生成完毕！请执行 npm run dev 启动项目。');
