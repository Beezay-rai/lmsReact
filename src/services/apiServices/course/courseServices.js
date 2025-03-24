import { courseApi } from "../../apiHelpers";

export const courseService = async () => {
  let response = await courseApi(
    "GET",
    ""
  );
  return response;
};

export const createCourseService = async (data) => {
  let response = await courseApi(
  "POST",
   "",
    data
  );
  return response;
};

export const editCourseService = async (id, data) => {
  let response = await courseApi(
      "PUT",
    "/"+ id,
    data
  );
  return response;
};

export const deleteCourseService = async (id) => {
  let response = await courseApi(
   "Delete",
   "/"+ id
  );
  return response;
};

export const courseByIdService = async (id) => {
  let response = await courseApi(
   "GET",
    "/"+ id
  );
  return response;
};
