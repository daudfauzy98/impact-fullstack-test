package db

import (
	"log"
	"stock-management/entity"

	"github.com/rs/xid"
	"github.com/shopspring/decimal"
)

func Seeder() {
	log.Println("[MESSAGE] start seeding Product table..")
	price, err := decimal.NewFromString("50000.00")
	if err != nil {
		log.Fatalln(err)
	}
	product := &entity.Product{
		KodeProduk:      xid.New().String(),
		NamaProduk:      "Plafon Gipsum",
		DeskripsiProduk: "Plafon bahan gipsum grade A",
		HargaProduk:     price,
		UOM:             "SHEET",
	}
	err = MainDB.Debug().Create(product).Error
	if err != nil {
		log.Fatalln(err)
	}
	log.Println("[MESSAGE] finish seeding Product table..")
}
