exports.handler = async function ({ queryStringParameters }) {
  const { id, user } = queryStringParameters

  const count // Get total count of likes from ID === id
  const userLikes // also get total likes count from USER === user

  return {
    statusCode: 200,
    body: JSON.stringify({
      count,
      userLikes,
    })
  }
}
