# Froogl

Froogl is a web interface to keep track of savings you make throughout the day. Choose not to eat out for lunch that day? Track that decision in Froogl! The goal is to help you keep track of the frugal decisions you make, and very easily see how quickly the dollars and cents add up by doing so. The end result being that seeing the benefit of those frugal decisions helps reinforce and encourage them!

The application is written in Vue with a serverless backend of AWS Lambda, DynamoDB, and Cognito. It's easily accessible from any web browser including on mobile, and the infrastructure fits entirely in the AWS free tier.

## Architecture - *Work in Progress*

Placeholder.

### Entry object format

{
    "2018": {
        "03": {
            "31": {
                {item1},
                {item2}
            }
        },
        "04": {
            "12": {
                {item3},
                {item4}
            }
        }
    }
}

## Deployment

### Pre-requisites ### 
- Serverless framework CLI (https://www.npmjs.com/package/serverless) installed on your deployment workstation 
- Cognito Configured (Need Identity Pool ID, User Pool ID, and Client ID)

### Serverless Deployment
1. `npm install`
2. Edit `serverless.yml` and configure custom->s3Bucket to a globally unique name.
3. `sls deploy`
4. Capture the API Gateway URL base value in Service Information -> Endpoint (e.g. `https://a2b3b4c5.execute-api.us-east-1.amazonaws.com/dev/`). This will need to be configured in the app code. Run `sls info` to get this information again after deployment.

### Application Code Deployment
1. `cd app`
2. `sls info`
3. Edit `src/main.js` and configure `axios.defaults.baseURL` to the API Gateway URL base value determined from the `sls info` command.
4. Edit `src/config/index.js` and configure `region`, `IdentityPoolId`, `UserPoolId`, and `ClientId`.
5. Edit `package.json` and configure config->aws->bucket to the value set in serverless.yml's custom->s3Bucket.
6. `npm install`
7. `npm run-script build`
8. `npm run-script deploy`
9. Browse to: http://<s3Bucket-name>.s3-website-us-east-1.amazonaws.com/

## Local Testing - *Work in Progress*

### Start local instance

1. `npm install`
2. `sls dynamodb install`
3. `sls offline start`

### Test API

* Test adding item: `curl -X POST "https://kf9dip0u7c.execute-api.us-east-1.amazonaws.com/dev/items?name=orange&price=400&date=02-01-18"`
* Test getting item: `curl -X GET "https://kf9dip0u7c.execute-api.us-east-1.amazonaws.com/dev/items"`
* Test deleting item `curl -X POST "https://kf9dip0u7c.execute-api.us-east-1.amazonaws.com/dev/delete-item?name=orange"`

## References

https://serverless.com/blog/serverless-express-rest-api/

https://github.com/serverless/examples/tree/master/aws-node-single-page-app-via-cloudfront

https://github.com/wolfeidau/cognito-vue-bootstrap

https://serverless.com/framework/docs/providers/aws/events/apigateway/#http-endpoints-with-custom-authorizers

https://serverless.com/blog/cors-api-gateway-survival-guide/

