import RequirementsTab from "@/components/RequirementsTab";
import Layout from "@/components/Layout";
import { NextPage } from "next";
import { useUserDocuments } from "services";
import { signOut } from "next-auth/react";

export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
  auth: boolean;
};

const requirements: NextPageWithAuth = () => {
  const { isLoading, data, error }: any = useUserDocuments();

  if (error?.response.status === 401) {
    signOut();
  }

  return (
    <Layout title="Requirements | Requirements Portal">
      <RequirementsTab data={data} isLoading={isLoading} />
    </Layout>
  );
};

requirements.auth = true;

export default requirements;
