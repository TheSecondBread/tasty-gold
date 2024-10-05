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

	postgresHost := os.Getenv("POSTGRES_HOST") // your database host
	user := os.Getenv("POSTGRES_USER")         // your database user
	password := os.Getenv("POSTGRES_PASSWORD") // your database password
	dbname := os.Getenv("POSTGRES_DB_NAME")    // your database name
	port := os.Getenv("POSTGRES_PORT")         // your database port

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

		// submissions table
		createTableQuery := `
			CREATE TABLE IF NOT EXISTS submissions (
				id SERIAL PRIMARY KEY,
				name VARCHAR(80) NOT NULL,
				phone TEXT NOT NULL,
				place TEXT NOT NULL,
				district TEXT NOT NULL,
				pincode TEXT NOT NULL,
				state TEXT NOT NULL,
				coupon_code TEXT NOT NULL UNIQUE,
				comments TEXT,
    			created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    			created_on_unix BIGINT DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::BIGINT NOT NULL
			);
		`

		log.Println("Setting up the database tables")
		_, err = pool.Exec(context.Background(), createTableQuery)

		if err != nil {
			log.Fatal(err)
		}

		//coupons table
		createCouponCodeTableQuery := `
			CREATE TABLE IF NOT EXISTS coupons (
				id SERIAL PRIMARY KEY,
				coupon_code TEXT NOT NULL UNIQUE,
				pin TEXT NOT NULL UNIQUE
			);
		`

		_, err = pool.Exec(context.Background(), createCouponCodeTableQuery)

		if err != nil {
			log.Fatal(err)
		}

		//winners table
		createWinnersTableQuery := `
			CREATE TABLE IF NOT EXISTS winners (
				id SERIAL PRIMARY KEY,
				user_id INT NOT NULL, -- id from submissions table
				name VARCHAR(80) NOT NULL,
				phone TEXT NOT NULL,
				coupon_code TEXT NOT NULL UNIQUE,
				place TEXT NOT NULL,
				district TEXT NOT NULL,
				pincode TEXT NOT NULL,
				state TEXT NOT NULL,
				week SMALLINT NOT NULL,
				gift_type TEXT NOT NULL DEFAULT 'silver',
				won_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
				won_on_unix BIGINT DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::BIGINT NOT NULL
			)
		`

		_, err = pool.Exec(context.Background(), createWinnersTableQuery)

		if err != nil {
			log.Fatal(err)
		}

		//tokens table to authenticate generate winners
		createTokensTableQuery := `
			CREATE TABLE IF NOT EXISTS tokens (
				id SERIAL PRIMARY KEY,
				token TEXT NOT NULL UNIQUE,
				used BOOL NOT NULL default false
			);
		`

		_, err = pool.Exec(context.Background(), createTokensTableQuery)

		if err != nil {
			log.Fatal(err)
		}

	})
}

func GetConnectionPool() *pgxpool.Pool {
	return pool
}
