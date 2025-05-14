#!/bin/bash

# YAPI 环境变量配置启动脚本
# 使用方法: ./start-with-env.sh [配置文件路径]

# 默认配置文件路径
ENV_FILE=".env"

# 如果提供了参数，使用提供的配置文件路径
if [ "$1" != "" ]; then
  ENV_FILE=$1
fi

# 检查配置文件是否存在
if [ -f "$ENV_FILE" ]; then
  echo "使用配置文件: $ENV_FILE"
  
  # 加载环境变量
  export $(grep -v '^#' $ENV_FILE | xargs)
  
  # 启动应用
  npm start
else
  echo "错误: 配置文件 $ENV_FILE 不存在!"
  echo "请创建一个 .env 文件或提供正确的配置文件路径"
  echo "示例: ./start-with-env.sh my-config.env"
  exit 1
fi
