# 配置 DeepSeek API 指南

## 方式一：部署到 Netlify（推荐）

### 1. 连接 GitHub 仓库
1. 登录 https://app.netlify.com
2. 点击 **"Add new site"** → **"Import an existing project"**
3. 选择 **GitHub**，授权后找到 `her-mirror` 仓库
4. 点击连接

### 2. 设置环境变量
1. 进入 **Site Settings** → **Environment Variables**
2. 点击 **"Add a variable"**
3. 添加以下变量：

| 变量名 | 值 |
|--------|-----|
| `DEEPSEEK_API_KEY` | 你的 DeepSeek API Key |

4. 点击 **Save**

### 3. 触发部署
- Netlify 会自动检测提交并部署
- 或者手动点击 **"Trigger deploy"**

---

## 方式二：本地开发

### 使用 Netlify CLI

```bash
# 1. 安装 Netlify CLI（如果没安装）
npm install -g netlify-cli

# 2. 登录 Netlify
netlify login

# 3. 设置本地环境变量
# 在项目根目录创建 .env 文件（已存在，确保有 DEEPSEEK_API_KEY）

# 4. 本地运行（会同时启动前端和 Functions）
netlify dev
```

这会启动：
- 前端：http://localhost:8888
- Netlify Functions：自动运行

---

## 检查 API 是否工作

### 测试 API 调用

完成所有问题后，过渡页会调用 `/api/generate` 接口。

**成功标志**：
- 诗和信的内容使用了你的原话（AI 生成）
- 控制台没有错误

**失败标志**：
- 使用本地生成的备用内容
- 显示"我暂时没法帮你整理了"

---

## 获取 DeepSeek API Key

1. 访问 https://platform.deepseek.com
2. 注册/登录
3. 进入 API Keys 页面
4. 创建新的 API Key

---

## 当前配置

- **API 提供商**: DeepSeek
- **模型**: `deepseek-chat`
- **接口地址**: `https://api.deepseek.com/v1/chat/completions`
- **环境变量**: `DEEPSEEK_API_KEY`