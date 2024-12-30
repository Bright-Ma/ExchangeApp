package publish

import (
	"encoding/json"
	"exchangeapp/global"
	"github.com/streadway/amqp"
	"log"
)

// PublishToQueue 将数据发布到指定队列
func PublishToQueue(queueName string, message interface{}) error {
	// 将消息序列化为 JSON
	body, err := json.Marshal(message)
	if err != nil {
		log.Printf("Failed to serialize message: %s", err)
		return err
	}

	// 发布到 RabbitMQ 队列，设置持久化
	err = global.RabbitMQChannel.Publish(
		"",        // 默认交换机
		queueName, // 队列名称
		false,     // 强制模式
		false,     // 是否立即
		amqp.Publishing{
			ContentType:  "application/json",
			Body:         body,
			DeliveryMode: amqp.Persistent, // 消息持久化
		},
	)
	if err != nil {
		log.Printf("Failed to publish message to queue %s: %s", queueName, err)
		return err
	}

	log.Printf("Message published to queue %s successfully", queueName)
	return nil
}
