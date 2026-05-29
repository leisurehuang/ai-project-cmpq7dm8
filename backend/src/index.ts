import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// 静态资源强缓存配置 (对应方案中的 Cache 策略)
const staticOptions = {
  maxAge: '1y', // 资源缓存 1 年
  immutable: true,
  setHeaders: (res: Response, filePath: string) => {
    // HTML 文件不缓存，确保每次拉取最新版本
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
};

// 托管前端构建后的静态文件
app.use(express.static(path.join(__dirname, '../../frontend/dist'), staticOptions));

// 健康检查 API
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: '游戏服务器运行正常' });
});

// SPA 应用的通用路由回退：任何非静态资源的 GET 请求都返回 index.html
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`[Game Server] 静态资源托管服务已启动: http://localhost:${PORT}`);
});
