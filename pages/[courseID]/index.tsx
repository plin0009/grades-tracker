import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import AssessmentTable from '../../components/AssessmentTable'
import Header from '../../components/Header'
import { UserStateContext } from '../_app'

const CoursePage: NextPage = () => {
  const router = useRouter()
  const courseID = router.query.courseID as string

  const { data } = useContext(UserStateContext)

  if (data === null) return <p>No data</p>
  if (data.courses[courseID] === undefined) return <p>Course not found</p>
  const course = data.courses[courseID]
  return (
    <div className="flex flex-col min-h-screen max-w-screen-lg m-auto px-4">
      <Header />
      <main>
        <div className="border-2 border-gray-200 mb-8 p-8 rounded-xl">
          <div className="mb-4">
            <h2 className="text-3xl font-bold">{course.code}</h2>
            <p className="text-lg text-gray-500">{course.title}</p>
          </div>
          <AssessmentTable
            course={course}
            className="rounded-lg border-2 border-gray-200 bg-white"
          />
        </div>
      </main>
    </div>
  )
}

export default CoursePage
