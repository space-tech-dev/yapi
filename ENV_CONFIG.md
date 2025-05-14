# YAPI 环境变量配置指南

从版本 x.x.x 开始，YAPI 支持通过环境变量进行配置，简化了部署和配置过程。
以下是可用的环境变量列表及其说明：

## 基础配置

- `YAPI_PORT`: 服务监听的端口号，默认为 3000
- `YAPI_ADMIN_ACCOUNT`: 管理员账号，默认为 admin@admin.com
- `YAPI_TIMEOUT`: 超时时间（毫秒），默认为 120000

## 数据库配置

- `YAPI_DB_SERVERNAME`: MongoDB 服务器地址，默认为 mongodb
- `YAPI_DB_NAME`: 数据库名称，默认为 yapi
- `YAPI_DB_PORT`: MongoDB 端口，默认为 27017
- `YAPI_DB_USER`: MongoDB 用户名，默认为 test1
- `YAPI_DB_PASS`: MongoDB 密码，默认为 test1
- `YAPI_DB_AUTH_SOURCE`: 认证数据库，默认为 admin
- `YAPI_DB_CONNECT_STRING`: 自定义 MongoDB 连接字符串，优先级高于其他数据库配置项

## 邮件配置

- `YAPI_MAIL_ENABLE`: 是否启用邮件功能，默认为 false
- `YAPI_MAIL_HOST`: SMTP 服务器地址，默认为 smtp.163.com
- `YAPI_MAIL_PORT`: SMTP 端口，默认为 465
- `YAPI_MAIL_FROM`: 发件人地址
- `YAPI_MAIL_USER`: 邮箱账号
- `YAPI_MAIL_PASS`: 邮箱密码或授权码

## 其他配置

- `YAPI_CLOSE_REGISTER`: 是否关闭注册，默认为 false
- `YAPI_LDAP_LOGIN`: 是否启用 LDAP 登录，默认为 false
- `YAPI_LDAP_LOGIN_ENABLE`: LDAP 登录是否启用，默认为 false
- `YAPI_LDAP_SERVER`: LDAP 服务器地址
- `YAPI_LDAP_BASE_DN`: LDAP 基础 DN
- `YAPI_LDAP_BIND_PASSWORD`: LDAP 绑定密码
- `YAPI_LDAP_SEARCH_DN`: LDAP 搜索 DN
- `YAPI_LDAP_SEARCH_STANDARD`: LDAP 搜索标准

## 插件配置

- `YAPI_PLUGINS`: JSON格式的插件配置数组，例如 `[{"name":"import-postman"},{"name":"import-har"}]`

默认内置的插件包括：
- `import-postman`: 导入 Postman 数据
- `import-har`: 导入 HAR 数据
- `advanced-mock`: 高级模拟功能
- `import-swagger`: 导入 Swagger 数据
- `statistics`: 项目数据统计
- `export-data`: 数据导出
- `gen-services`: 生成服务
- `export-swagger2-data`: 导出 Swagger 2.0 数据
- `import-yapi-json`: 导入 YAPI JSON 数据
- `wiki`: Wiki 功能
- `swagger-auto-sync`: Swagger 自动同步

## 示例

使用 Docker 命令运行:

```bash
docker run -d \
  -p 3000:3000 \
  -e YAPI_ADMIN_ACCOUNT=admin@example.com \
  -e YAPI_DB_SERVERNAME=mongo \
  -e YAPI_DB_USER=admin \
  -e YAPI_DB_PASS=password \
  --name yapi \
  your-yapi-image
```

使用 Docker Compose:

```yaml
services:
  yapi:
    image: your-yapi-image
    ports:
      - "3000:3000"
    environment:
      - YAPI_ADMIN_ACCOUNT=admin@example.com
      - YAPI_DB_SERVERNAME=mongo
      - YAPI_DB_USER=admin
      - YAPI_DB_PASS=password
    depends_on:
      - mongo
      
  mongo:
    image: mongo:latest
    volumes:
      - mongo_data:/data/db
```
