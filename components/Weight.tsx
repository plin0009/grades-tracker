import classNames from 'classnames'
import { Course, getTotalWeight, ID } from 'utils'
import { toPercentage } from 'utils/RationalNumber'

export type WeightProps = {
  className?: string
  course: Course
  assessmentID: ID
}

const toPercentageOptions = { decimalPlaces: 0, percentSign: true }
const Weight: React.FC<WeightProps> = ({ className, course, assessmentID }) => {
  const weight = getTotalWeight(course, assessmentID)
  if (weight !== undefined) {
    return (
      <p className={className}>{toPercentage(weight, toPercentageOptions)}</p>
    )
  }
  return <p className={classNames(className, 'text-gray-300')}>N/A</p>
}

export default Weight
