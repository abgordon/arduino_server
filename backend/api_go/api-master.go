package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.POST("/postdata", func(c *gin.Context){

		fmt.Println(c)
		message := c.PostForm("message")
		//nick := c.DefaultPostForm("nick", "anonymous")

		c.JSON(200, gin.H{
			"status": "posted",
			"message": message,
		})
	})

	r.Run(":8080")
}