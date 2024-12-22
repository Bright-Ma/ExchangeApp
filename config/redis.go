package config

import (
	"exchangeapp/global"
	"log"

	"github.com/go-redis/redis"
)

func initRedis() {

	addr := AppConfig.Redis.Addr
	db := AppConfig.Redis.DB
	password := AppConfig.Redis.Password

	RedisClient := redis.NewClient(&redis.Options{
		Addr:     addr,
		DB:       db,
		Password: password,
	})
	// Ping Redis to check connection
	_, err := RedisClient.Ping().Result()

	if nil != err {
		log.Fatalf("Failed to connect to Redis, got error: %v", err)
	}

	global.RedisDB = RedisClient
}
