'use server'

import { Client } from "twitter-api-sdk";
import { cache } from 'react';

const client = new Client(process.env.BEARER_TOKEN);

export const getUser = cache(async (userName) => {
    const user = await client.users.findUserByUsername(userName, {
        "user.fields": "profile_image_url",
    })
    if (!user.data) {
        if (user.errors[0]?.title) throw new Error("User not found.")
    }
    return user
})

export const getMedia = cache(async (userId) => {
    const tweets = await client.tweets.usersIdTweets(userId, {
        max_results: 100,
        exclude: "retweets",
        expansions: "attachments.media_keys",
        "media.fields": "url,preview_image_url",
    })
    if (tweets.meta?.result_count === 0) throw new Error("There is no image available.")

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
})