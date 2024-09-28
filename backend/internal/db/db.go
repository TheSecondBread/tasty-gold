package db

import (
	"context"
	"fmt"
	"log"
	"os"
	"sync"

	"github.com/jackc/pgx/v5/pgxpool"
)

var (
	pool *pgxpool.Pool //use this with db.pool.Exec
	once sync.Once
)

func SetupConnectionPool() {

	postgresHost := os.Getenv("POSTGRES_HOST")

	user := os.Getenv("POSTGRES_USER")         // your database user
	password := os.Getenv("POSTGRES_PASSWORD") // your database password
	dbname := os.Getenv("POSTGRES_DB_NAME")    // your database name
	port := "5432"                             // your database port

	connStr := fmt.Sprintf("postgres://%s:%s@%s:%s/%s", user, password, postgresHost, port, dbname)

	//execute the following block only one time, just like the singleton pattern
	once.Do(func() {
		var err error
		pool, err = pgxpool.New(context.Background(), connStr)

		if err != nil {
			log.Fatal(err)
		}

		err = pool.Ping(context.Background())
		if err != nil {
			log.Fatal(err)
		}

		// Setup the primary table
		createTableQuery := `
			CREATE TABLE IF NOT EXISTS submissions (
				id SERIAL PRIMARY KEY,
				FirstName VARCHAR(80) NOT NULL,
				LastName VARCHAR(80) NOT NULL,
				Email VARCHAR(80) NOT NULL,
				Phone TEXT NOT NULL,
				Place TEXT NOT NULL,
				State TEXT NOT NULL,
				Pincode TEXT NOT NULL,
				CouponCode TEXT NOT NULL UNIQUE,
				ImageBase64 TEXT NOT NULL,
				Comments TEXT NOT NULL
			);
		`

		log.Println("Setting up the database tables")
		_, err = pool.Exec(context.Background(), createTableQuery)

		if err != nil {
			log.Fatal(err)
		}

		createCouponCodeTableQuery := `
			CREATE TABLE IF NOT EXISTS coupons (
				id SERIAL PRIMARY KEY,
				CouponCode TEXT NOT NULL UNIQUE
			);
		`

		_, err = pool.Exec(context.Background(), createCouponCodeTableQuery)

		if err != nil {
			log.Fatal(err)
		}

	})
}

func GetConnectionPool() *pgxpool.Pool {
	return pool
}
