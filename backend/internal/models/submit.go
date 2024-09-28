package models

type SubmitRequest struct {
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	Place       string `json:"place"`
	State       string `json:"state"`
	Pincode     string `json:"pinCode"`
	CouponCode  string `json:"couponCode"`
	ImageBase64 string `json:"imageBase64"`
	Comments    string `json:"comments"`
}
