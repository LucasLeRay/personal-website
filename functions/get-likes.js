const faunadb = require('faunadb')
const q = faunadb.query

const dbClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const limit = process.env.LIKE_LIMIT

exports.handler = async function ({ queryStringParameters }) {
  const { id, userId } = queryStringParameters

  if (!id || !userId) {
    return { statusCode: 400, body: 'Invalid parameter' }
  }

  try {
    const idExists = await dbClient.query(
      q.Exists(q.Match(q.Index('likes_by_id'), id))
    )
    const total = idExists ? await dbClient.query(
      q.Sum(q.Match(q.Index('likes_by_id'), id))
      ) : 0

    const idAndUserIdExists = await dbClient.query(
      q.Exists(q.Match(q.Index('likes_by_user_id'), [id, userId]))
      )

    const fromUser = idAndUserIdExists ? await dbClient.query(
      q.Get(q.Match(q.Index('likes_by_user_id'), [id, userId]))
    ) : { data: { count: 0 } }

    return {
      statusCode: 200,
      body: JSON.stringify({
        total,
        fromUser: fromUser.data.count,
      })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
