import dayjs from 'dayjs'
import {
  Course,
  Day,
  dayjsToDay,
  getAssessmentName,
  getDaysToAssessments,
  ID,
} from 'utils'

interface AssessmentCalendarProps {
  course: Course
  assessmentID: ID
}
const now = dayjs()
const first = now.startOf('month').startOf('week')
const last = now.endOf('month').endOf('week')
const days: dayjs.Dayjs[] = []
for (let day = first; !day.isAfter(last, 'day'); day = day.add(1, 'day')) {
  days.push(day)
}
const AssessmentCalendar: React.FC<AssessmentCalendarProps> = ({
  course,
  assessmentID,
}) => {
  const dayToAssessments = getDaysToAssessments(course, assessmentID)

  return (
    <div className="my-4">
      <div className="grid grid-cols-7">
        <div className="contents text-sm text-center">
          <span>Sunday</span>
          <span>Monday</span>
          <span>Tuesday</span>
          <span>Wednesday</span>
          <span>Thursday</span>
          <span>Friday</span>
          <span>Saturday</span>
        </div>
        {days.map((day, index) => (
          <div key={index} className="p-2 border">
            <span>{day.format('D')}</span>
            {dayToAssessments.get(dayjsToDay(day))?.map((childID) => (
              <div key={childID} className="p-2 border rounded shadow">
                {getAssessmentName(course, childID)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssessmentCalendar
