import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { ApproveButton } from './buttons'

interface TextInputProps {
  className?: string
  value?: string
  setValue: (newValue: string | undefined) => void
  closeInput?: () => void
}
const TextInput: React.FC<TextInputProps> = ({
  className,
  value,
  setValue,
  closeInput,
}) => {
  const [textInput, setTextInput] = useState<string>(value ?? '')
  useEffect(() => {
    setTextInput(value ?? '')
  }, [value])
  return (
    <>
      <div
        className="fixed top-0 bottom-0 left-0 right-0 bg-gray-900 opacity-10"
        onClick={closeInput}
      />
      <div
        className={classNames(
          '-mx-4 -my-2 px-4 py-2 border-gray-300 rounded shadow-lg bg-white flex gap-4 absolute',
          className
        )}
      >
        <input
          type="text"
          size={value === undefined ? 15 : Math.max(value.length * 1.25, 15)}
          className={classNames(className, 'outline-none')}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <ApproveButton
          onClick={() => {
            setValue(textInput.trim() || undefined)
          }}
        />
      </div>
    </>
  )
}
export default TextInput
