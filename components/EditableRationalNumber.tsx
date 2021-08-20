import RationalNumberInput from 'components/RationalNumberInput'
import { useState } from 'react'
import { MaybeRationalNumber } from 'utils/RationalNumber'

interface EditableGradeProps {
  value: MaybeRationalNumber
  setValue: (newValue: MaybeRationalNumber) => void
}

const EditableRationalNumber: React.FC<EditableGradeProps> = ({
  value,
  setValue,
  children,
}) => {
  const [editing, setEditing] = useState(false)

  return (
    <div className="flex gap-2 group items-center relative">
      {children}
      {editing ? (
        <RationalNumberInput
          className="absolute top-0 -left-8"
          value={value}
          setValue={(newValue) => {
            setValue(newValue)
            setEditing(false)
          }}
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

export default EditableRationalNumber
