const faunadb = require('faunadb')
const q = faunadb.query

const dbClient = new faunadb.Client({ secret: process.env.FAUNA_DB_SECRET });
const limit = process.env.LIKE_LIMIT

exports.handler = async function ({ httpMethod, body }, context, callback) {
  const { id, userId, count } = JSON.parse(body);
  if (httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  } else if (!id || !userId || isNaN(count) || count > limit) {
    return { statusCode: 400, body: 'Invalid parameter' }
  }
  
  try {
    const res = await dbClient.query(
      q.If(
        q.Exists(q.Match(q.Index('likes_by_user_id'), [ id, userId ])),
        q.Update(
          q.Select(['ref'], q.Get(q.Match(
            q.Index("likes_by_user_id"), [ id, userId ]
          ))),
          { data: { count } }
        ),
        q.Create(q.Collection('likes'), { data: { id, userId, count } })
      )
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    }
  }
}
