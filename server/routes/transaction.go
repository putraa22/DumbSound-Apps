package routes

import (
	"dumbsound/handlers"
	"dumbsound/pkg/middleware"
	"dumbsound/pkg/mysql"
	"dumbsound/repositories"

	"github.com/gorilla/mux"
)

func TansactionRoutes(r *mux.Router) {
	transactionRepo := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepo)

	r.HandleFunc("/transactions", h.FindTransactions).Methods("GET")
	r.HandleFunc("/transaction/{id}", h.GetTransaction).Methods("GET")
	r.HandleFunc("/transaction", middleware.Auth(h.CreateTransaction)).Methods("POST")
	// r.HandleFunc("/transaction/{id}", middleware.Auth(h.UpdateTransaction)).Methods("PATCH")
	r.HandleFunc("/transaction/{id}", middleware.Auth(h.DeleteTransaction)).Methods("DELETE")
	r.HandleFunc("/notification", h.Notification).Methods("POST")
}
