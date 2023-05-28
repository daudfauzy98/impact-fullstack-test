package controllers

import (
	"log"
	"stock-management/db"
	"stock-management/entity"

	"github.com/gin-gonic/gin"
	"github.com/rs/xid"
)

// API   : /product
// METHOD: POST
func AddProduct(ctx *gin.Context) {
	var newProduct *entity.Product
	err := ctx.BindJSON(&newProduct)
	if err != nil {
		log.Println(err)
		ctx.JSON(400, gin.H{
			"error":   true,
			"message": err.Error(),
		})
		return
	}

	newProduct.KodeProduk = xid.New().String()

	err = db.MainDB.Create(&newProduct).Error
	if err != nil {
		log.Println(err)
		ctx.JSON(500, gin.H{
			"error":   true,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"error":   false,
		"message": "success",
		"data":    newProduct,
	})
}

// API   : /products
// METHOD: GET
func GetProducts(ctx *gin.Context) {
	var products []entity.Product
	err := db.MainDB.Order("nama_produk asc").Find(&products).Error
	if err != nil {
		log.Println(err)
		ctx.JSON(500, gin.H{
			"error":   true,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"error":   false,
		"message": "success",
		"data":    products,
	})
}

// API   : /product/:id
// METHOD: GET
func GetProduct(ctx *gin.Context) {
	var product entity.Product
	err := db.MainDB.Find(&product, "kode_produk = ?", ctx.Param("id")).Error
	if err != nil {
		log.Println(err)
		ctx.JSON(500, gin.H{
			"error":   true,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"error":   false,
		"message": "success",
		"data":    product,
	})
}

// API   : /product/:id
// METHOD: PUT
func UpdateProduct(ctx *gin.Context) {
	productCode := ctx.Param("id")
	if productCode == "" {
		msg := "missing kode_produk value when updating a product"
		log.Println("error:", msg)
		ctx.JSON(400, gin.H{
			"error":   true,
			"message": msg,
		})
		return
	}

	var updatedProduct *entity.Product
	err := ctx.BindJSON(&updatedProduct)
	if err != nil {
		log.Println(err)
		ctx.JSON(400, gin.H{
			"error":   true,
			"message": err.Error(),
		})
		return
	}
	updatedProduct.KodeProduk = productCode

	err = db.MainDB.Save(updatedProduct).Error
	if err != nil {
		log.Println(err)
		ctx.JSON(500, gin.H{
			"error":   true,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"error":   false,
		"message": "success",
		"data":    updatedProduct,
	})
}

// API   : /product/:id
// METHOD: DELETE
func DeleteProduct(ctx *gin.Context) {
	err := db.MainDB.Delete(&entity.Product{}, "kode_produk = ?", ctx.Param("id")).Error
	if err != nil {
		log.Println(err)
		ctx.JSON(500, gin.H{
			"error":   true,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"error":   false,
		"message": "success",
	})
}
