import RationalNumberInput from 'components/RationalNumberInput'
import { useState } from 'react'
import { MaybeRationalNumber } from 'utils/RationalNumber'

interface EditableRationalNumberProps {
  value: MaybeRationalNumber
  setValue: (newValue: MaybeRationalNumber) => void
}

const EditableRationalNumber: React.FC<EditableRationalNumberProps> = ({
  value,
  setValue,
  children,
}) => {
  const [editing, setEditing] = useState(false)

  return (
    <div className="group-a relative">
      {children}
      {editing ? (
        <>
          <div
            className="fixed z-40 inset-0 bg-gray-900 opacity-10"
            onClick={() => setEditing(false)}
          />
          <div className="absolute z-50 top-0 -left-8 bg-white rounded shadow-lg p-4">
            <RationalNumberInput
              className="relative"
              value={value}
              setValue={(newValue) => {
                setValue(newValue)
                setEditing(false)
              }}
              closeInput={() => setEditing(false)}
            />
          </div>
        </>
      ) : (
        <div className="absolute left-full -top-2 -bottom-2 flex px-2 items-center z-30">
          <button
            className="px-2 rounded border text-gray-400 bg-white shadow hidden group-a-hover:block text-sm"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  )
}

export default EditableRationalNumber
