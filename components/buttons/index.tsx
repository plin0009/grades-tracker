import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'

const defaultClasses =
  'rounded-full w-12 h-12 border-2 disabled:opacity-40 shadow text-lg'
export const BackButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => (
  <button
    className={classNames(
      defaultClasses,
      'border-gray-300 text-gray-400',
      className
    )}
    {...props}
  >
    ←
  </button>
)

export const ClearButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => (
  <button
    className={classNames(
      defaultClasses,
      'border-red-300 text-red-400',
      className
    )}
    {...props}
  >
    ⌫
  </button>
)
export const ApproveButton: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...props }) => (
  <button
    className={classNames(
      defaultClasses,
      'border-green-300 text-green-400',
      className
    )}
    {...props}
  >
    ✓
  </button>
)
