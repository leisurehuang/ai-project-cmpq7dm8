# 阶段一：构建前端资源
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# 阶段二：构建后端服务并部署
FROM node:18-alpine
WORKDIR /app

# 复制后端代码并安装生产依赖
COPY backend/package*.json ./
RUN npm install --only=production
COPY backend/tsconfig.json ./
COPY backend/src ./src
RUN npm run build

# 从阶段一复制前端构建产物
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# 暴露端口
EXPOSE 3000

# 启动命令
CMD [ "npm", "start" ]
