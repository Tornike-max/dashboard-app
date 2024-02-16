import { useChangeColor } from "../contexts/useChangeColor";

export default function Header({ title }: { title: string }) {
  const { isDark } = useChangeColor();
  return (
    <div className="w-full flex justify-start items-center mb-4">
      <div
        className={`flex flex-col justify-center items-start gap-2 ${
          isDark ? "text-slate-100" : "text-stone-600"
        }`}
      >
        <p className="text-lg font-bold ">Page</p>
        <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
