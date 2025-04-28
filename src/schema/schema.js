import * as yup from "yup";

export const bookSchema = yup.object({
    bookName: yup.string().required("Book name is required"),
    authorName: yup.string().required("Author name is required"),
    isbn: yup
      .string()
      .required("ISBN is required")
      .matches(/^[0-9]{10,13}$/, "ISBN must be 10-13 digits"),
    quantity: yup
      .number()
      .required("Quantity is required")
      .positive("Quantity must be a positive number")
      .integer("Quantity must be an integer"),
    publicationDate: yup.date().required("Publication date is required"),
  });



