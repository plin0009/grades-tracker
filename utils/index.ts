import dayjs from 'dayjs'
import {
  add,
  divide,
  multiply,
  RationalNumber,
  MaybeRationalNumber,
  subtract,
  isNegative,
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
  typeIds?: ID[]
  weight?: RationalNumber | 'parent'
  grade?: RationalNumber
  parentID?: ID
  childrenIDs?: ID[]
  // due dates
  dueDate?: Date
}

export interface Date {
  timestamp: number // unix timestamp (s)
  time?: boolean // whether or not the time matters
}

export const getAssessmentName = (course: Course, assessmentID: ID): string => {
  const assessment = course.assessments[assessmentID]
  if (assessment.parentID === undefined) {
    return assessment.name ?? 'Untitled'
  }
  const assessmentParent = course.assessments[assessment.parentID]
  const assessmentNumber =
    assessmentParent.childrenIDs!.indexOf(assessmentID) + 1
  const prefix = assessmentParent.childPrefix
  if (prefix === undefined) {
    return assessment.name ?? 'Untitled'
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
    if (assessment.weight === 'parent') {
      // weight is the equally-divided portion of unused weight from parents
      if (assessment.parentID === undefined) return undefined
      const parent = course.assessments[assessment.parentID]
      if (parent.weight === undefined) return undefined

      const [siblingWeights, slices] = parent.childrenIDs!.reduce(
        ([accWeight, slices]: [MaybeRationalNumber, number], childID) => {
          return course.assessments[childID].weight === 'parent'
            ? [accWeight, slices + 1]
            : [add(accWeight, getTotalWeight(course, childID)), slices]
        },
        [undefined, 0]
      )
      const candidateWeight = divide(
        subtract(getTotalWeight(course, assessment.parentID), siblingWeights),
        RationalNumber(slices)
      )
      return isNegative(candidateWeight) ? undefined : candidateWeight
    }
    return assessment.weight
  }
  return assessment.childrenIDs?.reduce(
    (accWeight: MaybeRationalNumber, childID) =>
      add(accWeight, getTotalWeight(course, childID)),
    undefined
  )
}

export const getWeight = (course: Course, assessmentID: ID) => {
  const assessment = course.assessments[assessmentID]
  if (assessment.weight !== undefined) {
    if (assessment.weight === 'parent') {
      // weight is the equally-divided portion of unused weight from parents
      if (assessment.parentID === undefined) {
        // TODO: should be an error instead?
        return undefined
      }
      const parent = course.assessments[assessment.parentID]
      if (parent.weight === undefined) return { parent: undefined }

      const [siblingWeights, slices] = parent.childrenIDs!.reduce(
        ([accWeight, slices]: [MaybeRationalNumber, number], childID) => {
          return course.assessments[childID].weight === 'parent'
            ? [accWeight, slices + 1]
            : [add(accWeight, getTotalWeight(course, childID)), slices]
        },
        [undefined, 0]
      )
      const candidateWeight = divide(
        subtract(getTotalWeight(course, assessment.parentID), siblingWeights),
        RationalNumber(slices)
      )
      return {
        parent: isNegative(candidateWeight) ? undefined : candidateWeight,
      }
    }
    return { inputted: assessment.weight }
  }
  return {
    auto: assessment.childrenIDs?.reduce(
      (accWeight: MaybeRationalNumber, childID) =>
        add(accWeight, getTotalWeight(course, childID)),
      undefined
    ),
  }
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

export type Day = number // [number, number, number]

export const dateToDayjs = (date: Date): dayjs.Dayjs =>
  dayjs.unix(date.timestamp)
export const dayjsToDay = (dayjsDate: dayjs.Dayjs): Day =>
  dayjsDate.startOf('day').unix()
export const dateToDay = (date: Date): Day => dayjsToDay(dateToDayjs(date))
export const dayToDayjs = (day: Day): dayjs.Dayjs => dayjs.unix(day)
export const dayjsToDate = (dayjsDate: dayjs.Dayjs): Date => ({
  timestamp: dayjsDate.unix(),
})
export const dayToDate = (day: Day): Date => dayjsToDate(dayToDayjs(day))

export const getDaysToAssessments = (
  course: Course,
  assessmentID: ID
): Map<Day, ID[]> => {
  const assessment = course.assessments[assessmentID]
  const map = new Map()
  if (assessment.dueDate !== undefined) {
    const day = dateToDay(assessment.dueDate)
    if (!map.has(day)) map.set(day, [])
    map.get(day).push(assessmentID)
    //map.set(day, [...map.get(day), assessmentID])
  }
  assessment.childrenIDs?.forEach((childID) => {
    getDaysToAssessments(course, childID).forEach((childIDs, day) => {
      if (!map.has(day)) map.set(day, [])
      childIDs.forEach((id) => map.get(day).push(id))
      //childIDs.forEach((id) => map.set(day, [...map.get(day), id]))
    })
  })
  //console.log(map)
  return map
}
