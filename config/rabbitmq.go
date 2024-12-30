package config

import (
	"exchangeapp/global"
	"log"

	"github.com/streadway/amqp"
)

func InitRabbitMQ() {
	// 连接到 RabbitMQ
	var err error
	//rabbitMQURL := "amqp://guest:guest@localhost:5669/"
	rabbitMQURL := "amqp://guest:guest@rabbitmq:5672/"

	global.RabbitMQConn, err = amqp.Dial(rabbitMQURL)
	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %s", err)
	}

	// 创建通道
	global.RabbitMQChannel, err = global.RabbitMQConn.Channel()
	if err != nil {
		log.Fatalf("Failed to open a channel: %s", err)
	}

	// 初始化文章发布队列
	initArticleQueue()

	// 初始化日志交换机和队列
	initLogExchangeAndQueues()

	log.Println("RabbitMQ initialized successfully")
}

func initArticleQueue() {
	// 声明用于发布文章的队列
	_, err := global.RabbitMQChannel.QueueDeclare(
		"article_queue", // 队列名称
		true,            // 是否持久化
		false,           // 是否自动删除
		false,           // 是否独占队列
		false,           // 是否阻塞
		nil,             // 其他参数
	)
	if err != nil {
		log.Fatalf("Failed to declare article_queue: %s", err)
	}
	log.Println("Article queue initialized successfully")
}

func initLogExchangeAndQueues() {
	// 声明 Fanout 交换机
	err := global.RabbitMQChannel.ExchangeDeclare(
		"logs_exchange", // 交换机名称
		"fanout",        // Fanout 类型
		true,            // 是否持久化
		false,           // 是否自动删除
		false,           // 是否独占
		false,           // 是否阻塞
		nil,             // 参数
	)
	if err != nil {
		log.Fatalf("Failed to declare logs_exchange: %s", err)
	}

	// 初始化日志队列并绑定到交换机
	initLogQueue("elasticsearch_queue")
	initLogQueue("file_queue")
	log.Println("Log exchange and queues initialized successfully")
}

func initLogQueue(queueName string) {
	// 声明日志队列
	_, err := global.RabbitMQChannel.QueueDeclare(
		queueName, // 队列名称
		true,      // 是否持久化
		false,     // 是否自动删除
		false,     // 是否独占队列
		false,     // 是否阻塞
		nil,       // 其他参数
	)
	if err != nil {
		log.Fatalf("Failed to declare queue %s: %s", queueName, err)
	}

	// 绑定队列到 Fanout 交换机
	err = global.RabbitMQChannel.QueueBind(
		queueName,       // 队列名称
		"",              // 路由键（Fanout 类型忽略）
		"logs_exchange", // 交换机名称
		false,           // 是否阻塞
		nil,             // 参数
	)
	if err != nil {
		log.Fatalf("Failed to bind queue %s to logs_exchange: %s", queueName, err)
	}
}
