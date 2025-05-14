# ──────────────── Stage 1: 安装依赖 ────────────────
FROM node:22-alpine AS deps

# 安装 pnpm
# RUN npm install -g yarn

# 设置工作目录
WORKDIR /app

# 先拷贝 package.json 和 lockfile，用以利用缓存
COPY package.json yarn.lock ./

# 安装 production 依赖
RUN yarn install

# ──────────────── Stage 2: 组装运行镜像 ────────────────
FROM node:22-alpine

# 设置环境变量为 production，关闭调试
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

# 从 deps 阶段复制已安装的 node_modules
COPY --from=deps /app/node_modules ./node_modules

# 复制项目其余文件
COPY . .

# 暴露端口（与应用内监听端口保持一致）
EXPOSE ${PORT}

# 启动命令
CMD ["npm", "start"]