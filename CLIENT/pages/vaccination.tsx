import { NextPage } from "next";
import VaccinationWrapper from "@/components/VaccinationWrapper";

export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
  auth: boolean;
};

const vaccination: NextPageWithAuth = () => {
  return <VaccinationWrapper />;
};

vaccination.auth = true;

export default vaccination;
