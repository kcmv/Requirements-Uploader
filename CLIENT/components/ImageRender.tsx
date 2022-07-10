import React from "react";
import Image from "next/image";
import Female from "../public/user-female.jpeg";
import Male from "../public/user-male.jpeg";

interface UiProps {
  gender: string;
  url: string;
}

const Ui: React.FC<UiProps> = ({ url, gender }) => {
  const genderImage = gender === "male" ? Female : Male;
  return <Image src={url ? url : genderImage} />;
};

const ImageRender = React.memo(Ui);

export default ImageRender;
