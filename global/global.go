package global

import (
	"exchangeapp/models"
	"github.com/go-redis/redis"
	"github.com/streadway/amqp"
	"gorm.io/gorm"
)

var (
	// 日志通道（供本地日志处理器使用）
	LogChannel = make(chan models.ErrorLog, 100)
	// 全局 GORM 数据库连接
	Db *gorm.DB

	// 全局 Redis 客户端
	RedisDB *redis.Client

	// 全局 RabbitMQ 连接
	RabbitMQConn *amqp.Connection

	// RabbitMQ 通道（用于发送和接收消息）
	RabbitMQChannel *amqp.Channel
)
