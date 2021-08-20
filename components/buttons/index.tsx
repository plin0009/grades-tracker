import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'

export const BackButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => (
  <button
    className={classNames(
      'rounded-full w-12 h-12 border-2 border-gray-300 text-gray-400 disabled:opacity-40 shadow text-lg',
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
      'rounded-full w-12 h-12 border-2 border-red-300 text-red-400 disabled:opacity-40 shadow text-lg',
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
      'rounded-full w-12 h-12 border-2 border-green-300 text-green-400 disabled:opacity-40 shadow text-lg',
      className
    )}
    {...props}
  >
    ✓
  </button>
)
