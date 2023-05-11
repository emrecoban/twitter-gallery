'use server'

import { Client } from "twitter-api-sdk";
const client = new Client(process.env.BEARER_TOKEN);

export async function makeMedia(userName) {
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

    return result
}