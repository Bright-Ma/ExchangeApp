package config

import consumer "exchangeapp/comsumer"

// 初始化日志消费者
func InitArticleConsumers() {
	go consumer.ConsumeArticleQueue()

}
