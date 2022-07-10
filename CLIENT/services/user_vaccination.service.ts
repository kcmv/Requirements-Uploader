import { useQuery } from "react-query";
import Axios from "axios";

const getUserVaccination = async () => {
  const { data } = await Axios.get(`api/vaccination`);
  return data;
};

function useUservaccination() {
  return useQuery("user_vaccination", () => getUserVaccination());
}

const getVaccines = async () => {
  const { data } = await Axios.get("api/vaccine");

  return data;
};

function useGetVaccines() {
  return useQuery("vaccines", () => getVaccines());
}

export { useUservaccination, useGetVaccines };
