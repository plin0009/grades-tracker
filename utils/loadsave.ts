import { UserState } from '.'

export interface UserSave extends UserState {}

export const load = (userSave: UserSave): UserState => {
  return userSave
}

export const save = (userState: UserState): UserSave => {
  return userState
}
