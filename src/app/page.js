'use client'

import { useState, useEffect } from "react";
import { makeMedia } from "./_actions";
import BlurImage from "./components/BlurImage";
import Header from "./components/Header";
import LoadingSkeleton from "./components/LoadingSkeleton";

export default function TwitterGallery() {
  const [result, setResult] = useState([])
  const [mediaTweets, setMediaTweets] = useState(null)
  const [spinner, setSpinner] = useState(false)
  const [userName, setUserName] = useState("")

  const handleForm = async (e) => {
    e.preventDefault()
    setSpinner(true)
    setResult([])
    try {
      const result = await makeMedia(userName)
      setResult(result)
    } catch (error) {
      console.log("gelen hata=> ", error)
    } finally {
      setSpinner(false)
    }
  }

  useEffect(() => {
    const mediaTweetsEl = result.map((tweet) => {
      return <BlurImage key={tweet.media.media_key} userName={userName} id={tweet.id} text={tweet.text} imgURL={tweet.media.url} />
    })
    setMediaTweets(mediaTweetsEl)
    console.log("gelen => ", result)
  }, [result])

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
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
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>

      </form>


      {spinner ? (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 2xl:grid-cols-5">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      ) : (
        result.length === 0 ? (<div className="flex flex-row justify-center">
          <h1 className="text-slate-500">Oops! I couldn&apos;t find this gallery.</h1>
        </div>) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 2xl:grid-cols-5">
            {mediaTweets}
          </div>
        )
      )}
    </div>
  )
}