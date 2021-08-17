import { UserState } from '.'

export interface UserSave extends UserState {}

export const load = (userSave: UserSave): UserState => {
  /*
   *const own = (assessment: Assessment): Assessment => ({
   *  ...assessment,
   *  children: assessment.children?.map((child) =>
   *    own(addParent(child, assessment))
   *  ),
   *})
   *const addParent = (assessment: Assessment, parent: Assessment) => ({
   *  ...assessment,
   *  parent,
   *})
   *return {
   *  ...userSave,
   *  courses: userSave.courses.map((course) => ({
   *    ...course,
   *    assessments: course.assessments.map(own),
   *  })),
   *}
   */
  return userSave
}

export const save = (userState: UserState): UserSave => {
  return userState
}
