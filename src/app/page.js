import { Client } from "twitter-api-sdk";
import BlurImage from "./components/BlurImage";
import Header from "./components/Header";


const client = new Client(process.env.BEARER_TOKEN);

export default async function TwitterGallery() {
  const userName = "emreshepherd"
  const userId = await client.users.findUserByUsername(userName)
  const tweets = await client.tweets.usersIdTweets(userId.data.id, {
    max_results: 50,
    exclude: "retweets",
    expansions: "attachments.media_keys",
    "media.fields": "url,preview_image_url",
  })

  /*   const eleman = tweets.data.map(item => {
      return (<p key={item.id} className="p-3 m-2 border border-slate-300 rounded-lg">{JSON.stringify(item, 2, null)}</p>)
    }) */

  const result = tweets.data.reduce((accumulator, item) => {
    if (item.attachments && item.attachments.media_keys) {
      const mediaKeys = item.attachments.media_keys;
      mediaKeys.forEach((key) => {
        const mediaItem = tweets.includes.media.find((media) => media.media_key === key);
        if (mediaItem) {
          const obj = {
            id: item.id,
            text: item.text,
            media: {
              media_key: mediaItem.media_key,
              type: mediaItem.type,
              url: mediaItem.url || mediaItem.preview_image_url,
            }
          };
          accumulator.push(obj);
        }
      });
    }
    return accumulator;
  }, []);

  const mediaTweets = result.map((tweet) => {
    return <BlurImage key={tweet.id} userName={userName} id={tweet.id} text={tweet.text} imgURL={tweet.media.url} />
  })

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <Header />
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 2xl:grid-cols-5">
        {mediaTweets}
      </div>
    </div>
  )
}



{/* <div className="break-all p-3">
      <pre>fetch Id by username {"=>"} {JSON.stringify(userId, 2, null)}</pre>
      <div>
        {eleman}
      </div>
    </div> */}