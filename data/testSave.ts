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
          weight: RationalNumber(10),
          groupId: '0',
        },
        '1': {
          weight: RationalNumber(12),
          groupId: '0',
        },
        '2': {
          weight: RationalNumber(18),
          groupId: '0',
        },
        '3': {
          weight: RationalNumber(18),
          groupId: '0',
        },
        '4': {
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
  ],
}
