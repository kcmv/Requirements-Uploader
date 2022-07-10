import React, { memo } from "react";
import Head from "next/head";

interface CustomHeadProps {
  title: string;
}

const Ui: React.FC<CustomHeadProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Requirements Uploader" />
    </Head>
  );
};

const Header = memo(Ui);

export default Header
