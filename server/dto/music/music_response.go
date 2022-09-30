package musicsdto

import "dumbsound/models"

type MusicResponse struct {
	Title     string        `json:"title" form:"title" gorm:"type:varchar(225)" validate:"required"`
	ThumbNail string        `json:"thumbnail" form:"thumbnail" gorm:"type:varchar(225)" validate:"required"`
	Attache   string        `json:"attache" form:"attache" gorm:"type:text" `
	Year      string        `json:"year" form:"year" gorm:"type: varchar(50)"`
	ArtistID  int           `json:"artist_id" form:"artist_id" gorm:"type: int"`
	Artist    models.Artist `json:"artist"`
}
