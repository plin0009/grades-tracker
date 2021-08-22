import { useContext, useState } from 'react'
import { Course, getAssessmentName, ID } from 'utils'
import classNames from 'classnames'
import Grade from 'components/Grade'
import Link from 'next/link'
import Weight from 'components/Weight'
import EditableRationalNumber from 'components/EditableRationalNumber'
import { UserStateContext } from 'pages/_app'
import EditableWeight from 'components/EditableWeight'

interface AssessmentProps {
  course: Course
  assessmentID: ID
  depth?: number
}
const WrappedAssessment: React.FC<AssessmentProps> = ({
  course,
  assessmentID,
  depth = 0,
}) => {
  const [expanded, setExpanded] = useState<boolean>(true)
  const assessment = course.assessments[assessmentID]
  const hasChildren = assessment.childrenIDs !== undefined
  const { updateData } = useContext(UserStateContext)
  return (
    <div>
      <div className="flex gap-4 px-4 py-2 rounded group items-center">
        <div className="overflow-hidden" style={{ paddingLeft: `${depth}em` }}>
          {hasChildren && (
            <button
              className="absolute -ml-8 w-6 h-6 bg-white border rounded shadow hidden group-hover:block"
              onClick={() => setExpanded((t) => !t)}
            >
              <span className="absolute left-1.5 right-1.5 top-2.5 bottom-2.5 bg-gray-300" />
              {!expanded && (
                <span className="absolute top-1.5 bottom-1.5 left-2.5 right-2.5 bg-gray-300" />
              )}
            </button>
          )}
          <p className="truncate">{getAssessmentName(course, assessmentID)}</p>
        </div>
        <Link href={`/${course.id}/${assessmentID}`} passHref>
          <a className="px-2 rounded border text-gray-400 shadow hidden group-hover:block text-sm">
            Open
          </a>
        </Link>
        <div className="flex-1" />
        <div className="w-16 text-center flex-shrink-0">
          <EditableWeight
            value={
              assessment.weight === 'parent' ? undefined : assessment.weight
            }
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
          </EditableWeight>
        </div>
        <div className="w-16 text-center flex-shrink-0">
          <EditableRationalNumber
            value={assessment.grade}
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
      <div className={classNames({ hidden: !expanded })}>
        {assessment.childrenIDs?.map((childID, index) => (
          <Assessment
            key={index}
            course={course}
            assessmentID={childID}
            depth={depth + 1}
          />
        ))}
      </div>
    </div>
  )
}
const Assessment = WrappedAssessment
//const Assessment = memo(WrappedAssessment)

export default Assessment
