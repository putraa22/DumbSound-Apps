package models

import "time"

type Artist struct {
	ID          int     `json:"id" gorm:"primary_key:auto_increment"`
	Name        string  `json:"name" gorm:"type:varchar(225)"`
	Old         string  `json:"old" gorm:"type:varchar(50)"`
	Type        string  `json:"type" gorm:"type:varchar(50)"`
	StartCareer int     `json:"startCareer" gorm:"type:int"`
	Musics      []Music `json:"-"`
	// MusicID		int			`json:"music_id"`
	// Music
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type ArtistResponse struct {
	ID          int     `json:"id" gorm:"primary_key:auto_increment"`
	Name        string  `json:"name" gorm:"type:varchar(225)"`
	Old         string  `json:"old" gorm:"type:varchar(50)"`
	Type        string  `json:"type" gorm:"type:varchar(50)"`
	StartCareer int     `json:"startCareer" gorm:"type:int"`
	Musics      []Music `json:"-"`
}
