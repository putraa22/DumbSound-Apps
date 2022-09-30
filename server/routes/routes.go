package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	// TodoRoutes(r)
	UserRoutes(r)
	MusicRoutes(r)
	ArtistRoutes(r)
	TansactionRoutes(r)
	AuthRoutes(r)
}
