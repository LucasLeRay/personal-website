exports.handler = async function ({ body }) {
  const { id, user, count } = body

  // WRITE IN DB from field with (ID === id / USER === user) - COUNT = count
  // If it doesn't exist, create it
  
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  }
}
