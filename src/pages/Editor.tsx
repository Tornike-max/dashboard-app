import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Header } from "../components";
import { formats, modules } from "../constants/constants";
import { useChangeColor } from "../contexts/useChangeColor";

export default function Editor() {
  const { isDark } = useChangeColor();
  const handleProcedureContentChange = (content: never) => {
    console.log("content---->", content);
  };
  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col px-6">
      <Header title="Text Editor" />
      <div className={` w-full ${isDark && "bg-gray-50"}`}>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="write your content ...."
          onChange={handleProcedureContentChange}
          className="min-h-96 h-96"
        ></ReactQuill>
      </div>
    </div>
  );
}
