package r2

import (
	"bytes"
	"context"
	"encoding/base64"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type S3Service struct {
	s3Client *s3.Client
	bucket   string
}

// Function to initialize Cloudflare R2 service
func NewR2Service() (*S3Service, error) {
	// Replace these values with your Cloudflare R2 Storage credentials
	account := os.Getenv("ACCOUNT")
	accessKey := os.Getenv("ACCESS_KEY")
	secretKey := os.Getenv("SECRET_KEY")
	bucket := os.Getenv("BUCKET_NAME")

	// Create custom resolver for R2 endpoint
	r2Resolver := aws.EndpointResolverWithOptionsFunc(func(service, region string, options ...interface{}) (aws.Endpoint, error) {
		return aws.Endpoint{
			URL: fmt.Sprintf("https://%s.r2.cloudflarestorage.com", account),
		}, nil
	})

	// Load AWS config with custom resolver
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithEndpointResolverWithOptions(r2Resolver),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(accessKey, secretKey, "")),
		config.WithRegion("apac"),
	)
	if err != nil {
		return nil, err
	}

	// Create a new S3 client
	s3Client := s3.NewFromConfig(cfg)

	return &S3Service{
		s3Client: s3Client,
		bucket:   bucket,
	}, nil

}

// Function to upload file to Cloudflare R2 Storage
func (s *S3Service) UploadFileToR2(ctx context.Context, key string, file []byte) error {
	input := &s3.PutObjectInput{
		Bucket:      aws.String(s.bucket),
		Key:         aws.String(key),
		Body:        bytes.NewReader(file),
		ContentType: aws.String("image/jpeg"),
	}

	// Upload the file
	_, err := s.s3Client.PutObject(ctx, input)
	if err != nil {
		return err
	}

	return nil
}

func Upload(imageBase64, imageName string) {
	// Initialize the Cloudflare R2 service
	s3Service, err := NewR2Service()
	if err != nil {
		log.Println("Cannot connect to Cloudflare R2.")
		log.Println(err)
	}

	//must remove the base64 header from the given string
	splits := strings.Split(imageBase64, ",")

	if len(splits) > 1 {
		imageBase64 = splits[1]
	} else {
		imageBase64 = splits[0]
	}
	imageBytes, err := base64.StdEncoding.DecodeString(imageBase64)

	if err != nil {
		log.Println("Failed to decode base64 image")
		log.Println(err)
	}

	// Upload a sample file
	err = s3Service.UploadFileToR2(context.TODO(), imageName+".png", imageBytes)
	if err != nil {
		log.Println(err)
	}
}
