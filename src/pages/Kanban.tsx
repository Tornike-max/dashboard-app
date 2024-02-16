import React, { useMemo, useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { Column, ColumnTask, Id } from "../types";
import KanbanColumn from "../components/KanbanColumn";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import KanbanTask from "../components/KanbanTask";
import { columnArr, columnTasksArr } from "../constants/constants";
import { Header } from "../components";
import { Button } from "@mui/material";

export default function Kanban() {
  const [columns, setColumns] = useState<Column[]>(columnArr);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<ColumnTask | null>(null);

  const [task, setTask] = useState<ColumnTask[]>(columnTasksArr);

  console.log(task);

  function createColomn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    console.log("herer");
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function generateId() {
    const random = crypto.randomUUID();

    return random;
  }

  function deleteColumn(id: Id) {
    const deletedColumn = columns.filter((item) => item.id !== id);

    setColumns(deletedColumn);
  }

  function handleChangeTitle(event: string, id: Id) {
    const updatedCol = columns?.map((col) =>
      col?.id === id ? { ...col, title: event } : col
    );

    setColumns(updatedCol);
  }

  function handleUpdateTask(content: string, id: Id) {
    const updatedTask = task.map((item) =>
      item.id === id ? { ...item, content: content } : item
    );

    setTask(updatedTask);
  }

  function handleCreateTask(columnId: Id) {
    const newTask = {
      id: generateId(),
      columnId: columnId,
      content: `Task ${task.length + 1}`,
    };

    setTask((column) => [...column, newTask]);
  }

  function handleDeleteTask(id: Id) {
    setTask((task) => task.filter((item) => item.id !== id));
  }

  function onDragStart(event: DragStartEvent) {
    console.log(event, "Start");
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current?.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current?.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    setActiveColumn(null);
    if (!event) return;
    const activeEventId = event.active.id;
    const overEventId = event.over?.id;

    if (activeEventId === overEventId) return;

    setColumns((columns) => {
      const activeColumn = columns.findIndex((col) => col.id === activeEventId);
      const overColumn = columns.findIndex((col) => col.id === overEventId);

      return arrayMove(columns, activeColumn, overColumn);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeEventId = active.id;
    const overEventId = over?.id;

    if (activeEventId === overEventId) return;

    const activeTask = active.data.current?.type === "Task";
    const overTask = over.data.current?.type === "Task";

    if (!activeTask) return;

    if (activeTask && overTask) {
      setTask((task) => {
        const activeIndex = task.findIndex(
          (index) => index.id === activeEventId
        );
        const overIndex = task.findIndex((index) => index.id === overEventId);

        task[activeIndex].columnId = task[overIndex].columnId;

        return arrayMove(task, activeIndex, overIndex);
      });
    }

    const isOverAcolumn = over.data.current?.type === "Column";

    if (activeTask && isOverAcolumn) {
      setTask((task) => {
        const activeIndex = task.findIndex(
          (index) => index.id === activeEventId
        );

        task[activeIndex].columnId = overEventId;

        return arrayMove(task, activeIndex, activeIndex);
      });
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  return (
    <div className="max-w-[2200px] w-full m-auto flex items-center flex-col justify-start min-h-screen overflow-x-auto overflow-y-hidden px-[40px] gap-2">
      <div className="w-full flex justify-center items-start flex-col gap-2 px-4">
        <Header title="Kanban Board" />
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => createColomn(e)}
        >
          <HiOutlinePlusCircle />
          <span> Add Column</span>
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto grid grid-cols-3 py-4 gap-2 overflow-y-auto max-w-[1500px] w-full">
          <SortableContext items={columnsId}>
            {columns.map((col, index) => (
              <KanbanColumn
                key={col.id}
                column={col}
                deleteColumn={deleteColumn}
                handleChangeTitle={handleChangeTitle}
                createTask={handleCreateTask}
                task={task}
                handleDeleteTask={handleDeleteTask}
                handleUpdateTask={handleUpdateTask}
                index={index + 1}
              />
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <KanbanColumn
                column={activeColumn}
                deleteColumn={deleteColumn}
                handleChangeTitle={handleChangeTitle}
                createTask={handleCreateTask}
                task={task}
                handleDeleteTask={handleDeleteTask}
                handleUpdateTask={handleUpdateTask}
                index={1}
              />
            )}

            {activeTask && (
              <KanbanTask
                task={activeTask}
                id={activeTask.id}
                content={activeTask.content}
                handleDeleteTask={handleDeleteTask}
                handleUpdateTask={handleUpdateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
