import classNames from 'classnames'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import {
  Course,
  dateToDayjs,
  dayjsToDay,
  getAssessmentName,
  getDaysToAssessments,
  ID,
} from 'utils'

interface AssessmentCalendarProps {
  course: Course
  assessmentID: ID
}
{
  /*
   *const now = dayjs()
   *const first = now.startOf('month').startOf('week')
   *const last = now.endOf('month').endOf('week')
   *const days: dayjs.Dayjs[] = []
   *for (let day = first; !day.isAfter(last, 'day'); day = day.add(1, 'day')) {
   *  days.push(day)
   *}
   */
}
const AssessmentCalendar: React.FC<AssessmentCalendarProps> = ({
  course,
  assessmentID,
}) => {
  const dayToAssessments = getDaysToAssessments(course, assessmentID)
  const [month, setMonth] = useState(dayjs())
  const [days, setDays] = useState<Dayjs[]>([])
  const today = dayjs().startOf('day')

  useEffect(() => {
    const first = month.startOf('month').startOf('week')
    const last = month.endOf('month').endOf('week')
    const days: dayjs.Dayjs[] = []
    for (let day = first; !day.isAfter(last, 'day'); day = day.add(1, 'day')) {
      days.push(day)
    }

    setDays(days)
  }, [month])

  return (
    <div className="my-4">
      <div className="flex justify-center gap-4 my-4">
        <button
          className="rounded px-4 shadow text-gray-400"
          onClick={() => setMonth((month) => month.subtract(1, 'month'))}
        >
          ← {month.subtract(1, 'month').format('MMM')}
        </button>
        <p className="text-2xl font-bold">{month.format('MMMM YYYY')}</p>
        <button
          className="rounded px-4 shadow text-gray-400"
          onClick={() => setMonth((month) => month.add(1, 'month'))}
        >
          {month.add(1, 'month').format('MMM')} →
        </button>
      </div>
      <div className="grid grid-cols-7">
        <div className="text-sm text-center hidden md:contents">
          <span>Sunday</span>
          <span>Monday</span>
          <span>Tuesday</span>
          <span>Wednesday</span>
          <span>Thursday</span>
          <span>Friday</span>
          <span>Saturday</span>
        </div>
        <div className="text-sm text-center contents md:hidden">
          <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
        </div>
        {days.map((day, index) => (
          <div key={index} className="p-2 border" style={{ minHeight: '6em' }}>
            <p
              className={classNames('', {
                'font-bold text-red-400': day.isSame(today),
                'text-gray-400': !day.isSame(month, 'month'),
              })}
            >
              {day.format(
                !day.isSame(month, 'month') && day.date() === 1 ? 'MMM D' : 'D'
              )}
            </p>
            {dayToAssessments.get(dayjsToDay(day))?.map((childID) => (
              <div key={childID} className="p-2 border rounded shadow">
                <p>{getAssessmentName(course, childID)}</p>
                {course.assessments[childID].dueDate!.time ? (
                  <p className="text-sm text-gray-400">
                    {dateToDayjs(course.assessments[childID].dueDate!).format(
                      'h:mm A'
                    )}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssessmentCalendar
