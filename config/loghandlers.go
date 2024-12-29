package config

import (
	consumer "exchangeapp/comsumer"
)

// 初始化日志消费者
func InitLogConsumers() {
	go consumer.ConsumeElasticsearchQueue()
	go consumer.ConsumeFileQueue()

}
