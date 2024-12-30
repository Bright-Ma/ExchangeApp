package consumer

import (
	"exchangeapp/controllers"
	"exchangeapp/global"
	"exchangeapp/models"
	"github.com/goccy/go-json"
	"log"
	"os"
	"os/signal"
)

func ConsumeElasticsearchQueue() {
	msgs, err := global.RabbitMQChannel.Consume(
		"elasticsearch_queue", // 队列名称
		"",                    // 消费者名称
		true,                  // 自动确认
		false,                 // 是否独占
		false,                 // 无本地
		false,                 // 阻塞
		nil,                   // 参数
	)
	if err != nil {
		log.Fatalf("Failed to consume elasticsearch_queue: %s", err)
	}

	log.Println("Start consuming elasticsearch_queue")

	// 创建一个用于监听中断信号的 channel
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)

	// 处理队列中的消息
	for {
		select {
		case msg := <-msgs:
			var logEntry models.ErrorLog
			if err := json.Unmarshal(msg.Body, &logEntry); err != nil {
				log.Printf("Failed to parse log message: %s", err)
				continue
			}

			controllers.WriteLogToElasticsearch(logEntry)

		case <-quit:
			log.Println("Received shutdown signal, stopping consumer...")
			return
		}
	}
}

func ConsumeFileQueue() {
	msgs, err := global.RabbitMQChannel.Consume(
		"file_queue", // 队列名称
		"",           // 消费者名称
		true,         // 自动确认
		false,        // 是否独占
		false,        // 无本地
		false,        // 阻塞
		nil,          // 参数
	)
	if err != nil {
		log.Fatalf("Failed to consume file_queue: %s", err)
	}

	log.Println("Start consuming file_queue")

	// 创建一个用于监听中断信号的 channel
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)

	// 处理队列中的消息
	for {
		select {
		case msg := <-msgs:
			var logEntry models.ErrorLog
			if err := json.Unmarshal(msg.Body, &logEntry); err != nil {
				log.Printf("Failed to parse log message: %s", err)
				continue
			}

			controllers.WriteLogToFile(logEntry)

		case <-quit:
			log.Println("Received shutdown signal, stopping consumer...")
			return
		}
	}
}
