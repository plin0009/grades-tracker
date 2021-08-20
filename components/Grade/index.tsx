import classNames from 'classnames'
import { Course, getGrade, ID } from 'utils'
import { toPercentage } from 'utils/RationalNumber'

export type GradeProps = {
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

const toPercentageOptions = { decimalPlaces: 0, percentSign: false }
const Grade: React.FC<GradeProps> = ({
  course,
  assessmentID,
  className,
  mode,
  backup,
}) => {
  const grade = getGrade(course, assessmentID)
  if (mode === undefined && grade.inputted !== undefined) {
    return (
      <p className={className}>
        {toPercentage(grade.inputted, toPercentageOptions)}
      </p>
    )
  }
  if ((mode === 'total' || backup === 'total') && grade.total !== undefined)
    return (
      <p className={classNames(className, 'bg-yellow-200 rounded')}>
        {toPercentage(grade.total, toPercentageOptions)}
      </p>
    )
  if (
    (mode === 'average' || backup === 'average') &&
    grade.average !== undefined
  )
    return (
      <p className={classNames(className, 'bg-purple-100 rounded')}>
        {toPercentage(grade.average, toPercentageOptions)}
      </p>
    )
  return <p className={classNames(className, 'text-gray-300')}>N/A</p>
}

export default Grade
