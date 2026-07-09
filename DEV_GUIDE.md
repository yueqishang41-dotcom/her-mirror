# 本地开发指南

## 问题说明

### 1. 危机词检测现已修复
- **红灯关键词（自杀/跳楼等）**：在所有问题的输入过程中都会实时检测
- **黄灯关键词（抑郁/依赖等）**：仅在 Q4、Q7 显示警告提示
- 输入包含"自杀"、"跳楼"、"抑郁症"等关键词会立即触发危机页面

### 2. DeepSeek API 调用

本地开发时，Netlify Functions 不会自动运行。你需要：

## 方法一：使用 Netlify CLI（推荐）

```bash
# 1. 安装 Netlify CLI
npm install -g netlify-cli

# 2. 登录 Netlify
netlify login

# 3. 本地运行（会同时启动前端和 Functions）
netlify dev
```

这会启动一个本地服务器（通常是 `http://localhost:8888`），同时运行：
- Vite 前端服务
- Netlify Functions（包括 `/api/generate`）

## 方法二：部署到 Netlify

1. 将代码推送到 GitHub
2. 在 Netlify 控制台连接仓库
3. **设置环境变量**：
   - 进入 Site Settings → Environment Variables
   - 添加 `DEEPSEEK_API_KEY` = 你的 API Key
4. 部署后 API 就能正常工作

## 测试危机词检测

在任意问题的输入框中输入以下关键词测试：

### 红灯（触发危机页面）
- `自杀`
- `想死`
- `跳楼`
- `不想活`
- `活着没意思`
- `被打`
- `家暴`

### 黄灯（显示警告提示，仅在 Q4/Q7）
- `我有抑郁症`
- `我很抑郁`
- `我是不是有抑郁症`
- `我只想和你聊天`
- `能一直陪着我吗`

## 当前状态

⚠️ **注意**：`.env` 文件中的 API Key 只在 Netlify Functions 中生效，不会暴露给前端。

如果你在本地只用 `npm run dev`，API 调用会失败，会使用本地生成的备用内容。