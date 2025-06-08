import { issueBookApi } from "../../apiHelpers";

export const getIssueBookListService = async () => {
  let response = await issueBookApi("GET");
  return response;
};

export const createIssueBookService = async (data) => {
  let response = await issueBookApi("POST", "", data);
  return response;
};

export const returnTransactionService = async (id, status) => {
  let response = await issueBookApi(
    "GET"
    // apiUrls.transaction.returnIssuedbook.url+"?id="+id+"&status="+status,
  );
  return response;
};

export const getIssueBookByIdService = async (id) => {
  let response = await issueBookApi("GET", "/" + id);
  return response;
};

export const editIssueBookService = async (id, data) => {
  let response = await issueBookApi("PUT", "/" + id, data);
  return response;
};

export const deleteTransactionService = async (id) => {
  let response = await issueBookApi("DELETE", "/" + id);
  return response;
};
