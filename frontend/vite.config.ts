import { defineConfig } from 'vite';
import path from 'path';

// GitHub Pages 部署：仓库名作为 base 路径
// 如果绑定了自定义域名，改为 base: '/'
const repoName = 'ai-project-cmpq7dm8';

export default defineConfig({
  base: process.env.GITHUB_PAGES ? `/${repoName}/` : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    target: 'es2020'
  }
});
