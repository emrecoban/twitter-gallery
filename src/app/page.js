'use client'

import { useState, useEffect } from "react";
import { getUser, getMedia } from "./_actions";
import BlurImage from "./components/BlurImage";
import Header from "./components/Header";
import LoadingSkeleton from "./components/LoadingSkeleton";
import Image from "next/image";

export default function TwitterGallery() {
  const [result, setResult] = useState([])
  const [mediaTweets, setMediaTweets] = useState(null)
  const [spinner, setSpinner] = useState(false)
  const [err, setErr] = useState(false)
  const [userName, setUserName] = useState("")

  const handleForm = async (e) => {
    e.preventDefault()
    setSpinner(true)
    !err && setErr(true)
    setResult([])
    try {
      const result = await makeMedia(userName)
      setResult(result)
    } catch (error) {
      setErr(error.message)
      console.log("Error from Twitter Gallery: ", error.message)
    } finally {
      setSpinner(false)
    }
  }

  useEffect(() => {
    if (result.length != 0) {
      const mediaTweetsEl = result.map((tweet) => {
        return <BlurImage key={tweet.media.media_key} userName={userName} id={tweet.id} text={tweet.text} imgURL={tweet.media.url} />
      })
      setMediaTweets(mediaTweetsEl)
      console.log("gelen => ", result)
    }
  }, [result])

  return (
    <div className="mx-auto max-w-5xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <Header />

      <form onSubmit={handleForm}>
        <div className="max-w-md mx-auto mb-7">
          <div className="relative flex items-center w-full h-12 rounded-xl focus-within:shadow-lg bg-white overflow-hidden border border-slate-100">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              name="userName"
              placeholder="Enter Twitter username..."
              minLength="1"
              maxLength="15"
              autoComplete="off"
              pattern="^[A-Za-z0-9_]{1,15}$"
              title="A username can only contain alphanumeric characters (letters A-Z, numbers 0-9) with the exception of underscores"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
      </form>

      <div className="flex flex-row bg-slate-200 border border-slate-300 shadow rounded-md">
        <Image src="https://twitter.com/emreshepherd/photo" width="100" height="100" alt="user_image" />
      </div>

      {spinner ? (
        <div className="grid grid-cols-2 gap-y-6 gap-x-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 2xl:grid-cols-5 2xl:gap-x-4">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      ) : (
        result.length === 0 ? err && (<div className="flex flex-row justify-center">
          <h1 className="text-slate-500 text-center">Oops! I couldn&apos;t find this gallery.<br /> {err}</h1>
        </div>) : (
          <div className="grid grid-cols-2 gap-y-6 gap-x-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 2xl:grid-cols-5 2xl:gap-x-4">
            {mediaTweets}
          </div>
        )
      )}
    </div>
  )
}