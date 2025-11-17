import { useEffect, useState } from "react";
import { CoursesList } from "@/utils/types/courseType";
import { errorHandle } from "../utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";

export function useCourses() {
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [coursesData, setCoursesData] = useState<CoursesList>([]);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const result = await axiosProtected.get("/course");
                const allCourses: CoursesList = result.data.allCourses;
                setCoursesData(allCourses);
            } catch (error) {
                errorHandle(error);
            }
            setIsLoading(false);
        };
        getData();
    }, []);
    return { coursesData, isLoading, };
};