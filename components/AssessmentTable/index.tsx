import classNames from 'classnames'
import { Course, getGrade, getTotalWeight, ID } from '@/utils'
import { toPercentage } from '@/utils/RationalNumber'
import Grade from '@/components/Grade'
import Assessment from './Assessment'

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
        <p className="w-16 text-center">
          {toPercentage(getTotalWeight(course, assessmentID))}
        </p>
        <Grade
          className="w-16 text-center"
          grade={getGrade(course, assessmentID)}
          backup="average"
        />
      </div>
    </div>
  )
}

export default AssessmentTable
