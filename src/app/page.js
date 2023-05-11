'use client'

import { useState, useEffect, useTransition } from "react";
import { makeMedia } from "./_actions";
import BlurImage from "./components/BlurImage";
import Header from "./components/Header";
import LoadingSkeleton from "./components/LoadingSkeleton";

export default function TwitterGallery() {
  const [result, setResult] = useState([])
  const [mediaTweets, setMediaTweets] = useState(null)
  const [spinner, setSpinner] = useState(false)

  const handleForm = async (e) => {
    e.preventDefault()
    setSpinner(true)
    const result = await makeMedia("emreshepherd")
    setResult(result)
  }

  useEffect(() => {
    const mediaTweetsEl = result.map((tweet) => {
      return <BlurImage key={tweet.id} userName="emreshepherd" id={tweet.id} text={tweet.text} imgURL={tweet.media.url} />
    })
    setMediaTweets(mediaTweetsEl)
    setSpinner(false)
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
            />
          </div>
        </div>

      </form>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 2xl:grid-cols-5">
        <LoadingSkeleton />
      </div>
    </div>
  )
}