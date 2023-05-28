package db

import (
	"log"
	"strings"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var MainDB *gorm.DB

func InitDB() {
	dbConfig := []string{
		"host=localhost",
		"user=postgres",
		"password=postgres",
		"dbname=impact_db",
		"port=5432",
		"sslmode=disable",
		"TimeZone=Asia/Jakarta",
	}

	db, err := gorm.Open(postgres.Open(strings.Join(dbConfig, " ")), &gorm.Config{})
	if err != nil {
		log.Fatalln(err)
	}
	MainDB = db
}
