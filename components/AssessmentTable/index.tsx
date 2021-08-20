import classNames from 'classnames'
import { Course, ID } from 'utils'
import Grade from 'components/Grade'
import Assessment from './Assessment'
import Weight from 'components/Weight'
import EditableRationalNumber from 'components/EditableRationalNumber'
import { useContext } from 'react'
import { UserStateContext } from 'pages/_app'

interface AssessmentTableProps {
  className?: string
  course: Course
  assessmentID?: ID
}
const AssessmentTable: React.FC<AssessmentTableProps> = ({
  course,
  assessmentID = 'root',
  className,
}) => {
  const { updateData } = useContext(UserStateContext)
  return (
    <div className={classNames(className)}>
      <div className="flex gap-4 px-4 py-2 border-b-2 border-gray-200 font-semibold">
        <p className="flex-1 truncate">Name</p>
        <p className="w-16 text-center">Weight</p>
        <p className="w-16 text-center">Grade</p>
      </div>

      {course.assessments[assessmentID].childrenIDs?.map(
        (assessmentID, index) => (
          <Assessment key={index} course={course} assessmentID={assessmentID} />
        )
      )}

      <div className="flex gap-4 px-4 py-2 border-t-2 border-gray-200">
        <p className="flex-1 truncate">Total</p>
        <div className="w-16 text-center flex-shrink-0">
          <EditableRationalNumber
            value={course.assessments[assessmentID].weight}
            setValue={(newValue) =>
              updateData({
                type: 'updateAssessment',
                payload: {
                  courseID: course.id,
                  assessmentID,
                  weight: { $set: newValue },
                },
              })
            }
          >
            <Weight course={course} assessmentID={assessmentID} />
          </EditableRationalNumber>
        </div>
        <div className="w-16 text-center flex-shrink-0">
          <EditableRationalNumber
            value={course.assessments[assessmentID].grade}
            setValue={(newValue) =>
              updateData({
                type: 'updateAssessment',
                payload: {
                  courseID: course.id,
                  assessmentID,
                  grade: { $set: newValue },
                },
              })
            }
          >
            <Grade
              course={course}
              assessmentID={assessmentID}
              backup="average"
            />
          </EditableRationalNumber>
        </div>
      </div>
    </div>
  )
}

export default AssessmentTable
