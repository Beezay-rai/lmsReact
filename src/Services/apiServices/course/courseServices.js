import { courseApi } from "../../apiHelpers";
import apiUrls from "../../apiUrls";

export const courseService = async () => {
  let response = await courseApi(
    apiUrls.course.Course.method,
    apiUrls.course.Course.url
  );
  return response;
};

export const createCourseService = async (data) => {
  let response = await courseApi(
    apiUrls.course.createCourse.method,
    apiUrls.course.createCourse.url,
    data
  );
  return response;
};

export const editCourseService = async (id, data) => {
  let response = await courseApi(
    apiUrls.course.editCourse.method,
    apiUrls.course.editCourse.url + id,
    data
  );
  return response;
};

export const deleteCourseService = async (id) => {
  let response = await courseApi(
    apiUrls.course.deleteCourse.method,
    apiUrls.course.deleteCourse.url + id
  );
  return response;
};

export const courseByIdService = async (id) => {
  let response = await courseApi(
    apiUrls.course.courseById.method,
    apiUrls.course.courseById.url + id
  );
  return response;
};
