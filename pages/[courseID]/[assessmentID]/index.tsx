import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import AssessmentTable from 'components/AssessmentTable'
import Header from 'components/Header'
import { UserStateContext } from 'pages/_app'
import { getAssessmentName, getGrade, getTotalWeight } from 'utils'
import { toPercentage } from 'utils/RationalNumber'
import Breadcrumbs from 'components/Breadcrumbs'
import EditableRationalNumber from 'components/EditableRationalNumber'
import EditableText from 'components/EditableText'
import Grade from 'components/Grade'

const AssessmentPage: NextPage = () => {
  const router = useRouter()
  const courseID = router.query.courseID as string
  const assessmentID = router.query.assessmentID as string

  const { data, updateData } = useContext(UserStateContext)

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
            <EditableText
              className="text-3xl font-bold"
              value={assessment.name}
              setValue={(newValue) =>
                updateData({
                  type: 'updateAssessment',
                  payload: { courseID, assessmentID, name: { $set: newValue } },
                })
              }
            >
              {getAssessmentName(course, assessmentID)}
            </EditableText>
          </div>
          {assessment.childrenIDs !== undefined &&
          assessment.childrenIDs.length > 0 ? (
            <AssessmentTable
              course={course}
              assessmentID={assessmentID}
              className="rounded-lg border-2 border-gray-200 bg-white"
            />
          ) : (
            <div className="w-full flex gap-4">
              <div className="flex-1 border-2 border-gray-200 rounded-xl p-4 flex flex-col items-center">
                <span>Weight</span>
                <EditableRationalNumber
                  value={assessment.weight}
                  setValue={(newValue) =>
                    updateData({
                      type: 'updateAssessment',
                      payload: {
                        courseID,
                        assessmentID,
                        weight: { $set: newValue },
                      },
                    })
                  }
                >
                  <p className="text-4xl">
                    {toPercentage(getTotalWeight(course, assessmentID))}
                  </p>
                </EditableRationalNumber>
              </div>
              <div className="flex-1 border-2 border-gray-200 rounded-xl p-4 flex flex-col items-center">
                <span>Grade</span>
                {/*
                 *<EditableGrade
                 *  className="text-4xl"
                 *  course={course}
                 *  assessmentID={assessmentID}
                 *  backup="average"
                 * />
                 */}
                <EditableRationalNumber
                  value={assessment.grade}
                  setValue={(newValue) =>
                    updateData({
                      type: 'updateAssessment',
                      payload: {
                        courseID,
                        assessmentID,
                        grade: { $set: newValue },
                      },
                    })
                  }
                >
                  <Grade
                    className="text-4xl"
                    grade={getGrade(course, assessmentID)}
                    backup="average"
                  />
                </EditableRationalNumber>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default AssessmentPage
