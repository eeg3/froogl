# Froogl

Froogl Application

## Build Setup

npm install
sls dynamodb install
sls offline start

## Test API

curl -X POST "http://localhost:3000/name?name=KT&age=30"
curl -X GET "http://localhost:3000/name?name=KT"

## References

https://serverless.com/blog/serverless-express-rest-api/

https://github.com/serverless/examples/tree/master/aws-node-single-page-app-via-cloudfront

https://github.com/wolfeidau/cognito-vue-bootstrap