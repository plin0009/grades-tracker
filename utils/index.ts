import { add, RationalNumber } from './RationalNumber'

export interface UserState {
  courses: Course[]
}

export type ID = string

export interface Course {
  id: ID
  code: string
  title: string
  properties: { [key: string]: string }
  rootAssessmentIDs: ID[]
  assessments: { [key: string]: Assessment }
  types: { [key: string]: AssessmentType }
}

export interface AssessmentType {
  name: string
  colour: string
}

export interface Assessment {
  id: ID
  name?: string
  childPrefix?: string
  //groupId?: ID
  typeIds?: ID[]
  weight?: RationalNumber
  grade?: RationalNumber
  //parent?: Assessment
  parentID?: ID
  //children?: Assessment[]
  childrenIDs?: ID[]
  // TODO: due dates
}

export const getAssessmentName = (course: Course, assessmentID: ID): string => {
  const assessment = course.assessments[assessmentID]
  if (assessment.parentID === undefined) {
    return assessment.name ?? ''
  }
  const assessmentParent = course.assessments[assessment.parentID]
  const assessmentNumber =
    assessmentParent.childrenIDs!.indexOf(assessmentID) + 1
  const prefix = assessmentParent.childPrefix
  if (prefix === undefined) {
    return assessment.name ?? ''
  }
  if (assessment.name === undefined) {
    return `${prefix}${assessmentNumber}`
  }
  return `${prefix}${assessmentNumber}: ${assessment.name}`
}

export const getTotalWeight = (
  course: Course,
  assessmentID: ID
): RationalNumber | undefined => {
  const assessment = course.assessments[assessmentID]
  if (assessment.weight !== undefined) {
    return assessment.weight
  }
  return assessment.childrenIDs?.reduce(
    (accWeight: RationalNumber | undefined, childID) =>
      add(accWeight, getTotalWeight(course, childID)),
    undefined
  )
}
