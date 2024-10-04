package main

import (
	"log"
	"net/http"

	"github.com/0jk6/tasty-gold-backend/internal/db"
	"github.com/0jk6/tasty-gold-backend/internal/handlers"
	"github.com/0jk6/tasty-gold-backend/internal/middlewares"
)

func main() {
	//setup the database connection pool
	log.Println("Setting up database connection pool")
	db.SetupConnectionPool()

	mux := http.NewServeMux()
	mux.HandleFunc("GET /{$}", handlers.HomeHandler)
	mux.HandleFunc("GET api/v1/healthcheck", handlers.HealthCheckHandler)
	mux.HandleFunc("POST api/v1/submit", handlers.SubmissionHandler)
	mux.HandleFunc("GET api/v1/checkcoupon", handlers.CheckCouponHandler)

	mux.HandleFunc("POST /api/v1/generatewinners", handlers.GenerateWinnersHandler)
	mux.HandleFunc("GET /api/v1/getwinners", handlers.GetWinnersByWeekHandler)

	wrappedMux := middlewares.NewLogger(middlewares.NewCors(mux))

	log.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", wrappedMux))
}
