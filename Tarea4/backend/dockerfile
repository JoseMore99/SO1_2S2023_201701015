
FROM golang:alpine

WORKDIR /app

COPY . .

RUN go build -o got4

EXPOSE 8080
CMD ["./got4"]