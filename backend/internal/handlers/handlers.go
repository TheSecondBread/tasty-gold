package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/0jk6/tasty-gold-backend/internal/db"
	"github.com/0jk6/tasty-gold-backend/internal/models"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	mp := map[string]string{"msg": "hello"}
	sendJSONResponse(w, mp, http.StatusOK)
}

func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
	mp := map[string]string{"status": "ok"}
	sendJSONResponse(w, mp, http.StatusOK)
}

func SubmissionHandler(w http.ResponseWriter, r *http.Request) {
	var submitRequest models.SubmitRequest

	err := json.NewDecoder(r.Body).Decode(&submitRequest)

	if err != nil {
		sendJSONResponse(w, map[string]string{"msg": "error parsing request body"}, http.StatusBadRequest)
		return
	}

	//continue only if the required data is present
	if submitRequest.Name == "" || submitRequest.Phone == "" || submitRequest.CouponCode == "" || submitRequest.ImageBase64 == "" {
		sendJSONResponse(w, map[string]string{"msg": "some mandatory field is missing"}, http.StatusBadRequest)
		return
	}

	result, httpStatus := insertIntoDB(&submitRequest)

	sendJSONResponse(w, result, httpStatus)
}

func CheckCouponHandler(w http.ResponseWriter, r *http.Request) {
	coupon := r.URL.Query().Get("coupon")

	if coupon == "" {
		sendJSONResponse(w, map[string]string{"msg": "invalid coupon"}, http.StatusBadRequest)
		return
	}

	var submissionId int
	pool := db.GetConnectionPool()

	query := `SELECT id FROM submissions WHERE coupon_code = $1`

	pool.QueryRow(context.Background(), query, coupon).Scan(&submissionId)

	if submissionId == 0 {
		sendJSONResponse(w, map[string]string{"msg": "coupon is not submitted"}, http.StatusOK)
		return
	}

	sendJSONResponse(w, map[string]string{"msg": "coupon already exists"}, http.StatusOK)
}

func GenerateWinnersHandler(w http.ResponseWriter, r *http.Request) {
	//authenticate this route with an API key or a bearer token, hardcode this value for now
	//get the unix timestamps from the request
	var generateWinnersRequest models.WinnersRequest

	err := json.NewDecoder(r.Body).Decode(&generateWinnersRequest)

	if err != nil {
		log.Println(err)
		sendJSONResponse(w, map[string]string{"msg": "error parsing request body"}, http.StatusBadRequest)
		return
	}

	validTokens := []string{
		"padoXbrAjTldzGnLSIfs",
		"pPdShVytkvBoNkOSLDQo",
		"GHGWJjVlzLehTcVbHKNk",
		"rqzwRVZGBOHpurdysPLN",
		"gwugMMGsqmHdxUrvuaOe",
	}

	found := false
	for _, v := range validTokens {
		if v == generateWinnersRequest.Token {
			found = true
			break
		}
	}

	if found == false {
		sendJSONResponse(w, "404 page not found", http.StatusNotFound)
		return
	}

	//continue only if the required data is present
	if generateWinnersRequest.StartDate == "" || generateWinnersRequest.EndDate == "" || generateWinnersRequest.Week == 0 {
		sendJSONResponse(w, map[string]string{"msg": "some mandatory field is missing"}, http.StatusBadRequest)
		return
	}

	result, httpStatus := generateWinners(&generateWinnersRequest)

	sendJSONResponse(w, result, httpStatus)

}

func GetWinnersByWeekHandler(w http.ResponseWriter, r *http.Request) {
	weekStr := r.URL.Query().Get("week")

	if weekStr == "" {
		sendJSONResponse(w, map[string]string{"msg": "missing 'week' query parameter"}, http.StatusBadRequest)
		return
	}

	week, err := strconv.Atoi(weekStr)

	if err != nil {
		sendJSONResponse(w, map[string]string{"msg": "'week' should be a whole number"}, http.StatusBadRequest)
		return
	}

	result, httpStatus := getWinnersByWeek(week)

	sendJSONResponse(w, result, httpStatus)

}
