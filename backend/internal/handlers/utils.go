package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/0jk6/tasty-gold-backend/internal/db"
	"github.com/0jk6/tasty-gold-backend/internal/models"
	"github.com/jackc/pgx/v5"
)

func sendJSONResponse(w http.ResponseWriter, data any, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	if err := json.NewEncoder(w).Encode(data); err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

// validate everything before insertion
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
		query := "INSERT INTO submissions (name, phone, place, district, pincode, state, coupon_code, comments) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
		_, err = pool.Exec(context.Background(), query, submitRequest.Name, submitRequest.Phone, submitRequest.Place, submitRequest.District, submitRequest.Pincode, submitRequest.State, submitRequest.CouponCode, submitRequest.Comments)

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

// generate winners
func generateWinners(generateWinnersRequest *models.WinnersRequest) (map[string]string, int) {
	pool := db.GetConnectionPool()

	query := `
		INSERT INTO winners (user_id, name, phone, coupon_code, place, district, pincode, state, week)
		SELECT id, name, phone, coupon_code , place, district, pincode, state, $1 FROM submissions 
		WHERE created_on > $2 and created_on < $3 
		ORDER BY RANDOM() 
		LIMIT $4
		ON CONFLICT (coupon_code) DO NOTHING;
	`

	_, err := pool.Exec(context.Background(), query, generateWinnersRequest.Week, generateWinnersRequest.StartDate, generateWinnersRequest.EndDate, generateWinnersRequest.Limit)

	/*
		while insertion, following error may occur
		1. duplicate insertions: when a row with same coupon code already exists in the winners table
		this usually happens when the winners table is populated with start_date and end_dates
		and someone is trying to repeat the same process again
	*/
	if err != nil {
		return map[string]string{"msg": "winners for this timestamp were already chosen"}, http.StatusBadRequest
	}

	//if there is no error, return a success msg

	return map[string]string{"msg": "success"}, http.StatusOK
}

func getWinnersByWeek(week int, giftType string) (map[string]any, int) {
	pool := db.GetConnectionPool()

	query := `SELECT name, phone, coupon_code, district, state, gift_type FROM winners WHERE week=$1 AND gift_type=$2`

	if giftType != "silver" {
		query = `SELECT name, phone, coupon_code, district, state, gift_type FROM winners WHERE week=$1 AND gift_type != 'silver'`
	}

	var rows pgx.Rows
	var err error

	if giftType == "silver" {
		rows, err = pool.Query(context.Background(), query, week, giftType)
	} else {
		rows, err = pool.Query(context.Background(), query, week)
	}

	if err != nil {
		if err == pgx.ErrNoRows {
			return map[string]any{"msg": "no winners found for this week"}, http.StatusOK
		} else {
			log.Println("error in getWinnersByWeek", err)
			return map[string]any{"msg": "error querying the db"}, http.StatusInternalServerError
		}
	}

	winners := make([]models.Winner, 0)

	for rows.Next() {
		var winner models.Winner

		err := rows.Scan(&winner.Name, &winner.Phone, &winner.CouponCode, &winner.District, &winner.State, &winner.GiftType)

		if err != nil {
			log.Println("error scanning row:", err)
			return map[string]any{"msg": "error processing result"}, http.StatusInternalServerError
		}

		if len(winner.Phone) != 10 {
			winner.Phone = "******8865"
		} else {
			winner.Phone = "******" + winner.Phone[6:]
		}

		winners = append(winners, winner)

	}

	if err = rows.Err(); err != nil {
		log.Println("Error during row iteration:", err)
		return map[string]any{"msg": "error processing result"}, http.StatusInternalServerError
	}

	return map[string]any{"msg": winners}, http.StatusOK

}
