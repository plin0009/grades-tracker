import {
  add,
  divide,
  multiply,
  RationalNumber,
  MaybeRationalNumber,
} from './RationalNumber'

export interface UserState {
  courseIDs: ID[]
  courses: { [key: string]: Course }
}

export type ID = string

export interface Course {
  id: ID
  code: string
  title: string
  properties: { [key: string]: string }
  //rootAssessmentIDs: ID[]
  assessments: { root: Assessment; [key: string]: Assessment }
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
): MaybeRationalNumber => {
  const assessment = course.assessments[assessmentID]
  if (assessment.weight !== undefined) {
    return assessment.weight
  }
  return assessment.childrenIDs?.reduce(
    (accWeight: MaybeRationalNumber, childID) =>
      add(accWeight, getTotalWeight(course, childID)),
    undefined
  )
}

// sum of sub-assessments if applicable
export const getTotalGrade = (
  course: Course,
  assessmentID: ID
): MaybeRationalNumber => {
  const assessment = course.assessments[assessmentID]
  if (assessment.grade !== undefined) {
    return assessment.grade
  }
  if (assessment.childrenIDs === undefined) return undefined
  return assessment.childrenIDs?.reduce(
    (accGrade: MaybeRationalNumber, childID) =>
      add(
        accGrade,
        multiply(
          getTotalGrade(course, childID),
          divide(
            getTotalWeight(course, childID),
            getTotalWeight(course, assessmentID)
          )
        )
      ),
    undefined
  )
}

// weighted average of sub-assessments if applicable
export const getAverageGrade = (
  course: Course,
  assessmentID: ID
): MaybeRationalNumber => {
  const assessment = course.assessments[assessmentID]
  if (assessment.grade !== undefined) {
    return assessment.grade
  }
  if (assessment.childrenIDs === undefined) return undefined
  const [grade, weight] = assessment.childrenIDs.reduce(
    (
      [accGrade, accWeight]: [MaybeRationalNumber, MaybeRationalNumber],
      childID
    ) => {
      const averageGrade = getAverageGrade(course, childID)
      if (averageGrade === undefined) return [accGrade, accWeight]
      const weight = getTotalWeight(course, childID)
      return [
        add(accGrade, multiply(averageGrade, weight)),
        add(accWeight, weight),
      ]
    },
    [undefined, RationalNumber(0)]
  )
  return divide(grade, weight)
}

export type CalculatedGrade =
  | { inputted: RationalNumber; total?: undefined; average?: undefined }
  | {
      inputted?: undefined
      total: MaybeRationalNumber
      average: MaybeRationalNumber
    }
export const getGrade = (course: Course, assessmentID: ID): CalculatedGrade => {
  const assessment = course.assessments[assessmentID]
  if (assessment.grade !== undefined) {
    return { inputted: assessment.grade }
  }
  return {
    total: getTotalGrade(course, assessmentID),
    average: getAverageGrade(course, assessmentID),
  }
}

export const getPathIDs = (course: Course, assessmentID: ID): ID[] => {
  let currentID = assessmentID
  let pathIDs: ID[] = []
  while (currentID !== 'root') {
    pathIDs = [currentID, ...pathIDs]
    const assessment = course.assessments[currentID]
    currentID = assessment.parentID!
  }
  return pathIDs
}
