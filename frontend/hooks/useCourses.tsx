import { useQuery } from "react-query"
import { CourseService } from "services/Courses.service"

export const useCourses = () => {
  const { data: courses, isSuccess, isLoading } = useQuery("courses list", () =>
    CourseService.getAll()
  )

  return {courses, isSuccess, isLoading}
}
