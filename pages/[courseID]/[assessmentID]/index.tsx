import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import AssessmentTable from 'components/AssessmentTable'
import Header from 'components/Header'
import { UserStateContext } from 'pages/_app'
import { dateToDayjs, getAssessmentName } from 'utils'
import Breadcrumbs from 'components/Breadcrumbs'
import EditableRationalNumber from 'components/EditableRationalNumber'
import EditableText from 'components/EditableText'
import Grade from 'components/Grade'
import Weight from 'components/Weight'
import EditableWeight from 'components/EditableWeight'
import dayjs from 'dayjs'
import AssessmentCalendar from 'components/AssessmentCalendar'

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
            <>
              <AssessmentTable
                course={course}
                assessmentID={assessmentID}
                className="rounded-lg border-2 border-gray-200 bg-white"
              />
              <AssessmentCalendar course={course} assessmentID={assessmentID} />
            </>
          ) : (
            <div className="w-full flex gap-4">
              <div className="flex-1 border-2 border-gray-200 rounded-xl p-4 flex flex-col items-center">
                <span>Weight</span>
                <EditableWeight
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
                  <Weight
                    className="text-4xl"
                    course={course}
                    assessmentID={assessmentID}
                  />
                </EditableWeight>
              </div>
              <div className="flex-1 border-2 border-gray-200 rounded-xl p-4 flex flex-col items-center">
                <span>Grade</span>
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
                    course={course}
                    assessmentID={assessmentID}
                    backup="average"
                  />
                </EditableRationalNumber>
              </div>
              <div className="flex-1 border-2 border-gray-200 rounded-xl p-4 flex flex-col items-center">
                <span>Due Date</span>
                {assessment.dueDate !== undefined ? (
                  <p className="text-2xl">
                    {dateToDayjs(assessment.dueDate).format('MMM D')}
                    {assessment.dueDate?.time
                      ? dateToDayjs(assessment.dueDate).format(' h:mm A')
                      : ''}
                  </p>
                ) : (
                  <p className="text-4xl text-gray-300">{'N/A'}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default AssessmentPage
