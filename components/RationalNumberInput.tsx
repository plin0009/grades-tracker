import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { MaybeRationalNumber, RationalNumber } from 'utils/RationalNumber'

interface RationalNumberInputProps {
  value: MaybeRationalNumber
  setValue: (newValue: MaybeRationalNumber) => void
}
const RationalNumberInput: React.FC<RationalNumberInputProps> = ({
  value,
  setValue,
}) => {
  const defaultNumeratorInput = value === undefined ? '' : '' + value[0]
  const defaultDenominatorInput = value === undefined ? '' : '' + value[1]
  const [numeratorInput, setNumeratorInput] = useState<string>(
    defaultNumeratorInput
  )
  const [denominatorInput, setDenominatorInput] = useState<string>(
    defaultDenominatorInput
  )
  const canSave = !isNaN(+numeratorInput) && !isNaN(+denominatorInput)
  useEffect(() => {
    setNumeratorInput(defaultNumeratorInput)
    setDenominatorInput(defaultDenominatorInput)
  }, [defaultNumeratorInput, defaultDenominatorInput])
  return (
    <div className="my-4 flex flex-wrap items-center gap-2">
      <div className="items-center flex gap-2">
        <input
          type="text"
          className="rounded shadow border-2 border-gray-300 px-4 py-2 w-20 text-center"
          value={numeratorInput}
          onChange={(e) => setNumeratorInput(e.target.value)}
        />
        <div
          className={classNames(
            'flex items-center gap-2 focus-within:opacity-100',
            {
              'opacity-20': denominatorInput === '',
            }
          )}
        >
          {' / '}
          <input
            type="text"
            className="rounded shadow border-2 border-gray-300 px-4 py-2 w-20 text-center"
            value={denominatorInput}
            onChange={(e) => setDenominatorInput(e.target.value)}
            placeholder="100"
          />
        </div>
      </div>
      <div className="justify-evenly flex gap-2">
        <button
          className="rounded-full w-12 h-12 bg-gray-200 px-4 py-2 disabled:opacity-40"
          disabled={numeratorInput === '' && denominatorInput === ''}
          onClick={() => {
            setNumeratorInput('')
            setDenominatorInput('')
          }}
        >
          ⌫
        </button>
        <button
          className="rounded-full w-12 h-12 bg-green-200 px-4 py-2 disabled:opacity-40"
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
        >
          ✓
        </button>
      </div>
    </div>
  )
}
export default RationalNumberInput
