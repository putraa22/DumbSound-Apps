package routes

import (
	"dumbsound/handlers"
	"dumbsound/pkg/mysql"
	"dumbsound/repositories"

	"github.com/gorilla/mux"
)

func ArtistRoutes(r *mux.Router) {
	artistRepository := repositories.RepositoryArtist(mysql.DB)
	h := handlers.HandlerArtist(artistRepository)

	r.HandleFunc("/artists", h.FindArtist).Methods("GET")
	r.HandleFunc("/artist/{id}", h.GetArtist).Methods("GET")
	r.HandleFunc("/artist", h.CreateArtist).Methods("POST")
	r.HandleFunc("/artist/{id}", h.UpdateArtist).Methods("PATCH")
	r.HandleFunc("/artist/{id}", h.DeleteArtist).Methods("DELETE")

}
