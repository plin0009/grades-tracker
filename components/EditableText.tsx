import classNames from 'classnames'
import { useState } from 'react'
import TextInput from './TextInput'

type EditableTextProps = {
  className?: string
  value?: string
  setValue: (newValue: string | undefined) => void
  closeInput?: () => void
}
const EditableText: React.FC<EditableTextProps> = ({
  className,
  value,
  setValue,
  children,
}) => {
  const [editing, setEditing] = useState(false)

  return (
    <div className="flex gap-2 group items-center relative">
      <p className={classNames(className)}>{children}</p>{' '}
      {editing ? (
        <TextInput
          value={value}
          setValue={(newValue) => {
            setValue(newValue)
            setEditing(false)
          }}
          className={classNames(className)}
          closeInput={() => setEditing(false)}
        />
      ) : (
        <button
          className="px-2 rounded border text-gray-400 shadow hidden group-hover:block text-sm"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
      )}
    </div>
  )
}

export default EditableText
