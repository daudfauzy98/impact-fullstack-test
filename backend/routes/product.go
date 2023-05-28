package routes

import (
	"stock-management/controllers"

	"github.com/gin-gonic/gin"
)

func InitializeProductsRoutes(r *gin.Engine) {
	r.POST("/product", controllers.AddProduct)
	r.GET("/products", controllers.GetProducts)
	r.GET("/product/:id", controllers.GetProduct)
	r.PUT("/product/:id", controllers.UpdateProduct)
	r.DELETE("/product/:id", controllers.DeleteProduct)
}
