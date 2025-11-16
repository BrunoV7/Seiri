"use client";
import { createContext, useContext, useState } from "react";
import { id } from "zod/v4/locales";

export type Task = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "PLANNED" | "IN_PROGRESS" | "FINISHED"; 
  cardId: string;
};

export type Card = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "PLANNED" | "IN_PROGRESS" | "FINISHED";
  numOfTasks: number;
  tasks: Task[];
};

export type Column = {
  id: string;
  name: string;
  card_quantity: number;
  cards: Card[];
  board_id: string;
};

export type Board = {
  id: string;
  title: string;
  description: string;
  collumn_quantity: number;
  collumns: Column[];
  statuses?: { id: string; title: string, colorCode: string, boardId: string }[];
};

export const defaultBoard: Board = {
  id: "",
  title: "",
  description: "",
  collumn_quantity: 0,
  collumns: [],
  statuses: [],
};

type BoardContextType = {
    board: Board;
    setBoard: React.Dispatch<React.SetStateAction<Board>>;
}

export const boardContext = createContext<BoardContextType | undefined>(
    undefined
)

export function BoardProvider({children}: {children: React.ReactNode}) {
    const [board, setBoard] = useState<Board>(defaultBoard);

    return (
        <boardContext.Provider value={{ board: board, setBoard: setBoard}}>
            {children}
        </boardContext.Provider>
    )
}

export function useBoardContext(){
    const context = useContext(boardContext);
    if(!context){
        throw new Error("useBoardContext must be used within a BoardContextProvider");
    }
    return context;
}