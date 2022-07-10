import Layout from "@/components/Layout";
import CardContainer from "@/components/CardsContainer";
import { NextPage } from "next";

export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
  auth: boolean;
};

const home = () => {
  return (
    <Layout title="Homepage | Requirements Portal">
      <CardContainer/>
    </Layout>
  );
};

home.auth = true;

export default home;
