import classNames from 'classnames'
import RationalNumberInput from 'components/RationalNumberInput'
import { UserStateContext } from 'pages/_app'
import { useContext, useState } from 'react'
import { Course, getGrade, ID } from 'utils'
import Grade from '.'

type EditableGradeProps = {
  className?: string
  course: Course
  assessmentID: ID
} & (
  | {
      mode?: undefined
      backup: 'total' | 'average' | 'none'
    }
  | {
      mode: 'total' | 'average'
      backup?: undefined
    }
)

const EditableGrade: React.FC<EditableGradeProps> = ({
  className,
  course,
  assessmentID,
  ...gradeProps
}) => {
  const [editing, setEditing] = useState(false)
  const { updateData } = useContext(UserStateContext)

  const assessment = course.assessments[assessmentID]
  return (
    <div className="flex gap-2 group items-center relative">
      <Grade
        className={classNames(className, 'group-hover:block')}
        grade={getGrade(course, assessmentID)}
        {...gradeProps}
      />

      {editing ? (
        <RationalNumberInput
          className="absolute top-0 -left-8"
          value={assessment.grade}
          setValue={(newValue) => {
            updateData({
              type: 'updateGrade',
              payload: { courseID: course.id, assessmentID, grade: newValue },
            })
            setEditing(false)
          }}
          closeInput={() => setEditing(false)}
        />
      ) : (
        <button
          className="px-2 rounded border text-gray-400 shadow hidden group-hover:block text-sm"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
      )}
    </div>
  )
}

export default EditableGrade
