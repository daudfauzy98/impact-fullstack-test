package entity

import "github.com/shopspring/decimal"

type Product struct {
	KodeProduk      string          `gorm:"size:20;not null;primaryKey" json:"kodeProduk"`
	NamaProduk      string          `gorm:"size:100;not null" json:"namaProduk" binding:"required"`
	DeskripsiProduk string          `gorm:"size:200;not null" json:"deskripsiProduk" binding:"required"`
	HargaProduk     decimal.Decimal `gorm:"type:decimal(10,2);not null" json:"hargaProduk" binding:"required"`
	UOM             string          `gorm:"size:5;not null" json:"uom" binding:"required"`
}
