FROM ksunhokim/go-node
WORKDIR /go/src/github.com/sunho/shower-server
ADD . .
RUN dep ensure -vendor-only
RUN npm install
RUN npx webpack -p --config webpack.config.prod.js
RUN go build && mv shower-server /
CMD ["/shower-server"]
