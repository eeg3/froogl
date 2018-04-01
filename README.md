# Froogl

Froogl Application

## Build Setup

npm install
sls dynamodb install
sls offline start

## Test API

curl -X POST "https://kf9dip0u7c.execute-api.us-east-1.amazonaws.com/dev/items?name=orange&price=400"
curl -X GET "https://kf9dip0u7c.execute-api.us-east-1.amazonaws.com/dev/items"
curl -X POST "https://kf9dip0u7c.execute-api.us-east-1.amazonaws.com/dev/delete-item?name=orange"

## References

https://serverless.com/blog/serverless-express-rest-api/

https://github.com/serverless/examples/tree/master/aws-node-single-page-app-via-cloudfront

https://github.com/wolfeidau/cognito-vue-bootstrap

https://serverless.com/framework/docs/providers/aws/events/apigateway/#http-endpoints-with-custom-authorizers

https://serverless.com/blog/cors-api-gateway-survival-guide/