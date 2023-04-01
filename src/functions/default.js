import AWS from 'aws-sdk'
const dynamoDB = new AWS.DynamoDB({
    endpoint: 'http://127.0.0.1:8000',
    region: 'eu-north-1',
    credentials: {
     accessKeyId: 'fakeMyKeyId',
     secretAccessKey: 'fakeSecretAccessKey',
    },
  })
  const api = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: 'http://localhost:3001',
  });
export const handler = async (event, context) => {
    const connectionId = event.requestContext.connectionId;
  const message = event.body;
    console.log(message)
    const result = await dynamoDB.scan({
        TableName: 'connections',
        ProjectionExpression: 'connectionId',
      }).promise();
      const promises = result.Items.map(async ({ connectionId }) => {
        console.log(connectionId)
        try {
          await api.postToConnection({ ConnectionId: connectionId, Data: message }).promise();
        } catch (error) {
          // Handle errors
        }
      });
    
      await Promise.all(promises);
      return {
        statusCode: 200,
        body: 'Connected.'
    }
      }
