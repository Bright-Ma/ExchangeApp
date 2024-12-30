package consumer

import (
	"encoding/json"
	"exchangeapp/global"
	"exchangeapp/models"
	"log"
	"os"
	"os/signal"
)

func ConsumeArticleQueue() {
	// 消费队列中的消息
	msgs, err := global.RabbitMQChannel.Consume(
		"article_queue", // 队列名称
		"",              // 消费者名称
		true,            // 自动确认
		false,           // 独占
		false,           // 无本地
		false,           // 阻塞
		nil,             // 参数
	)
	if err != nil {
		log.Fatalf("Failed to consume article_queue: %s", err)
	}

	log.Println("Start consuming article_queue")

	// 创建一个用于监听中断信号的 channel
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)

	// 处理队列中的消息
	for {
		select {
		case msg := <-msgs:
			var article models.Article

			// 反序列化消息体
			if err := json.Unmarshal(msg.Body, &article); err != nil {
				log.Printf("Failed to unmarshal article message: %s", err)
				continue
			}

			// 将文章存入数据库
			if err := global.Db.Create(&article).Error; err != nil {
				log.Printf("Failed to save article to database: %s", err)
				continue
			}

			log.Printf("Article saved successfully: %v", article)

		// 监听退出信号
		case <-quit:
			log.Println("Received shutdown signal, stopping consumer...")
			return
		}
	}
}
