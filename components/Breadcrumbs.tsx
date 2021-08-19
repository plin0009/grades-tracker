import { Course, getAssessmentName, getPathIDs, ID } from 'utils'
import Link from 'next/link'

interface BreadcrumbsProps {
  course: Course
  assessmentID: ID
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ course, assessmentID }) => {
  const pathIDs = getPathIDs(course, assessmentID)
  return (
    <div className="text-sm text-gray-500 mb-2">
      {[
        <Link key={course.id} href={`/${course.id}`} passHref>
          <a>
            <span>{course.code}</span>
          </a>
        </Link>,
        ...pathIDs
          .map((pathID) => course.assessments[pathID])
          .map((assessment) =>
            assessment.id === assessmentID ? (
              <span className="text-gray-800">
                {getAssessmentName(course, assessment.id)}
              </span>
            ) : (
              <Link href={`/${course.id}/${assessment.id}`} passHref>
                <a>
                  <span>{getAssessmentName(course, assessment.id)}</span>
                </a>
              </Link>
            )
          ),
      ].reduce((prev, curr) => (
        <>
          {prev}
          <span className="mx-1 text-gray-300">{'/'}</span>
          {curr}
        </>
      ))}
    </div>
  )
}

export default Breadcrumbs
