import { useQuery } from "react-query"
import { CategoryService } from "services/Category.service"

export const useCategory = () => {
  const { data: categories, isSuccess, isLoading } = useQuery("categories list", () =>
    CategoryService.getAll()
  )

  return {categories, isSuccess, isLoading}
}
