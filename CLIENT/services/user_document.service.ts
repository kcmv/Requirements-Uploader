import { useQuery } from "react-query";
import Axios from "axios";

const getUserDocuments = async () => {
  const { data } = await Axios.get(`api/user_documents`);
  return data;
};

function useUserDocuments() {
  return useQuery("user_documents", () => getUserDocuments());
}

export { useUserDocuments };
