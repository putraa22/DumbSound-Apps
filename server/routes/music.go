package routes

import (
	"dumbsound/handlers"
	"dumbsound/pkg/middleware"
	"dumbsound/pkg/mysql"
	"dumbsound/repositories"

	"github.com/gorilla/mux"
)

func MusicRoutes(r *mux.Router) {
	musicRepository := repositories.RepositoryMusic(mysql.DB)
	h := handlers.HandlerMusic(musicRepository)

	r.HandleFunc("/musics", h.FindMusics).Methods("GET")
	r.HandleFunc("/music/{id}", h.GetMusic).Methods("GET")
	r.HandleFunc("/music", middleware.Auth(middleware.UploadFile(h.CreateMusic))).Methods("POST")
	r.HandleFunc("/music/{id}", middleware.Auth(h.UpdateMusic)).Methods("PATCH")
	r.HandleFunc("/music/{id}", middleware.Auth(h.DeleteMusic)).Methods("DELETE")
}
