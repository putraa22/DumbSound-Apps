package handlers

import (
	// "context"
	musicsdto "dumbsound/dto/music"
	dto "dumbsound/dto/result"
	"dumbsound/models"
	"dumbsound/repositories"
	"encoding/json"
	"net/http"
	"os"
	"strconv"

	// "github.com/cloudinary/cloudinary-go/v2"
	// "github.com/cloudinary/cloudinary-go/v2/api/uploader"

	"github.com/gorilla/mux"
)

type handlerMusic struct {
	MusicRepository repositories.MusicRepository
}

var PathFile = os.Getenv("PATH_FILE")

func HandlerMusic(MusicRepository repositories.MusicRepository) *handlerMusic {
	return &handlerMusic{MusicRepository}
}

func (h *handlerMusic) FindMusics(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	musics, err := h.MusicRepository.FindMusics()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	// Untuk mengembed path file di property thumbnailMusic
	for i, p := range musics {
		musics[i].Attache = os.Getenv("PATH_FILE") + p.Attache
	}

	for i, p := range musics {
		musics[i].ThumbNail = os.Getenv("PATH_FILE") + p.ThumbNail
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: musics}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerMusic) GetMusic(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var music models.Music
	music, err := h.MusicRepository.GetMusic(id)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	musicresponse := musicsdto.MusicResponse{
		Title:     music.Title,
		ThumbNail: music.ThumbNail,
		Year:      music.Year,
		Attache:   music.Attache,
		ArtistID:  music.ArtistID,
	}

	// path untuk membuat api file image
	music.Attache = os.Getenv("PATH_FILE") + music.Attache
	music.ThumbNail = os.Getenv("PATH_FILE") + music.ThumbNail

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: musicresponse}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerMusic) CreateMusic(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get dataFile from midleware and store to filename variable here ...
	dataContex := r.Context().Value("dataFile")
	filename := dataContex.(string)

	dataThumb := r.Context().Value("dataThumb")
	filethumb := dataThumb.(string)

	artist_id, _ := strconv.Atoi(r.FormValue("artist_id"))

	request := musicsdto.CreateMusicRequest{
		Title:     r.FormValue("title"),
		ThumbNail: r.FormValue("thumbnail"),
		Attache:   r.FormValue("attache"),
		Year:      r.FormValue("year"),
		ArtistID:  int(artist_id),
	}

	// validation := validator.New()
	// err := validation.Struct(request)
	// if err != nil {
	// 	w.WriteHeader(http.StatusInternalServerError)
	// 	response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
	// 	json.NewEncoder(w).Encode(response)
	// 	return
	// }

	// var ctx = context.Background()
	// var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	// var API_KEY = os.Getenv("API_KEY")
	// var API_SECRET = os.Getenv("API_SECRET")

	// cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	// // Upload file to Cloudinary ...
	// resp, _ := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "dumbsound"})

	music := models.Music{
		Title:     request.Title,
		ThumbNail: filethumb,
		Attache:   filename,
		Year:      request.Year,
		ArtistID:  request.ArtistID,
	}

	// err := mysql.DB.Create(&film).Error
	music, err := h.MusicRepository.CreateMusic(music)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	musicresponse := musicsdto.MusicResponse{
		Title:     music.Title,
		ThumbNail: music.ThumbNail,
		Year:      music.Year,
		Attache:   music.Attache,
		ArtistID:  music.ArtistID,
		Artist: models.Artist{
			ID:          music.Artist.ID,
			Name:        music.Artist.Name,
			Old:         music.Artist.Old,
			Type:        music.Artist.Type,
			StartCareer: music.Artist.StartCareer,
		},
	}

	// music, _ = h.MusicRepository.GetMusic(music.ID)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: musicresponse}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerMusic) UpdateMusic(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(musicsdto.UpdateMusicRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	music, err := h.MusicRepository.GetMusic(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if request.Title != "" {
		music.Title = request.Title
	}

	if request.ThumbNail != "" {
		music.ThumbNail = request.ThumbNail
	}

	if request.Attache != "" {
		music.Attache = request.Attache
	}

	data, err := h.MusicRepository.UpdateMusic(music)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerMusic) DeleteMusic(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("ContentType", "application/json")

	// Get product id
	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	music, err := h.MusicRepository.GetMusic(id)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	deleteMusic, err := h.MusicRepository.DeleteMusic(music)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseDelMusic(deleteMusic)}
	json.NewEncoder(w).Encode(response)
}

// func convertResponseMusic(f models.Music) musicsdto.MusicResponse {
// 	return musicsdto.MusicResponse{
// 		// ID:        f.ID,
// 		Title:     f.Title,
// 		ThumbNail: f.ThumbNail,
// 		Attache:   f.Attache,
// 		Year:      f.Year,
// 		Artist:    f.Artist,
// 	}
// }

func convertResponseDelMusic(f models.Music) models.MusicResponse {
	return models.MusicResponse{
		ID:    f.ID,
		Title: f.Title,
		Year:  f.Year,
	}
}
