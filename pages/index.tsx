import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Grades Tracker</title>
        <meta
          name="description"
          content="App to keep track of your school assignments"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center p-8 flex flex-col min-h-screen max-w-screen-lg m-auto">
        <h1 className="text-4xl font-bold">Grades Tracker</h1>
        <div className="flex justify-end my-4 gap-4">
          <button className="px-4 py-2 bg-gray-500 rounded-md shadow-md text-white font-bold">
            Import
          </button>
          <button
            className="px-4 py-2 bg-gray-500 rounded-md shadow-md text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            Export
          </button>
        </div>
        <div className="flex-1 bg-gray-100 my-4 p-8 rounded-xl shadow-inner">
          <h2 className="text-2xl">Courses</h2>
          <div className="m-4 flex flex-col gap-4">
            <div className="rounded-xl h-24 w-full bg-white shadow" />
            <div className="rounded-xl h-24 w-full bg-white shadow" />
            <div className="rounded-xl h-24 w-full bg-white shadow" />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
