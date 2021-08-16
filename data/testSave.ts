import { UserSave } from '../utils/loadsave'
import { RationalNumber } from '../utils/RationalNumber'

export const testSave: UserSave = {
  courses: [
    {
      id: '0',
      code: 'CS 246',
      title: 'Object-Oriented Software Development',
      properties: {},
      assessments: {
        '0': {
          name: 'Linux',
          weight: RationalNumber(10),
          groupId: '0',
        },
        '1': {
          name: 'Core C++ and Testing',
          weight: RationalNumber(12),
          groupId: '0',
        },
        '2': {
          name: 'Introduction to OOP',
          weight: RationalNumber(18),
          groupId: '0',
        },
        '3': {
          name: 'Inheritance and basic design patterns',
          weight: RationalNumber(18),
          groupId: '0',
        },
        '4': {
          name: 'Advanced C++, OOP, and SE',
          weight: RationalNumber(12),
          groupId: '0',
        },
        '5': {
          name: 'Final Project',
          weight: RationalNumber(30),
        },
      },
      groups: {
        '0': {
          name: 'Assignments',
          prefix: 'A',
          totalWeight: RationalNumber(70),
          assessments: ['0', '1', '2', '3', '4'],
        },
      },
      ungrouped: ['5'],
      types: {},
    },
    {
      id: '1',
      code: 'CS 245',
      title: 'Logic and Computation',
      properties: {},
      assessments: {
        '0': { groupId: '0' },
        '1': { groupId: '0' },
        '2': { groupId: '0' },
        '3': { groupId: '0' },
        '4': { groupId: '0' },
        '5': { groupId: '0' },
        '6': { groupId: '0' },
        '7': { groupId: '0' },
        '8': { groupId: '0' },
        '9': { groupId: '0' },
        '10': { name: 'Midterm Assessment LEARN' },
        '11': { name: 'Midterm Assessment Crowdmark' },
        '12': { name: 'Final Assessment LEARN' },
        '13': { name: 'Final Assessment Crowdmark' },
      },
      groups: {
        '0': {
          name: 'Assignments',
          prefix: 'A',
          totalWeight: RationalNumber(40),
          assessments: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        },
        '1': {
          name: 'Midterm',
          assessments: ['10', '11'],
          totalWeight: RationalNumber(20),
        },
        '2': {
          name: 'Final',
          assessments: ['12', '13'],
          totalWeight: RationalNumber(35),
        },
        '3': {
          name: 'LEARN Quizzes',
          assessments: [],
          totalWeight: RationalNumber(5),
        },
      },
      types: {},
    },
  ],
}
