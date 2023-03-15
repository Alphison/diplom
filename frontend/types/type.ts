export interface CourseType{
    id: number;
    name: string;
    description: string;
    data: string;
    count_lesson: number;
    user_id: number;
    category_id: number;
    profession: string;
    img_course: string;
    goal: string;
    price: number;
    created_at: Date;
}

export interface CategoryType{
    id: number;
    name: string;
    created_at: Date;
    courses: CourseType[];
}