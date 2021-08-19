import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useContext } from 'react'
import Header from '@/components/Header'
import { UserStateContext } from './_app'

const Home: NextPage = () => {
  const { data } = useContext(UserStateContext)

  return (
    <div className="flex flex-col min-h-screen max-w-screen-lg m-auto px-4">
      <Head>
        <title>Grades Tracker</title>
        <meta
          name="description"
          content="App to keep track of your school assignments"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="mb-8 rounded-xl">
          <h2 className="text-center text-xl mb-4">Courses</h2>
          <div className="flex flex-col gap-4">
            {data === null ? (
              <p>No data found</p>
            ) : (
              data.courseIDs
                .map((courseID) => data.courses[courseID])
                .map((course) => (
                  <div
                    key={course.id}
                    className="rounded-xl p-8 w-full border-2 border-gray-200"
                  >
                    <div>
                      <Link href={`/${course.id}`} passHref>
                        <a>
                          <h2 className="text-2xl font-bold">{course.code}</h2>
                        </a>
                      </Link>
                      <p className="text-gray-500">{course.title}</p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
