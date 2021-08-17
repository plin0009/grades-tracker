import { Course, getAssessmentName, getTotalWeight, ID } from '../utils'
import { toPercentage } from '../utils/RationalNumber'

interface AssessmentOverviewProps {
  course: Course
  assessmentID: ID
}
export const AssessmentOverview: React.FC<AssessmentOverviewProps> = ({
  course,
  assessmentID,
}) => {
  const assessment = course.assessments[assessmentID]
  return (
    <div className="my-4">
      <div
        className={`flex w-full justify-between gap-4 ${
          assessment.parentID === undefined ? 'font-bold' : ''
        }`}
      >
        <p>{getAssessmentName(course, assessmentID)}</p>
        <p>{toPercentage(getTotalWeight(course, assessmentID))}</p>
      </div>
      <div className="pl-4">
        {assessment.childrenIDs?.map((childID, index) => (
          <AssessmentOverview
            key={index}
            course={course}
            assessmentID={childID}
          />
        ))}
      </div>
    </div>
  )
}
