import classNames from 'classnames'
import { CalculatedGrade } from '@/utils'
import { toDecimal } from '@/utils/RationalNumber'

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
const Grade: React.FC<GradeProps> = ({ grade, className, mode, backup }) => {
  if (mode === undefined && grade.inputted !== undefined) {
    return <p className={className}>{toDecimal(grade.inputted)}</p>
  }
  if ((mode === 'total' || backup === 'total') && grade.total !== undefined)
    return (
      <p className={classNames(className, 'bg-yellow-200 rounded')}>
        {toDecimal(grade.total)}
      </p>
    )
  if (
    (mode === 'average' || backup === 'average') &&
    grade.average !== undefined
  )
    return (
      <p className={classNames(className, 'bg-purple-100 rounded')}>
        {toDecimal(grade.average)}
      </p>
    )
  return <p className={className}></p>
}

export default Grade
