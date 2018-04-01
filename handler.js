"use strict";

const AWS = require("aws-sdk");

const IS_OFFLINE = process.env.IS_OFFLINE;

const NAMES_TABLE = process.env.NAMES_TABLE;
let dynamoDb;

if (IS_OFFLINE === "true") {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000"
  });
  console.log(dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
}

module.exports.saveItem = (event, context, callback) => {
  let response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };
  const user = "earl";
  const name = event.queryStringParameters.name;
  const price = event.queryStringParameters.price;
  console.log(`Request to save item ${name} with price ${price}`);

  const params = {
    TableName: NAMES_TABLE,
    Item: {
      user,
      name,
      price
    }
  };

  dynamoDb.put(params, error => {
    if (error) {
      console.log(error);
      response.statusCode = 400;
      response.body = JSON.stringify({ error: "Could not save name" });

      callback(null, response);
    }
    response.body = JSON.stringify({ user, name, price });
    callback(null, response);
  });
};

module.exports.getItems = (event, context, callback) => {
  let response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };

  const params = {
    TableName: NAMES_TABLE,
    FilterExpression: "#user = :query",
    ExpressionAttributeNames: {
      "#user": "user"
    },
    ExpressionAttributeValues: {
      ":query": "earl"
    }
  };

  var count = 0;
  var allItems = [];

  dynamoDb.scan(params, onScan);

  function onScan(err, data) {
    if (err) {
      console.log(error);
      response.statusCode = 400;
      response.body = JSON.stringify({ error: "Could not retrieve items" });

      callback(null, response);
    } else {
      console.log("Scan succeeded.");
      data.Items.forEach(function(itemdata) {
        console.log("Item " + ++count + ": " + JSON.stringify(itemdata));
        allItems.push(itemdata);
      });
      //const { name, price } = result.Item;

      if (typeof data.LastEvaluatedKey != "undefined") {
        console.log("Scanning for more...");
        params.ExclusiveStartKey = data.LastEvaluatedKey;
        dynamoDb.scan(params, onScan);
      }

      response.body = JSON.stringify(allItems);
      callback(null, response);
    }
  }
};

module.exports.deleteItem = (event, context, callback) => {
  let response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };

  const name = event.queryStringParameters.name;
  const user = "earl";

  const params = {
    TableName: NAMES_TABLE,
    /*
    ConditionExpression: "itemname = :query",
    ExpressionAttributeNames: {
      "#user": "user"
    },
    ExpressionAttributeValues: {
      ":query": "earl"
    }, */
    Key: {
      name: name//,
      //user: user
    }
  };

  console.log("Attempting to delete (" + name + ", " + user + ")...");
  dynamoDb.delete(params, function(err, data) {
    if (err) {
      console.error(
        "Unable to delete item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      response.statusCode = 400;
      response.body = JSON.stringify({ error: "Could not delete" });
    } else {
      console.log("Delete Item succeeded:", JSON.stringify(data, null, 2));
      response.body = "Delete Item succeeded.";
      callback(null, response);
    }
  });
};
