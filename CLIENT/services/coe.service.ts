import { useQuery } from "react-query";
import Axios from "axios";

const getAllPurpose = async () => {
  const { data } = await Axios.get(`api/coe`);
  return data;
};

function useGetAllPurpose() {
  return useQuery("coe", () => getAllPurpose());
}

const getEmployeeRequests = async () => {
  const { data } = await Axios.get(`api/coe_requests`);
  return data;
};

function useGetEmployeeRequests() {
  return useQuery("coe_requests", () => getEmployeeRequests());
}

export { useGetAllPurpose, useGetEmployeeRequests };
