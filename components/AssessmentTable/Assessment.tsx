import { useState } from 'react'
import {
  Course,
  getAssessmentName,
  getGrade,
  getTotalWeight,
  ID,
} from '../../utils'
import { toPercentage } from '../../utils/RationalNumber'
import classNames from 'classnames'
import Grade from '../Grade'

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
  return (
    <div>
      <div
        className={classNames(
          'flex gap-4 px-4 py-2 rounded',
          //{ 'font-bold': assessment.parentID === undefined },
          { 'cursor-pointer hover:bg-gray-100': hasChildren }
        )}
        onClick={() => setExpanded((t) => !t)}
      >
        <p className="flex-1 truncate" style={{ paddingLeft: `${depth}em` }}>
          {getAssessmentName(course, assessmentID)}
        </p>
        <p className="w-16 text-center">
          {toPercentage(getTotalWeight(course, assessmentID))}
        </p>
        <Grade
          className="w-16 text-center"
          grade={getGrade(course, assessmentID)}
          backup="average"
        />
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
