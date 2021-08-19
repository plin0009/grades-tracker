import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import AssessmentTable from 'components/AssessmentTable'
import Header from 'components/Header'
import { UserStateContext } from 'pages/_app'
import { getAssessmentName, getTotalWeight } from 'utils'
import { toPercentage } from 'utils/RationalNumber'
import Breadcrumbs from 'components/Breadcrumbs'
import EditableGrade from 'components/Grade/EditableGrade'

const AssessmentPage: NextPage = () => {
  const router = useRouter()
  const courseID = router.query.courseID as string
  const assessmentID = router.query.assessmentID as string

  const { data } = useContext(UserStateContext)

  if (data === null) return <p>No data</p>
  if (data.courses[courseID] === undefined) return <p>Course not found</p>
  const course = data.courses[courseID]
  if (course.assessments[assessmentID] === undefined)
    return <p>Assessment not found</p>
  const assessment = course.assessments[assessmentID]
  return (
    <div className="flex flex-col min-h-screen max-w-screen-lg m-auto px-4">
      <Header />
      <main>
        <div className="border-2 border-gray-200 mb-8 p-8 rounded-xl">
          <div className="mb-4">
            <Breadcrumbs course={course} assessmentID={assessmentID} />
            <h2 className="text-3xl font-bold">
              {getAssessmentName(course, assessmentID)}
            </h2>
          </div>
          {assessment.childrenIDs !== undefined &&
          assessment.childrenIDs.length > 0 ? (
            <AssessmentTable
              course={course}
              assessmentID={assessmentID}
              className="rounded-lg border-2 border-gray-200 bg-white"
            />
          ) : (
            <div>
              <p>{toPercentage(getTotalWeight(course, assessmentID))}</p>
              <div className="border-2 border-gray-200 rounded-xl p-4 w-64 flex flex-col items-center">
                <span>Grade</span>
                <EditableGrade
                  className="text-4xl"
                  course={course}
                  assessmentID={assessmentID}
                  backup="average"
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default AssessmentPage
