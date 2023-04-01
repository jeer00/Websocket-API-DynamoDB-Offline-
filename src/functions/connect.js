import AWS from 'aws-sdk'

export const handler  = async (event, context) => {
  const connectionId = event.requestContext.connectionId


const dynamoDB = new AWS.DynamoDB({
  endpoint: 'http://127.0.0.1:8000',
  region: 'eu-north-1',
  credentials: {
   accessKeyId: 'fakeMyKeyId',
   secretAccessKey: 'fakeSecretAccessKey',
  },
})


dynamoDB.putItem({
  TableName: 'connections',
  Item: {
    connectionId: {
      S: connectionId
    }
  }
}, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred        // successful response
});

return {
    statusCode: 200,
    body: 'Connected.'
}

}