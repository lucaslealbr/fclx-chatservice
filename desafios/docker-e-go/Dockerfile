FROM golang:alpine AS builder

WORKDIR /go/src
COPY . .

RUN go build -o /go/bin/hello

FROM scratch

COPY --from=builder /go/bin/hello /go/bin/hello

ENTRYPOINT ["/go/bin/hello"]