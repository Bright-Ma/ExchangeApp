# 使用基础镜像
FROM golang:1.22.5

# 设置工作目录
WORKDIR /app

# 复制可执行文件
COPY myapp ./myapp

# 复制配置文件目录到容器
COPY config ./config

# 确保可执行文件有执行权限
RUN chmod +x ./myapp

# 设置容器启动时执行的命令
ENTRYPOINT ["./myapp"]
