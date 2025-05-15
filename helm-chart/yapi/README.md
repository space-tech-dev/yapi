# YApi Helm Chart

这个Helm Chart用于在Kubernetes集群中部署YApi（高效、易用、功能强大的API管理平台）。

## 先决条件

- Kubernetes 1.16+
- Helm 3.0+
- PV provisioner支持（用于持久化数据）

## 安装Chart

```bash
# 添加仓库（根据实际情况更改）
# helm repo add my-repo https://my-charts-repo.example.com

# 从本地安装
helm install my-yapi ./yapi
```

## 配置

下表列出了YApi Chart的可配置参数及其默认值。

### YApi服务配置

| 参数 | 描述 | 默认值 |
| ---- | ---- | ------ |
| `yapi.replicaCount` | YApi服务副本数 | `1` |
| `yapi.image.repository` | YApi镜像仓库 | `""` |
| `yapi.image.tag` | YApi镜像标签 | `latest` |
| `yapi.image.pullPolicy` | 镜像拉取策略 | `IfNotPresent` |
| `yapi.service.type` | Kubernetes服务类型 | `ClusterIP` |
| `yapi.service.port` | 服务端口 | `3000` |
| `yapi.resources` | CPU/内存资源请求/限制 | `{}` |
| `yapi.config.port` | YApi监听端口 | `3000` |
| `yapi.config.adminAccount` | 管理员账号 | `admin@admin.com` |
| `yapi.config.timeout` | 超时设置(ms) | `120000` |
| `yapi.config.mail.enable` | 是否启用邮件服务 | `false` |
| `yapi.config.mail.host` | 邮件服务器地址 | `smtp.163.com` |
| `yapi.config.mail.port` | 邮件服务端口 | `465` |
| `yapi.config.mail.from` | 发件人地址 | `your@email.com` |
| `yapi.config.mail.user` | 邮箱用户名 | `your@email.com` |
| `yapi.config.mail.pass` | 邮箱密码 | `yourpassword` |
| `yapi.config.closeRegister` | 是否关闭注册 | `true` |
| `yapi.config.keycloak.enable` | 是否启用Keycloak认证 | `false` |
| `yapi.config.keycloak.realm` | Keycloak领域 | `master` |
| `yapi.config.keycloak.clientId` | Keycloak客户端ID | `yapi` |
| `yapi.config.keycloak.clientSecret` | Keycloak客户端密钥 | `""` |
| `yapi.config.keycloak.redirectUri` | Keycloak重定向URI | `""` |
| `yapi.config.keycloak.authServerUrl` | Keycloak认证服务器URL | `""` |
| `yapi.config.plugins` | 启用的插件列表 | `[{"name":"import-postman"},{"name":"import-har"},{"name":"advanced-mock"}]` |

### Ingress配置

| 参数 | 描述 | 默认值 |
| ---- | ---- | ------ |
| `ingress.enabled` | 是否启用Ingress | `false` |
| `ingress.ingressClassName` | IngressClass名称(Kubernetes 1.18+) | `""` |
| `ingress.pathType` | Ingress路径类型 | `ImplementationSpecific` |
| `ingress.apiVersion` | 强制指定Ingress API版本(如不设置则自动检测) | `""` |
| `ingress.controller` | Ingress控制器类型(目前支持default和gce) | `default` |
| `ingress.hostname` | Ingress默认主机名 | `yapi.local` |
| `ingress.hostnameStrict` | 禁用从请求头动态解析主机名 | `false` |
| `ingress.path` | Ingress默认路径 | `""` |
| `ingress.servicePort` | 后端服务端口 | `http` |
| `ingress.annotations` | Ingress资源的附加注解(可用于配置cert-manager等) | `{}` |
| `ingress.labels` | Ingress资源的附加标签 | `{}` |
| `ingress.tls` | 是否为ingress.hostname启用TLS配置 | `false` |
| `ingress.selfSigned` | 使用Helm生成的自签名证书创建TLS密钥 | `false` |
| `ingress.extraHosts` | 额外的主机名数组 | `[]` |
| `ingress.extraPaths` | 需要添加到主主机下的任何额外任意路径 | `[]` |
| `ingress.extraTls` | 额外主机名的TLS配置 | `[]` |
| `ingress.secrets` | 如果提供自己的证书，用于添加证书密钥 | `[]` |
| `ingress.extraRules` | 需要加入的额外规则 | `[]` |

### MongoDB配置

| 参数 | 描述 | 默认值 |
| ---- | ---- | ------ |
| `mongodb.enabled` | 是否部署MongoDB | `true` |
| `mongodb.auth.rootUser` | MongoDB root用户名 | `test1` |
| `mongodb.auth.rootPassword` | MongoDB root密码 | `test1` |
| `mongodb.auth.username` | 普通用户名 | `appuser` |
| `mongodb.auth.password` | 普通用户密码 | `secretpwd` |
| `mongodb.auth.database` | 默认数据库名称 | `appdb` |
| `mongodb.external.enabled` | 是否使用外部MongoDB | `false` |
| `mongodb.external.host` | 外部MongoDB主机 | `""` |
| `mongodb.external.port` | 外部MongoDB端口 | `27017` |
| `mongodb.external.username` | 外部MongoDB用户名 | `""` |
| `mongodb.external.password` | 外部MongoDB密码 | `""` |
| `mongodb.external.database` | 外部MongoDB数据库名 | `yapi` |
| `mongodb.external.authSource` | 外部MongoDB认证源 | `admin` |
| `mongodb.image.repository` | MongoDB镜像仓库 | `bitnami/mongodb` |
| `mongodb.image.tag` | MongoDB镜像标签 | `8.0` |
| `mongodb.persistence.enabled` | 是否启用持久化存储 | `true` |
| `mongodb.persistence.size` | PVC大小 | `8Gi` |
| `mongodb.persistence.storageClass` | PVC存储类 | `""` |
| `mongodb.resources` | MongoDB资源请求/限制 | `{}` |

### 全局配置

| 参数 | 描述 | 默认值 |
| ---- | ---- | ------ |
| `nameOverride` | 覆盖名称 | `""` |
| `fullnameOverride` | 覆盖全名 | `""` |
| `serviceAccount.create` | 是否创建服务账号 | `true` |
| `serviceAccount.name` | 服务账号名称 | `""` |
| `podAnnotations` | Pod注解 | `{}` |
| `podSecurityContext` | Pod安全上下文 | `{}` |
| `securityContext` | 容器安全上下文 | `{}` |
| `nodeSelector` | 节点选择器 | `{}` |
| `tolerations` | 容忍设置 | `[]` |
| `affinity` | 亲和性设置 | `{}` |

## 示例

### 使用自定义YApi镜像

```yaml
yapi:
  image:
    repository: your-registry/yapi
    tag: 1.9.2
```

### 使用外部MongoDB

```yaml
mongodb:
  external:
    enabled: true
    host: mongodb-host
    port: 27017
    username: yapi-user
    password: yapi-password
    database: yapi
    authSource: admin
```

### 配置Keycloak认证

```yaml
yapi:
  config:
    keycloak:
      enable: true
      realm: master
      clientId: yapi
      clientSecret: your-client-secret
      redirectUri: https://your-yapi-domain.com/api/user/oauth2/keycloak/callback
      authServerUrl: https://your-keycloak-server.com
```

### 配置Ingress访问

```yaml
ingress:
  enabled: true
  hostname: yapi.example.com
  ingressClassName: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  tls: true
```

### 配置资源限制

```yaml
yapi:
  resources:
    limits:
      cpu: 1
      memory: 1Gi
    requests:
      cpu: 500m
      memory: 512Mi

mongodb:
  resources:
    limits:
      cpu: 1
      memory: 1Gi
    requests:
      cpu: 500m
      memory: 512Mi
```

## 注意事项

1. 首次部署时，YApi会自动初始化数据库
2. 默认管理员账号为values.yaml中配置的`yapi.config.adminAccount`，默认密码为`ymfe.org`
3. 建议在生产环境中修改所有默认密码
