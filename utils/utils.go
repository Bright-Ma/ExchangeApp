package utils

import (
	"errors"
	"exchangeapp/publish"
	"log"
	"time"

	"exchangeapp/global"
	"exchangeapp/models"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(pwd string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), 12)
	return string(hash), err
}

func GenerateJWT(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 72).Unix(),
	})

	signedToken, err := token.SignedString([]byte("secret"))
	return "Bearer " + signedToken, err
}

func CheckPassword(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func ParseJWT(tokenString string) (string, error) {
	if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
		tokenString = tokenString[7:]
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected Signing Method")
		}
		return []byte("secret"), nil
	})

	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		username, ok := claims["username"].(string)
		if !ok {
			return "", errors.New("username claim is not a string")
		}
		return username, nil
	}

	return "", err
}

// 通用的日志记录函数
func LogError(functionName string, err error) {
	logEntry := models.ErrorLog{
		Timestamp: time.Now(),
		Function:  functionName,
		Error:     err.Error(),
	}

	// 推送到 RabbitMQ Fanout 交换机
	err = publish.PublishLog(logEntry)
	if err != nil {
		log.Printf("Failed to publish log to RabbitMQ: %s", err)
	}

	// 也可以选择同时推送到本地通道（可选）
	global.LogChannel <- logEntry
}
