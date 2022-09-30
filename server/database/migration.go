package database

import (
	"dumbsound/models"
	"dumbsound/pkg/mysql"
	"fmt"
)

// Automatic Migration if Running App
func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Music{},
		&models.Artist{},
		&models.Transaction{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
