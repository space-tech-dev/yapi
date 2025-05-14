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
| `yapi.config.plugins` | 启用的插件列表 | `[{"name":"import-postman"},{"name":"import-har"},{"name":"advanced-mock"}]` |

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
