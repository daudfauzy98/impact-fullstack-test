package db

import (
	"log"
	"stock-management/entity"
)

func Migration() {
	log.Println("[MESSAGE] start migrating DB tables..")

	query := "DROP TABLE IF EXISTS products;"
	err := MainDB.Exec(query).Error
	if err != nil {
		log.Fatalln(err)
	}

	err = MainDB.Debug().AutoMigrate(&entity.Product{})
	if err != nil {
		log.Fatalln(err)
	}

	query = `
		ALTER TABLE products 
		ADD CONSTRAINT products_uom_check 
		CHECK (uom IN ('SHEET', 'ROLLS', 'PCS'))
	`
	err = MainDB.Exec(query).Error
	if err != nil {
		log.Fatalln(err)
	}

	log.Println("[MESSAGE] migrating DB done!")
}
