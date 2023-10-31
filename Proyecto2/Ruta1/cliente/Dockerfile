
FROM golang:alpine

WORKDIR /app

COPY . .

RUN go build -o got4

EXPOSE 8000
CMD ["./got4"]