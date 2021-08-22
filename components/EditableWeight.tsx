import classNames from 'classnames'
import RationalNumberInput from 'components/RationalNumberInput'
import { useState } from 'react'
import { Assessment } from 'utils'
import { ApproveButton, BackButton } from './buttons'

interface EditableWeightProps {
  value: Assessment['weight']
  setValue: (newValue: Assessment['weight']) => void
}

const EditableWeight: React.FC<EditableWeightProps> = ({
  value,
  setValue,
  children,
}) => {
  const [editing, setEditing] = useState(false)
  const [mode, setMode] = useState<'parent' | 'manual'>(
    value === 'parent' ? 'parent' : 'manual'
  )

  return (
    <div className="group-a relative">
      {children}
      {editing ? (
        <>
          <div
            className="fixed z-40 inset-0 bg-gray-900 opacity-10"
            onClick={() => setEditing(false)}
          />
          <div className="absolute z-40 top-0 -left-8 w-60 bg-white rounded shadow-lg p-4">
            <div className="mb-4 text-sm flex gap-2 justify-center whitespace-nowrap">
              <button
                className={classNames('rounded-full px-3 py-1 border shadow', {
                  'shadow-none opacity-40': mode !== 'manual',
                })}
                onClick={() => setMode('manual')}
              >
                Manual
              </button>
              <button
                className={classNames('rounded-full px-3 py-1 border shadow', {
                  'shadow-none opacity-40': mode !== 'parent',
                })}
                onClick={() => setMode('parent')}
              >
                Auto-split
              </button>
            </div>
            {mode === 'manual' ? (
              <div className="">
                <RationalNumberInput
                  className="relative"
                  value={value === 'parent' ? undefined : value}
                  setValue={(newValue) => {
                    setValue(newValue)
                    setEditing(false)
                  }}
                  closeInput={() => setEditing(false)}
                />
              </div>
            ) : (
              <div>
                <p className="text-sm">
                  The remaining weight from the parent component is split with
                  other Auto-split components.
                </p>
                <div className="justify-center flex gap-2 mt-4">
                  <BackButton
                    onClick={() => {
                      setEditing(false)
                    }}
                  />
                  <ApproveButton
                    onClick={() => {
                      setValue('parent')
                      setEditing(false)
                    }}
                  />
                </div>
              </div>
            )}
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

export default EditableWeight
