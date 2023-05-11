import { Client } from "twitter-api-sdk";

const client = new Client(process.env.BEARER_TOKEN);

export default async function TwitterGallery() {
  const gelen = await client.users.findUserByUsername("emreshepherd")
  return (
    <>
      <h1>selam</h1>
      <pre>{JSON.stringify(gelen, 2, null)}</pre>
    </>
  )
}