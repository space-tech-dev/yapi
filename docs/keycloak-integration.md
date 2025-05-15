# YApi Keycloak OAuth2 集成指南

本文档介绍如何配置 YApi 与 Keycloak 进行集成，以支持 OAuth2 身份验证。

## 1. Keycloak 配置

### 1.1 创建客户端

1. 登录 Keycloak 管理控制台
2. 选择或创建一个 Realm
3. 进入 "Clients" 菜单，点击 "Create" 按钮
4. 填写以下信息:
   - Client ID: `yapi-client`（可自定义）
   - Client Protocol: `openid-connect`
   - Root URL: `http://your-yapi-host:3000/`（替换为你的 YApi 地址）
5. 点击 "Save" 按钮保存

### 1.2 配置客户端

1. 在客户端详情页面，配置以下设置:
   - Access Type: `confidential`（这样可以获取客户端密钥）
   - Valid Redirect URIs: `http://your-yapi-host:3000/api/user/oauth2/keycloak/callback`
   - Web Origins: 添加 YApi 的 URL 或使用 `*`
2. 点击 "Save" 按钮保存
3. 切换到 "Credentials" 标签页，记下 "Secret" 值，稍后配置 YApi 时需要使用

### 1.3 创建用户映射

确保 Keycloak 中的用户至少包含以下属性:
- Username
- Email

可以在 Keycloak 的 "User Attributes" 中添加额外的自定义属性，或确保用户有正确的邮箱设置。

## 2. YApi 配置

### 2.1 配置 Keycloak 连接

在 YApi 的配置文件中添加 Keycloak 配置。你可以:

1. 在 `config.json` 文件中添加配置:

```json
{
  "keycloakConfig": {
    "authServerUrl": "https://your-keycloak-host/auth",
    "realm": "your-realm",
    "clientId": "yapi-client",
    "clientSecret": "your-client-secret",
    "redirectUri": "http://your-yapi-host:3000/api/user/oauth2/keycloak/callback"
  }
}
```

2. 或使用环境变量配置:

```bash
YAPI_KEYCLOAK_ENABLE=true
YAPI_KEYCLOAK_AUTH_SERVER_URL=https://your-keycloak-host/auth
YAPI_KEYCLOAK_REALM=your-realm
YAPI_KEYCLOAK_CLIENT_ID=yapi-client
YAPI_KEYCLOAK_CLIENT_SECRET=your-client-secret
YAPI_KEYCLOAK_REDIRECT_URI=http://your-yapi-host:3000/api/user/oauth2/keycloak/callback
```

### 2.2 重启 YApi 服务

配置完成后，重启 YApi 服务以使配置生效:

```bash
npm run start
```

## 3. 用户登录流程

1. 用户访问 YApi 登录页
2. 点击 "Keycloak 登录" 按钮
3. 跳转到 Keycloak 登录页面
4. 用户输入 Keycloak 账号密码登录
5. 登录成功后重定向回 YApi，完成登录流程

## 4. 注意事项

- 首次通过 Keycloak 登录的用户会自动在 YApi 中创建账号
- 用户邮箱是匹配 YApi 和 Keycloak 用户的唯一标识
- YApi 会自动为新用户创建默认的私人分组
- 如需设置管理员权限，需要在 YApi 中手动设置 