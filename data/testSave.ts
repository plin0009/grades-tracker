import { UserSave } from 'utils/loadsave'
import { PercentRationalNumber } from 'utils/RationalNumber'

export const testSave: UserSave = {
  courseIDs: ['0', '1'],
  courses: {
    '0': {
      id: '0',
      code: 'CS 246',
      title: 'Object-Oriented Software Development',
      properties: {},
      assessments: {
        root: {
          id: 'root',
          childrenIDs: [
            '4e7f30d5-778d-49bd-aace-84eb364102b7',
            '26c9e827-bf0f-4d19-ba33-845b6fca9797',
          ],
        },
        '4e7f30d5-778d-49bd-aace-84eb364102b7': {
          id: '4e7f30d5-778d-49bd-aace-84eb364102b7',
          name: 'Assignments',
          childPrefix: 'A',
          weight: PercentRationalNumber(70),
          parentID: 'root',
          childrenIDs: [
            '7d239b8d-4326-411c-9ac4-41004a3a1baf',
            '2779fed5-3e69-42d3-abc5-42c7fe7606d7',
            '2d5f7f71-c543-4f54-9280-65f7e6982e43',
            '54da9c2e-134c-4655-8a51-a75ce8b997ef',
            '8ebbdd73-c7f7-4c53-a393-f3c06c16599e',
          ],
        },
        '7d239b8d-4326-411c-9ac4-41004a3a1baf': {
          id: '7d239b8d-4326-411c-9ac4-41004a3a1baf',
          name: 'Linux',
          weight: PercentRationalNumber(10),
          parentID: '4e7f30d5-778d-49bd-aace-84eb364102b7',
          grade: PercentRationalNumber(90),
        },
        '2779fed5-3e69-42d3-abc5-42c7fe7606d7': {
          id: '2779fed5-3e69-42d3-abc5-42c7fe7606d7',
          name: 'Core C++ and Testing',
          weight: PercentRationalNumber(12),
          parentID: '4e7f30d5-778d-49bd-aace-84eb364102b7',
          grade: PercentRationalNumber(50),
        },
        '2d5f7f71-c543-4f54-9280-65f7e6982e43': {
          id: '2d5f7f71-c543-4f54-9280-65f7e6982e43',
          name: 'Introduction to OOP',
          weight: PercentRationalNumber(18),
          parentID: '4e7f30d5-778d-49bd-aace-84eb364102b7',
        },
        '54da9c2e-134c-4655-8a51-a75ce8b997ef': {
          id: '54da9c2e-134c-4655-8a51-a75ce8b997ef',
          name: 'Inheritance and basic design patterns',
          weight: PercentRationalNumber(18),
          parentID: '4e7f30d5-778d-49bd-aace-84eb364102b7',
        },
        '8ebbdd73-c7f7-4c53-a393-f3c06c16599e': {
          id: '8ebbdd73-c7f7-4c53-a393-f3c06c16599e',
          name: 'Advanced C++, OOP, and SE',
          weight: PercentRationalNumber(12),
          parentID: '4e7f30d5-778d-49bd-aace-84eb364102b7',
        },
        '26c9e827-bf0f-4d19-ba33-845b6fca9797': {
          id: '26c9e827-bf0f-4d19-ba33-845b6fca9797',
          name: 'Final Project',
          weight: PercentRationalNumber(30),
          parentID: 'root',
        },
      },
      types: {},
    },
    '1': {
      id: '1',
      code: 'CS 245',
      title: 'Logic and Computation',
      properties: {},
      assessments: {
        root: {
          id: 'root',
          childrenIDs: ['0', '1', '2', '3'],
        },
        '0': {
          id: '0',
          name: 'Assignments',
          childPrefix: 'A',
          weight: PercentRationalNumber(40),
          parentID: 'root',
          childrenIDs: [
            'a1',
            'a2',
            'a3',
            'a4',
            'a5',
            'a6',
            'a7',
            'a8',
            'a9',
            'a10',
          ],
        },
        '1': {
          id: '1',
          name: 'Midterm',
          weight: PercentRationalNumber(20),
          parentID: 'root',
        },
        '2': {
          id: '2',
          name: 'Final',
          weight: PercentRationalNumber(35),
          parentID: 'root',
        },
        '3': {
          id: '3',
          name: 'LEARN Quizzes',
          weight: PercentRationalNumber(5),
          parentID: 'root',
        },
        a1: {
          id: 'a1',
          weight: 'parent',
          parentID: '0',
        },
        a2: {
          id: 'a2',
          weight: 'parent',
          parentID: '0',
        },
        a3: {
          id: 'a3',
          weight: 'parent',
          parentID: '0',
        },
        a4: {
          id: 'a4',
          weight: 'parent',
          parentID: '0',
        },
        a5: {
          id: 'a5',
          weight: 'parent',
          parentID: '0',
        },
        a6: {
          id: 'a6',
          weight: 'parent',
          parentID: '0',
        },
        a7: {
          id: 'a7',
          weight: 'parent',
          parentID: '0',
        },
        a8: {
          id: 'a8',
          weight: 'parent',
          parentID: '0',
        },
        a9: {
          id: 'a9',
          weight: 'parent',
          parentID: '0',
        },
        a10: {
          id: 'a10',
          weight: 'parent',
          parentID: '0',
        },
      },
      types: {},
    },
  },
}
