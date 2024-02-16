import { HiOutlineTrash } from "react-icons/hi2";
import { Column, ColumnTask, Id } from "../types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import KanbanTask from "./KanbanTask";

export default function KanbanColumn({
  column,
  deleteColumn,
  handleChangeTitle,
  createTask,
  task,
  handleDeleteTask,
  handleUpdateTask,
  index,
}: {
  column: Column;
  deleteColumn: (id: Id) => void;
  handleChangeTitle: (event: string, id: Id) => void;
  createTask: (columnId: Id) => void;
  task: ColumnTask[];
  handleDeleteTask: (id: Id) => void;
  handleUpdateTask: (content: string, id: Id) => void;
  index: number;
}) {
  const [editMode, setEditMode] = useState(false);

  const taskIds = useMemo(() => task.map((item) => item.id), [task]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-stone-200 flex flex-col border-2 border-blue-500 opacity-40 max-w-[350px] w-full  h-[500px] max-h-[500px] rounded-md mx-2"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-stone-200 flex flex-col max-w-[350px] w-full h-[500px] max-h-[500px] rounded-md mx-2"
    >
      <div
        onClick={() => setEditMode(true)}
        {...attributes}
        {...listeners}
        className="h-[60px] rounded-md rounded-b-none p-3 font-bold  border-4 w-full bg-white cursor-grab flex items-center justify-between gap-2 px-2"
      >
        <div className="w-full flex justify-start items-center gap-2 text-xs sm:text-sm md:text-base">
          <div className="hidden rounded-full  sm:w-8 sm:h-8 bg-blue-500 text-stone-100 sm:flex justify-center items-center">
            {index}
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="py-1 px-2 rounded-md border-2 max-w-[200px] w-full border-blue-500 focus:ring-2 focus:border-blue-500"
              autoFocus
              onBlur={() => setEditMode(false)}
              onChange={(e) => handleChangeTitle(e.target.value, column.id)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
              placeholder="Edit"
            />
          )}
        </div>

        <button
          onClick={() => deleteColumn(column.id)}
          className="text-red-500 text-sm hover:text-red-600 "
        >
          <HiOutlineTrash />
        </button>
      </div>
      <div className="w-full flex flex-grow flex-col overflow-x-hidden gap-1 px-1">
        <SortableContext items={taskIds}>
          {task.map(
            (item) =>
              item.columnId === column.id && (
                <KanbanTask
                  key={item.id}
                  content={item.content}
                  id={item.id}
                  task={item}
                  handleDeleteTask={handleDeleteTask}
                  handleUpdateTask={handleUpdateTask}
                />
              )
          )}
        </SortableContext>
      </div>

      <div className="w-full flex justify-center items-center  bg-stone-100 rounded-md rounded-t-none border-4">
        <button
          onClick={() => createTask(column.id)}
          className="w-full py-1 px-2 rounded-lg border-none text-stone-900 border-2 hover:bg-blue-500 hover:text-white transition-all duration-150 focus:ring-2 ring-blue-600"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
