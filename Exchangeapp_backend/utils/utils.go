package utils

import (
	"errors"
	"log"
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(pwd string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), 12)
	if err != nil {
		log.Println("ERROR: Failed to hash password:", err)
		return "", err
	}
	log.Println("INFO: Password hashed successfully")
	return string(hash), nil
}

func GenerateJWT(username string) (string, error) {
	log.Println("INFO: Generating JWT for username:", username)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 72).Unix(),
	})

	signedToken, err := token.SignedString([]byte("secret"))
	if err != nil {
		log.Println("ERROR: Failed to sign JWT:", err)
		return "", err
	}
	log.Println("INFO: JWT generated successfully")
	return "Bearer " + signedToken, nil
}

func CheckPassword(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err != nil {
		log.Println("WARN: Password comparison failed:", err)
		return false
	}
	log.Println("INFO: Password comparison succeeded")
	return true
}

func ParseJWT(tokenString string) (string, error) {
	log.Println("INFO: Parsing JWT")
	if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
		tokenString = tokenString[7:]
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			log.Println("ERROR: Unexpected signing method")
			return nil, errors.New("unexpected Signing Method")
		}
		return []byte("secret"), nil
	})

	if err != nil {
		log.Println("ERROR: Failed to parse JWT:", err)
		return "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		username, ok := claims["username"].(string)
		if !ok {
			log.Println("ERROR: Username claim is not a string")
			return "", errors.New("username claim is not a string")
		}
		log.Println("INFO: JWT parsed successfully for username:", username)
		return username, nil
	}

	log.Println("ERROR: Invalid JWT")
	return "", err
}
