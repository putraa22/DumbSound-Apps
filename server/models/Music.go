package models

type Music struct {
	ID        int    `json:"id" gorm:"primary_key:auto_increment" `
	Title     string `json:"title" gorm:"type:varchar(225)"`
	ThumbNail string `json:"thumbnail" gorm:"type:varchar(225)"`
	Attache   string `json:"attache" gorm:"type:text" form:"attache"`
	Year      string `json:"year"  gorm:"type: varchar(50)"`
	ArtistID  int    `json:"artist_id" form:"artist_id"`
	Artist    Artist `json:"artist"`
}

type MusicResponse struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	ThumbNail string `json:"thumbnail"`
	Attache   string `json:"attache"`
	Year      string `json:"year"`
	ArtistID  int    `json:"artist_id"`
	Artist    Artist `json:"artist"`
}

type MusicArtistResponse struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	ThumbNail string `json:"thumbnail"`
	Attache   string `json:"attache"`
	Year      string `json:"year"`
	ArtistID  int    `json:"artist_id"`
	Artist    Artist `json:"artist"`
}

func (ArtistResponse) TableName() string {
	return "artists"
}

func (MusicArtistResponse) TableName() string {
	return "Musics"
}

func (MusicResponse) TableName() string {
	return "Musics"
}
