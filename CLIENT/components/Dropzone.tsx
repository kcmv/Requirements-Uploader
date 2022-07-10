import React, { ReactNode } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const Ui = ({ props }: any) => {
  const [error, setErrors] = React.useState("");

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 5242880,
    onDrop: (files, rejection) => {
      setErrors("");
      if (rejection.length > 0) {
        console.log(rejection);
        rejection.map((err) => {
          err.errors.map((e) => {
            if (e.code === "file-too-large") {
              setErrors("Error: File is larger than 5MB.");
            }
            if (e.code === "file-invalid-type") {
              setErrors(`Error: Invalid file type.`);
            }
          });
        });
      }

      props.setFieldValue("file", files);
    },
  });

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const fileList = (files: FileWithPath[]): ReactNode =>
    files.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

  return (
    <section style={{ width: "100%" }} className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>
          Drag 'n' drop some files here, or click to select files (max of 5MB)
        </p>
        <em>Accepted file types: DOCX, PDF, JPEG, PNG</em>
      </div>
      <aside style={{ textAlign: "center" }}>
        <p>{fileList(acceptedFiles)}</p>
        <p style={{ color: "rgb(236 28 37)" }}>{error}</p>
      </aside>
    </section>
  );
};

const Dropzone = React.memo(Ui);

export default Dropzone;
