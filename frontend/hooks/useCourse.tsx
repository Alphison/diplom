import { useQuery } from "react-query"
import { CourseService } from "services/Courses.service"

export const useCourse = (id:string) => {
  const { data: course, isSuccess, isLoading } = useQuery(["courses list", id], () =>
    CourseService.getId(id),
    {
        enabled: !!id
    }
  )

  return {course, isSuccess, isLoading}
}
