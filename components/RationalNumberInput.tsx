import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { MaybeRationalNumber, RationalNumber } from 'utils/RationalNumber'
import { ApproveButton, BackButton, ClearButton } from './buttons'

interface RationalNumberInputProps {
  className?: string
  value: MaybeRationalNumber
  setValue: (newValue: MaybeRationalNumber) => void
  closeInput?: () => void
}
const RationalNumberInput: React.FC<RationalNumberInputProps> = ({
  className,
  value,
  setValue,
  closeInput,
}) => {
  const defaultNumeratorInput = value === undefined ? '' : '' + value[0]
  const defaultDenominatorInput =
    value === undefined || value[1] === 100 ? '' : '' + value[1]
  const [numeratorInput, setNumeratorInput] = useState<string>(
    defaultNumeratorInput
  )
  const [denominatorInput, setDenominatorInput] = useState<string>(
    defaultDenominatorInput
  )
  const canSave =
    (numeratorInput !== '' || denominatorInput === '') &&
    !isNaN(+numeratorInput) &&
    !isNaN(+denominatorInput) &&
    (denominatorInput === '' || +denominatorInput !== 0)
  useEffect(() => {
    setNumeratorInput(defaultNumeratorInput)
    setDenominatorInput(defaultDenominatorInput)
  }, [defaultNumeratorInput, defaultDenominatorInput])
  return (
    <>
      <div className="flex justify-center items-center gap-2">
        <input
          type="text"
          className="rounded-lg shadow border-2 border-gray-300 px-4 py-2 w-20 text-center outline-none focus:ring"
          value={numeratorInput}
          onChange={(e) => setNumeratorInput(e.target.value.trim())}
        />
        <div
          className={classNames(
            'flex items-center gap-2 focus-within:opacity-100',
            {
              'opacity-20': denominatorInput === '',
            }
          )}
        >
          <span className="w-4 -mx-2 text-center">{' / '}</span>
          <input
            type="text"
            className="rounded-lg shadow border-2 border-gray-300 px-4 py-2 w-20 text-center outline-none focus:ring"
            value={denominatorInput}
            onChange={(e) => setDenominatorInput(e.target.value.trim())}
            placeholder="100"
          />
        </div>
      </div>
      <div className="m-auto w-44 justify-between flex gap-2 mt-4">
        <BackButton disabled={closeInput === undefined} onClick={closeInput} />
        <ClearButton
          disabled={numeratorInput === '' && denominatorInput === ''}
          onClick={() => {
            setNumeratorInput('')
            setDenominatorInput('')
          }}
        />
        <ApproveButton
          disabled={!canSave}
          onClick={() => {
            if (!canSave || numeratorInput === '') {
              setValue(undefined)
              return
            }
            const numerator = +numeratorInput
            const denominator =
              +denominatorInput === 0 ? 100 : +denominatorInput
            setValue(RationalNumber(numerator, denominator))
          }}
        />
      </div>
    </>
  )
}
export default RationalNumberInput
