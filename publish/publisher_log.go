package publish

import (
	"exchangeapp/global"
	"exchangeapp/models"
	"github.com/goccy/go-json"
	"github.com/streadway/amqp"
	"log"
)

// 发布日志到 logs_exchange
func PublishLog(logEntry models.ErrorLog) error {
	// 序列化日志为 JSON
	body, err := json.Marshal(logEntry)
	if err != nil {
		log.Printf("Failed to serialize log entry: %s", err)
		return err
	}

	// 发布到 Fanout 交换机
	err = global.RabbitMQChannel.Publish(
		"logs_exchange", // 交换机名称
		"",              // 路由键（Fanout 类型忽略）
		false,           // 强制模式
		false,           // 立即模式
		amqp.Publishing{
			ContentType: "application/json",
			Body:        body,
		},
	)
	if err != nil {
		log.Printf("Failed to publish log to exchange: %s", err)
		return err
	}

	log.Println("Log published successfully")
	return nil
}
