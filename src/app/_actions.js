'use server'

import { Redis } from '@upstash/redis'
import { Client } from "twitter-api-sdk";
import { cache } from 'react';

const redis = Redis.fromEnv();
const client = new Client(process.env.BEARER_TOKEN);

export const getUser = cache(async (userName) => {
    const cached = await redis.get(userName);
    if (cached) return cached;

    const user = await client.users.findUserByUsername(userName, {
        "user.fields": "profile_image_url",
    })
    if (!user.data) {
        if (user.errors[0]?.title) throw new Error("User not found.")
    }

    await redis.set(userName, JSON.stringify(user));
    return user
})

export const getMedia = cache(async (userId) => {
    const cached = await redis.get(userId);
    if (cached) return cached;

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

    const day = 86400;
    await redis.set(userId, JSON.stringify(result), { ex: day * 4 });

    return result
})