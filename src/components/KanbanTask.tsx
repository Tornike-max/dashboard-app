import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { ColumnTask, Id } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function KanbanTask({
  content,
  id,
  task,
  handleDeleteTask,
  handleUpdateTask,
}: {
  content: string;
  id: Id;
  task: ColumnTask;
  handleDeleteTask: (id: Id) => void;
  handleUpdateTask: (content: string, id: Id) => void;
}) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: isEdit,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  function toggleEditMode() {
    setIsEdit((prev) => !prev);
    setIsMouseOver(false);
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-full h-[70px] min-h-[70px] py-2 px-3 rounded-lg border-blue-500 border-3 cursor-grab bg-blue-100 opacity-30 flex justify-between items-center gap-2 duration-150 transition-all"
      ></div>
    );
  }

  if (isEdit) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="w-full cursor-grab bg-white flex justify-between items-center gap-2  relative task"
      >
        <textarea
          autoFocus
          onChange={(e) => handleUpdateTask(e.target.value, id)}
          placeholder={content}
          value={content}
          className="w-full h-[70px] min-h-[70px] resize-none rounded-lg border-2 border-blue-500 focus:ring-2 py-1 px-2"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) toggleEditMode();
          }}
        />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={toggleEditMode}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full h-[70px] min-h-[70px] py-2 px-3 rounded-lg hover:border-blue-500 border-3 cursor-grab bg-white flex justify-between items-center gap-2 duration-150 transition-all"
    >
      <p className="overflow-x-hidden task my-auto h-[60px] min-h-[60px] whitespace-pre-wrap w-full">
        {content}
      </p>
      {isMouseOver && (
        <button
          onClick={() => handleDeleteTask(id)}
          className="w-8 h-8 rounded-full bg-stone-100 flex justify-center items-center text-lg text-red-500"
        >
          <HiOutlineTrash />
        </button>
      )}
    </div>
  );
}
