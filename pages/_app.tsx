import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, Dispatch } from 'react'
import useData, { Action } from '@/hooks/useData'
import { UserSave } from '@/utils/loadsave'
import { UserState } from '@/utils'

export const UserStateContext = createContext({
  data: null as UserState | null,
  updateData: (() => {}) as Dispatch<Action>,
  loadData: (_: UserSave) => {},
  saveData: () => {},
})

function MyApp({ Component, pageProps }: AppProps) {
  const contextValue = useData()
  return (
    <UserStateContext.Provider value={contextValue}>
      <Component {...pageProps} />
    </UserStateContext.Provider>
  )
}
export default MyApp
