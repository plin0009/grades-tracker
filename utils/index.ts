import { add, RationalNumber } from './RationalNumber'

export interface UserState {
  courses: Course[]
}

type ID = string

export interface Course {
  id: ID
  code: string
  title: string
  properties: { [key: string]: string }
  assessments: { [key: string]: Assessment }
  groups: { [key: string]: AssessmentGroup }
  ungrouped?: ID[]
  types: { [key: string]: AssessmentType }
}

export interface AssessmentGroup {
  name: string
  prefix?: string
  defaultTypeIds?: ID[]
  defaultWeight?: RationalNumber
  totalWeight?: RationalNumber

  assessments: ID[]
}
export interface AssessmentType {
  name: string
  colour: string
}

export interface Assessment {
  name?: string
  groupId?: ID
  typeIds?: ID[]
  weight?: RationalNumber
  grade?: RationalNumber
  // TODO: due dates
}

export const getAssessmentName = (course: Course, assessmentId: ID): string => {
  const assessment = course.assessments[assessmentId]
  if (assessment.groupId === undefined) {
    return assessment.name ?? ''
  }
  const group = course.groups[assessment.groupId]
  const assessmentNumber = group.assessments.indexOf(assessmentId)
  if (group.prefix === undefined) {
    return assessment.name ?? ''
  }
  if (assessment.name === undefined) {
    return `${group.prefix}${assessmentNumber}`
  }
  return `${group.prefix}${assessmentNumber}: ${assessment.name}`
}

export const getTotalWeight = (
  course: Course,
  groupId: ID
): RationalNumber | undefined => {
  const group = course.groups[groupId]
  if (group.totalWeight !== undefined) {
    return group.totalWeight
  }
  return group.assessments.reduce(
    (accWeight: RationalNumber | undefined, assessmentId) =>
      add(accWeight, course.assessments[assessmentId].weight),
    undefined
  )
}
