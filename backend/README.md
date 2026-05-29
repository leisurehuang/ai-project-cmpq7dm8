# 后端说明

本项目是一个纯前端单机游戏，所有逻辑和数据存储均在用户浏览器本地闭环运行。

若需在线上部署，只需将 `frontend/dist` 目录下的构建产物作为静态资源托管至任意 Web 服务器或边缘网络（如 Vercel, GitHub Pages, Nginx）。

## Nginx 部署参考配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /usr/share/nginx/html;
    index index.html;

    # SPA 单页应用路由重写
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 开启静态资源强缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|mp3|wav)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```
