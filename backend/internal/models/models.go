package models

type SubmitRequest struct {
	Name        string `json:"name"`
	Phone       string `json:"phone"`
	Place       string `json:"place"`
	District    string `json:"district"`
	Pincode     string `json:"pinCode"`
	State       string `json:"state"`
	CouponCode  string `json:"couponCode"`
	Comments    string `json:"comments"`
	ImageBase64 string `json:"imageBase64"`
}

type WinnersRequest struct {
	StartDate string `json:"start_date"`
	EndDate   string `json:"end_date"`
	Week      int16  `json:"week"`
	Limit     int16  `json:"limit"`
	Token     string `json:"token"`
}

type Winner struct {
	Name       string `json:"name"`
	Phone      string `json:"phone"`
	CouponCode string `json:"coupon_code"`
	Place      string `json:"place"`
	District   string `json:"district"`
	State      string `json:"state"`
	GiftType   string `json:"gift_type"`
}
