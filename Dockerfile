# ──────────────── Stage 1: 安装依赖 ────────────────
FROM node:18-alpine AS deps

# 安装 pnpm
# RUN npm install -g yarn

# 设置工作目录
WORKDIR /app

# 先拷贝 package.json 和 lockfile，用以利用缓存
COPY package.json yarn.lock ./

# 安装 production 依赖
RUN yarn install

# ──────────────── Stage 2: 组装运行镜像 ────────────────
FROM node:18-alpine

# 设置环境变量为 production，关闭调试
ENV NODE_ENV=production

# 设置YAPI的环境变量
ENV YAPI_PORT=3000
ENV YAPI_ADMIN_ACCOUNT=admin@admin.com
ENV YAPI_TIMEOUT=120000

# 数据库配置
ENV YAPI_DB_SERVERNAME=mongodb
ENV YAPI_DB_NAME=yapi
ENV YAPI_DB_PORT=27017
ENV YAPI_DB_USER=test1
ENV YAPI_DB_PASS=test1
ENV YAPI_DB_AUTH_SOURCE=admin

# 邮件配置 - 默认是禁用的，用户需要自行配置
ENV YAPI_MAIL_ENABLE=false
ENV YAPI_MAIL_HOST=smtp.163.com
ENV YAPI_MAIL_PORT=465
ENV YAPI_MAIL_FROM=
ENV YAPI_MAIL_USER=
ENV YAPI_MAIL_PASS=

# 其他配置
ENV YAPI_CLOSE_REGISTER=false

# 插件配置 - JSON格式的字符串
ENV YAPI_PLUGINS=[{"name":"import-postman"},{"name":"import-har"},{"name":"advanced-mock"},{"name":"import-swagger"},{"name":"statistics"},{"name":"export-data"},{"name":"gen-services"},{"name":"export-swagger2-data"},{"name":"import-yapi-json"},{"name":"wiki"},{"name":"swagger-auto-sync"}]

WORKDIR /app

# 从 deps 阶段复制已安装的 node_modules
COPY --from=deps /app/node_modules ./node_modules

# 复制项目其余文件
COPY . .

# 暴露端口（与应用内监听端口保持一致）
EXPOSE ${PORT}

# 启动命令
CMD ["npm", "start"]