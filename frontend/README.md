# 太空侵略者致敬版 (Galaga Tribute)

基于 Phaser 3 + TypeScript + Vite 构建的纯前端复古像素风打蜜蜂街机游戏。

## 🛠 技术栈
- **核心引擎**: Phaser 3.60+
- **开发语言**: TypeScript
- **构建工具**: Vite 4+

## 🚀 快速开始

### 1. 环境要求
- Node.js >= 18.x
- npm >= 9.x 或 yarn/pnpm

### 2. 安装依赖
打开终端，进入 `frontend` 目录：
```bash
cd frontend
npm install
```

### 3. 生成占位素材 (⚠️ 重要)
由于项目采用纯代码生成，为了让游戏能够正常启动而不报资源加载失败错误，请先运行素材生成脚本：
```bash
node generate_placeholders.js
```
*(此脚本会在 `public/assets` 目录下生成极小的占位图片和无声音频文件)*

### 4. 启动开发服务器
```bash
npm run dev
```
启动后，在浏览器中访问 `http://localhost:5173` 即可游玩。

### 5. 构建生产版本
```bash
npm run build
```
构建产物将输出至 `dist/` 目录，可直接丢入 Nginx 或对象存储中进行静态托管。

## 🎮 操作说明
- **[←] [→] 方向键**：控制战机左右移动
- **[空格键]**：发射子弹

## 📂 目录结构说明
- `src/config`: 游戏核心配置（按键映射、资源键名、物理参数）
- `src/data`: 数据模型与本地存储接口定义
- `src/managers`: 全局状态与事件总线
- `src/scenes`: Phaser 场景（相当于路由/页面，控制游戏生命周期）
- `src/systems`: 核心业务系统（敌机AI、碰撞检测、计分）
- `src/entities`: 游戏实体对象（玩家、敌机、子弹）
