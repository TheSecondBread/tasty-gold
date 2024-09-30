package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/0jk6/tasty-gold-backend/internal/db"
	"github.com/0jk6/tasty-gold-backend/internal/models"
	"github.com/jackc/pgx/v5"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	mp := map[string]string{"msg": "hello"}
	SendJSONResponse(w, mp, http.StatusOK)
}

func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
	mp := map[string]string{"status": "ok"}
	SendJSONResponse(w, mp, http.StatusOK)
}

func SubmissionHandler(w http.ResponseWriter, r *http.Request) {

	var submitRequest models.SubmitRequest

	err := json.NewDecoder(r.Body).Decode(&submitRequest)

	if err != nil {
		SendJSONResponse(w, map[string]string{"msg": "error parsing request body"}, http.StatusBadRequest)
		return
	}

	//continue only if the required data is present
	if submitRequest.Name == "" || submitRequest.Phone == "" || submitRequest.CouponCode == "" || submitRequest.ImageBase64 == "" {
		SendJSONResponse(w, map[string]string{"msg": "some mandatory field is missing"}, http.StatusBadRequest)
		return
	}

	result, httpStatus := insertIntoDB(&submitRequest)

	SendJSONResponse(w, result, httpStatus)
}

func SendJSONResponse(w http.ResponseWriter, data any, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	if err := json.NewEncoder(w).Encode(data); err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

//validate everything before insertion
func insertIntoDB(submitRequest *models.SubmitRequest) (map[string]string, int) {
	//process the request, i.e., store it in the db
	pool := db.GetConnectionPool()

	var fetchedCoupon string
	couponQuery := "SELECT coupon_code FROM coupons WHERE coupon_code = $1"

	err := pool.QueryRow(context.Background(), couponQuery, submitRequest.CouponCode).Scan(&fetchedCoupon)

	if err != nil {
		if err == pgx.ErrNoRows {
			//coupon code not found in the table
			// SendJSONResponse(w, map[string]string{"msg": "invalid coupon"}, http.StatusBadRequest)
			return map[string]string{"msg": "invalid coupon"}, http.StatusBadRequest
		} else {
			// SendJSONResponse(w, map[string]string{"error": "failed to query the database"}, http.StatusBadRequest)
			return map[string]string{"error": "failed to query the database"}, http.StatusBadRequest
		}
	}

	if fetchedCoupon == submitRequest.CouponCode {
		query := "INSERT INTO submissions (name, phone, place, district, pincode, state, coupon_code, comments, image_base_64) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
		_, err = pool.Exec(context.Background(), query, submitRequest.Name, submitRequest.Phone, submitRequest.Place, submitRequest.District, submitRequest.Pincode, submitRequest.State, submitRequest.CouponCode, submitRequest.Comments, submitRequest.ImageBase64)

		if err != nil {
			// fmt.Println(err)
			// SendJSONResponse(w, map[string]string{"msg": "coupon already exists"}, http.StatusBadRequest)
			return map[string]string{"msg": "coupon already exists"}, http.StatusBadRequest
		}
	} else {
		// SendJSONResponse(w, map[string]string{"msg": "failed to query the database"}, http.StatusBadRequest)
		return map[string]string{"msg": "failed to query the database"}, http.StatusBadRequest
	}

	return map[string]string{"msg": "success"}, http.StatusOK
}
