import type { NextPage } from 'next'
import Head from 'next/head'
import { AssessmentOverview } from '../components/Assessment'
import { testSave } from '../data/testSave'
import { load } from '../utils/loadsave'

const Home: NextPage = () => {
  //const [data, setData] = useState(load(testSave))
  const data = load(testSave)

  console.log(data)

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
                  {course.rootAssessmentIDs.map((assessmentID, index) => (
                    <AssessmentOverview
                      key={index}
                      course={course}
                      assessmentID={assessmentID}
                    />
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
