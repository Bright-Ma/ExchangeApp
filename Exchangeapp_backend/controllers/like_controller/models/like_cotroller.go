package models

import (
	"encoding/binary"
	"exchangeapp/global"
	"log"
	"time"

	"github.com/go-redis/redis"
)

// 将整数转换为 5 字节的字节切片
func intTo5Bytes(num int64) []byte {
	// 直接操作字节切片，避免使用 bytes.Buffer 带来的额外开销
	var b [8]byte
	binary.BigEndian.PutUint64(b[:], uint64(num))
	return b[3:]
}

// 将 5 字节的字节切片转换为整数
func bytes5ToInt(b []byte) int64 {
	// 直接操作字节切片，避免使用 bytes.Buffer 带来的额外开销
	var fullBytes [8]byte
	copy(fullBytes[3:], b)
	return int64(binary.BigEndian.Uint64(fullBytes[:]))
}

// LikeArticle 处理文章点赞或取消点赞逻辑
func LikeArticle(articleID, userID string) (bool, int64, int64, error) {
	likeHashKey := "article:" + articleID + ":likes"
	userIDKey := "article:" + articleID + ":liked_users"
	today := time.Now().Format("2006-01-02")
	field := "likes_" + today

	// 检查用户是否已经点赞
	isMember, err := global.RedisDB.SIsMember(userIDKey, userID).Result()
	if err != nil {
		log.Printf("ERROR: Failed to check if user %s has liked article %s: %v", userID, articleID, err)
		return false, 0, 0, err
	}

	if isMember {
		// 用户已点赞，取消点赞
		// 从已点赞用户集合中移除用户 ID
		if err := global.RedisDB.SRem(userIDKey, userID).Err(); err != nil {
			log.Printf("ERROR: Failed to remove user %s from liked users set for article %s: %v", userID, articleID, err)
			return false, 0, 0, err
		}

		// 获取当前点赞信息
		likesBytes, err := global.RedisDB.HGet(likeHashKey, field).Bytes()
		if err != nil && err != redis.Nil {
			log.Printf("ERROR: Failed to get likes for article %s: %v", articleID, err)
			return false, 0, 0, err
		}

		totalLikes := int64(0)
		dailyLikes := int64(0)
		if err == nil {
			totalLikes = bytes5ToInt(likesBytes[:5])
			dailyLikes = bytes5ToInt(likesBytes[5:])
		}

		// 减少总点赞数和当日点赞数
		if totalLikes > 0 {
			totalLikes--
		}
		if dailyLikes > 0 {
			dailyLikes--
		}

		// 转换为 10 字节存储
		newLikes := append(intTo5Bytes(totalLikes), intTo5Bytes(dailyLikes)...)
		if err := global.RedisDB.HSet(likeHashKey, field, newLikes).Err(); err != nil {
			log.Printf("ERROR: Failed to update likes for article %s: %v", articleID, err)
			return false, 0, 0, err
		}

		log.Printf("INFO: User %s successfully unliked article %s", userID, articleID)
		return false, totalLikes, dailyLikes, nil
	}

	// 将用户 ID 添加到已点赞用户集合
	if err := global.RedisDB.SAdd(userIDKey, userID).Err(); err != nil {
		log.Printf("ERROR: Failed to add user %s to liked users set for article %s: %v", userID, articleID, err)
		return false, 0, 0, err
	}

	// 获取当前点赞信息
	likesBytes, err := global.RedisDB.HGet(likeHashKey, field).Bytes()
	if err != nil && err != redis.Nil {
		log.Printf("ERROR: Failed to get likes for article %s: %v", articleID, err)
		return false, 0, 0, err
	}

	totalLikes := int64(0)
	dailyLikes := int64(0)
	if err == nil {
		totalLikes = bytes5ToInt(likesBytes[:5])
		dailyLikes = bytes5ToInt(likesBytes[5:])
	}

	// 增加总点赞数和当日点赞数
	totalLikes++
	dailyLikes++

	// 转换为 10 字节存储
	newLikes := append(intTo5Bytes(totalLikes), intTo5Bytes(dailyLikes)...)
	if err := global.RedisDB.HSet(likeHashKey, field, newLikes).Err(); err != nil {
		log.Printf("ERROR: Failed to update likes for article %s: %v", articleID, err)
		return false, 0, 0, err
	}

	log.Printf("INFO: User %s successfully liked article %s", userID, articleID)
	return true, totalLikes, dailyLikes, nil
}

// GetArticleLikes 获取文章的总点赞数和当日点赞数
func GetArticleLikes(articleID string) (int64, int64, error) {
	likeHashKey := "article:" + articleID + ":likes"
	today := time.Now().Format("2006-01-02")
	field := "likes_" + today

	likesBytes, err := global.RedisDB.HGet(likeHashKey, field).Bytes()
	if err == redis.Nil {
		return 0, 0, nil
	} else if err != nil {
		return 0, 0, err
	}

	totalLikes := bytes5ToInt(likesBytes[:5])
	dailyLikes := bytes5ToInt(likesBytes[5:])

	return totalLikes, dailyLikes, nil
}
