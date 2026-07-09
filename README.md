# 她的镜子

一个引导性对话网站，帮助长期"自我沉默"的女性，通过回答具体问题，第一次用自己的话看见自己。

## 技术栈
- React + Vite + Tailwind CSS
- Claude API (via Netlify Functions)
- 手势交互星空效果

## 本地开发

```bash
npm install
npm run dev
```

## 部署到 Netlify

1. 推送代码到 GitHub
2. 在 Netlify 连接仓库
3. 设置环境变量：
   - `ANTHROPIC_API_KEY` = 你的 Claude API Key
4. 部署

## 环境变量

在 Netlify 设置：
- `ANTHROPIC_API_KEY` - Anthropic Claude API 密钥

如果没有设置 API Key，会使用本地生成的简单总结。

## 功能
- 8个引导问题
- 危机关键词检测
- AI 生成诗和信
- 手势控制星空
- 保存为图片
