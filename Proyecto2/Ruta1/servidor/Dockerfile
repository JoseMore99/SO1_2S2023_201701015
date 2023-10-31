
FROM golang:alpine

WORKDIR /app

COPY . .

RUN go build -o got4

EXPOSE 8001
CMD ["./got4"]