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
