'use client'

import { useState, useEffect, useRef } from "react";
import { getUser, getMedia } from "./_actions";
import BlurImage from "./components/BlurImage";
import Header from "./components/Header";
import LoadingSkeleton from "./components/LoadingSkeleton";
import Image from "next/image";
import autoAnimate from '@formkit/auto-animate'

export default function TwitterGallery() {
  const autoParent = useRef(null)
  const autoGrid = useRef(null)
  const searchBox = useRef(null)
  const [mainresult, setMainresult] = useState([])
  const [result, setResult] = useState([])
  const [mediaTweets, setMediaTweets] = useState(null)
  const [spinner, setSpinner] = useState(false)
  const [err, setErr] = useState(false)
  const [userName, setUserName] = useState("")
  const [acc, setAcc] = useState(false)
  const [search, setSearch] = useState("")

  const handleForm = async (e) => {
    e.preventDefault()
    searchBox.current && searchBox.current.blur()
    setSpinner(true)
    !err && setErr(true)
    setResult([])
    setMainresult([])
    try {
      const account = await getUser(userName)
      const result = await getMedia(account.data.id)
      setResult(result)
      setMainresult(result)
      setAcc(account)
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
    }
  }, [result])

  useEffect(() => {
    autoAnimate(autoParent.current)
    autoGrid.current && autoAnimate(autoGrid.current)
    setResult(() => {
      const filteredGallery = mainresult.filter(tweet => tweet.text.toLowerCase().includes(search.toLowerCase()));
      return filteredGallery;
    });
  }, [search])

  return (
    <div className="mx-auto max-w-5xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8" ref={autoParent}>
      <Header />
      {search.length === 0 && (
        <form onSubmit={handleForm}>
          <div className="max-w-md mx-auto mb-4">
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
                ref={searchBox}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
        </form>
      )}

      {(!spinner && mainresult.length != 0) && (
        <div className="flex flex-row bg-slate-50 border border-slate-100 shadow-sm rounded-md mb-4 p-3 items-center gap-x-3">
          <div className="flex flex-row items-center gap-x-2">
            <Image src={acc.data?.profile_image_url} width="48" height="48" alt="user_image" className="rounded-full" />
            <h3>{acc.data?.name}</h3>
          </div>
          <div className="w-full flex-1">
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-sm bg-white overflow-hidden border border-slate-100">
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
                name="search"
                placeholder="Type something to filter the gallery..."
                minLength="1"
                maxLength="25"
                autoComplete="off"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

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
          <>
            <div className="grid grid-cols-2 gap-y-6 gap-x-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 2xl:grid-cols-5 2xl:gap-x-4" ref={autoGrid}>
              {mediaTweets}
            </div>
            <div className="text-center text-sm text-slate-400">
              (Only the last 100 tweets)
            </div>
          </>
        )
      )}
    </div>
  )
}