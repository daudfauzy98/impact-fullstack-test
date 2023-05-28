package main

import (
	"stock-management/db"
	"stock-management/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	db.InitDB()
	db.Migration()
	db.Seeder()

	r.Use(func(ctx *gin.Context) {
		ctx.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:8001")
		ctx.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		ctx.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if ctx.Request.Method == "OPTIONS" {
			ctx.AbortWithStatus(204)
			return
		}

		ctx.Next()
	})

	routes.InitializeProductsRoutes(r)

	r.Run("localhost:8000")
}
