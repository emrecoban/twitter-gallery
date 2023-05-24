<h1 align="center"><img src="public/twitter.svg" height="60" align="center" /><br />Twitter Gallery</h1>

Twitter Gallery is an **open-source** MIT-licensed [Next.js](https://github.com/vercel/next.js) application that allows you to easily browse and filter media files from Twitter users.

Try it: [twittergallery.emre.run](https://twittergallery.emre.run), OR [twittergallery.emre.run/](https://twittergallery.emre.run)`{username}`

## The Problem

Twitter's built-in media tab is often cumbersome to use, and it lacks the ability to search within the media section alone. This limitation can be frustrating for users who primarily want to explore and view images without the distractions of other types of content. To address this issue, I have built Twitter Gallery.

## Features

With my app, you can effortlessly discover and filter media files shared by Twitter users. Here's what sets Twitter Gallery apart:

- **Streamlined Media Display:** I have reimagined the way media files are presented, providing a clean and intuitive interface focused solely on visual content. Say goodbye to clutter and distractions as you browse through beautiful images.
- **Multiple Columns:** Twitter Gallery optimizes screen space by displaying photos in multiple columns, allowing you to view more images at once. This efficient layout ensures you can explore media files more efficiently and enjoy a seamless browsing experience.
- **Enhanced Search Functionality:** My app empowers you to search specifically within the media section of Twitter. Easily find images related to your interests or discover captivating photography from your favorite users. Twitter Gallery takes the frustration out of media exploration.
- **Caching System with Redis:** Faster response time, fewer API requests. Caches frequently accessed data, reducing the need to fetch information from the database or external services repeatedly. Optimizes performance by minimizing response time and API calls.

## Screenshots

![search-result-wIcons-for-psychdelicpics](/github_assets/ss3.png)
![search-result-for-shouldhavecat](/github_assets/ss1.png)
![filter-result-for-changeinvolume](/github_assets/ss2.png)

## Directory Structure

```bash
├── public
│   ├── gallery.svg
│   ├── github.svg
│   ├── placeholder.jpeg
│   └── twitter.svg
├── src
│   └── app
│       ├── components
│       │   ├── BlurImage.jsx
│       │   ├── Header.jsx
│       │   └── LoadingSkeleton.jsx
│       ├── _actions.js
│       ├── layout.js
│       ├── page.js
│       ├── globals.css
│       └── icon.svg
├── next.config.js
├── tailwind.config.js
└── README.md
```

## Built with

- JavaScript
- Tailwind CSS
- React
- Next.js
- [@upstash/redis SDK](https://docs.upstash.com/redis/sdks/javascriptsdk/overview)
- [Twitter API SDK](https://github.com/twitterdev/twitter-api-typescript-sdk)
- [AutoAnimate](https://github.com/formkit/auto-animate)

## Installation

1. Clone the repository to your local machine:

```bash
  git clone https://github.com/emrecoban/twitter-gallery.git
```

2. Navigate to the project directory:

```bash
  cd twitter-gallery
```

3. Install the dependencies using `npm`:

```bash
  npm install
```

4. Don't forget to configure `.env` file. Get your [Twitter API Token](https://developer.twitter.com/en/portal/dashboard) and [Create Redis database](https://console.upstash.com/):

```bash
BEARER_TOKEN="{YOUR API TOKEN}"
UPSTASH_REDIS_REST_URL="{YOUR URL}"
UPSTASH_REDIS_REST_TOKEN="{YOUR API TOKEN}"
```

5. Start the development server:

```bash
  npm run dev
```

6. Open your web browser and go to [http://localhost:3000](http://localhost:3000) to view the application.

That's it! You should now have the project running locally on your machine. If you encounter any issues, be sure to check the project's documentation and issue tracker on GitHub.

## Contributing

Bug reports, feature requests, and pull requests are welcome. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.

## Support

- Sponsor to me on GitHub.
- Give a star to this repo.
- Upvote on [ProductHunt](https://www.producthunt.com/posts/twitter-gallery-2).
- Follow me on Twitter [@emreshepherd](https://twitter.com/emreshepherd), or GitHub [@emrecoban](https://github.com/emrecoban).
- Buy me a coffee, or book: https://www.buymeacoffee.com/emrecoban

## References

- [Users Lookup - Twitter Developer Platform](https://developer.twitter.com/en/docs/twitter-api/users/lookup/introduction)
- [Timelines - Twitter Developer Platform](https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/introduction)
- [Official TS/JS SDK for the Twitter API v2](https://github.com/twitterdev/twitter-api-typescript-sdk)
- [Image Gallery with Next.js](https://github.com/leerob/image-gallery-supabase-tailwind-nextjs)

## Changelog

- **[v1.1](https://github.com/emrecoban/twitter-gallery/releases/tag/v1.1):** It now uses Redis database for faster response time, fewer API requests.
- **[v1.0](https://github.com/emrecoban/twitter-gallery/releases/tag/v1.0):** The first version was born!

## License

The Twitter Gallery is available as open source under the terms of the [MIT License](https://github.com/emrecoban/twitter-gallery/blob/main/LICENSE).
