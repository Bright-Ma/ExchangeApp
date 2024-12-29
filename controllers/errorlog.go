package controllers

import (
	"exchangeapp/models"
	"log"
	"os"
)

func WriteLogToFile(logEntry models.ErrorLog) {
	logFile, err := os.OpenFile("error_logs.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		log.Printf("Failed to open log file: %s", err)
		return
	}
	defer logFile.Close()

	logger := log.New(logFile, "", log.LstdFlags)
	logger.Printf("[%s] Function: %s, Error: %s\n",
		logEntry.Timestamp.Format("2006-01-02 15:04:05"),
		logEntry.Function,
		logEntry.Error)
}

func WriteLogToElasticsearch(logEntry models.ErrorLog) {
	// Elasticsearch 写入逻辑
	log.Printf("Writing log to Elasticsearch: %v", logEntry)
}
