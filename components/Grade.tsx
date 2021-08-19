import classNames from 'classnames'
import { CalculatedGrade } from 'utils'
import { toPercentage } from 'utils/RationalNumber'

type GradeProps = {
  className?: string
  grade: CalculatedGrade
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
const Grade: React.FC<GradeProps> = ({ grade, className, mode, backup }) => {
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
  return <p className={className}></p>
}

export default Grade
