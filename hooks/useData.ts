import { useEffect, useReducer } from 'react'
import update, { Spec } from 'immutability-helper'
import { ID, UserState } from '@/utils'
import { load, save, UserSave } from '@/utils/loadsave'
import { testSave } from '@/data/testSave'
import { MaybeRationalNumber } from '@/utils/RationalNumber'

export type Action =
  | {
      type: 'load'
      payload: UserState | null
    }
  | {
      type: 'update'
      payload: Spec<UserState>
    }
  | {
      type: 'updateGrade'
      payload: {
        courseID: ID
        assessmentID: ID
        grade: MaybeRationalNumber
      }
    }

const useData = () => {
  const [data, updateData] = useReducer(
    (state: UserState | null, action: Action) => {
      switch (action.type) {
        case 'load':
          return action.payload
        case 'update':
          if (state === null) return null
          return update(state, action.payload)
        case 'updateGrade':
          const { courseID, assessmentID, grade } = action.payload
          return update(state, {
            courses: {
              [courseID]: {
                assessments: {
                  [assessmentID]: {
                    grade: { $set: grade },
                  },
                },
              },
            },
          })
        default:
          console.error('Reducer action not supported')
          return state
      }
    },
    null
  )
  const loadData = (save: UserSave) =>
    updateData({ type: 'load', payload: load(save) })
  const saveData = () => (data === null ? null : save(data))

  useEffect(() => {
    const localSaveString = localStorage.getItem('userState')
    // TODO: replace `testSave` with `null`
    loadData(localSaveString === null ? testSave : JSON.parse(localSaveString))
    // TODO: save data to local storage on page close?
  }, [])

  return {
    data,
    loadData,
    saveData,
    updateData,
  }
}

export default useData
