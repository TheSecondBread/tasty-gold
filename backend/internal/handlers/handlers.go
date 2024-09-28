package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/0jk6/tasty-gold-backend/internal/db"
	"github.com/0jk6/tasty-gold-backend/internal/models"
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
	if submitRequest.FirstName == "" || submitRequest.Phone == "" || submitRequest.CouponCode == "" || submitRequest.ImageBase64 == "" {
		SendJSONResponse(w, map[string]string{"msg": "some mandatory field is missing"}, http.StatusBadRequest)
		return
	}

	//process the request, i.e., store it in the db
	pool := db.GetConnectionPool()
	query := "INSERT INTO submissions (FirstName, LastName, Email, Phone, Place, State, Pincode, CouponCode, ImageBase64, Comments) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
	_, err = pool.Exec(context.Background(), query, submitRequest.FirstName, submitRequest.LastName, submitRequest.Email, submitRequest.Phone, submitRequest.Place, submitRequest.State, submitRequest.Pincode, submitRequest.CouponCode, submitRequest.ImageBase64, submitRequest.Comments)

	if err != nil {
		// fmt.Println(err)
		SendJSONResponse(w, map[string]string{"error": "failed to insert data in the database"}, http.StatusBadRequest)
		return
	}

	SendJSONResponse(w, map[string]string{"msg": "success"}, http.StatusOK)
}

func SendJSONResponse(w http.ResponseWriter, data any, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	if err := json.NewEncoder(w).Encode(data); err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}
