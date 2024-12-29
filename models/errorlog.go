package models

import "time"

// 定义日志结构
type ErrorLog struct {
	Timestamp time.Time `json:"timestamp"`
	Function  string    `json:"function"`
	Error     string    `json:"error"`
}
