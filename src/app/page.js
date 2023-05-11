import { Client } from "twitter-api-sdk";

const client = new Client(process.env.BEARER_TOKEN);

export default async function TwitterGallery() {
  const userId = await client.users.findUserByUsername("emreshepherd")
  const tweets = await client.tweets.usersIdTweets(userId.data.id)

  return (
    <>
      <h1>selam</h1>
      <pre>{JSON.stringify(userId, 2, null)}</pre>
      <pre>{JSON.stringify(tweets, 2, null)}</pre>
    </>
  )
}