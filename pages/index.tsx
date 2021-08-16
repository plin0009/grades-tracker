import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { testSave } from '../data/testSave'
import { getAssessmentName, getTotalWeight } from '../utils'
import { load } from '../utils/loadsave'
import { toPercentage } from '../utils/RationalNumber'

const Home: NextPage = () => {
  //const [data, setData] = useState(load(testSave))
  const data = load(testSave)

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

      <main className="p-8 flex flex-col min-h-screen max-w-screen-lg m-auto">
        <h1 className="text-center text-4xl font-bold">Grades Tracker</h1>
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
        <div className="flex-1 bg-gray-100 my-4 p-8 rounded-xl">
          <h2 className="text-center text-xl font-bold">Courses</h2>
          <div className="m-4 flex flex-col gap-4">
            {data.courses.map((course) => (
              <div key={course.id} className="rounded-xl p-8 w-full bg-white">
                <h2 className="text-2xl">{course.code}</h2>
                <p className="text-gray-500">{course.title}</p>
                <div>
                  {Object.entries(course.groups).map(([id, group]) => (
                    <div key={id}>
                      <div className="flex justify-between">
                        <p className="font-bold">{group.name}</p>
                        <p className="font-bold">
                          {toPercentage(getTotalWeight(course, id))}
                        </p>
                      </div>
                      {group.assessments.map((assessmentId) => (
                        <div
                          key={assessmentId}
                          className="flex w-full justify-between"
                        >
                          <p>{getAssessmentName(course, assessmentId)}</p>
                          <p>
                            {toPercentage(
                              course.assessments[assessmentId].weight
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                  {course.ungrouped?.map((assessmentId) => (
                    <div
                      key={assessmentId}
                      className="flex w-full justify-between"
                    >
                      <p className="font-bold">
                        {getAssessmentName(course, assessmentId)}
                      </p>
                      <p className="font-bold">
                        {toPercentage(course.assessments[assessmentId].weight!)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
