import api from "@/lib/api"


export async function loadBoard(id: string) {
    try{
        const response = await api.get(`/api/v1/board/find/${id}`);
        console.log(response);
    } catch(error){
        console.log(error);
    }
}


export type Task = {
  id: string;
  title: string;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  status: "PLANNED" | "IN_PROGRESS" | "FINISHED" | "PENDING"; 
  cardId: string;
};


export type Status = {
  id: string;
  title: string;
  colorCode: string;
  boardId: string;
};

export type Card = {
  id: string;
  issueKey: string;
  title: string;
  description?: string;
  body?: string;
  position: number;
  priorityLevel?: number;
  archived: boolean;
  startDate?: string | null;
  endDate?: string | null;
  createdDate: string;
  updatedDate: string;
  status?: Status | null;
  collumnId: string;
  tasks: Task[];
  numOfTasks: number;
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
};


const defaultBoard: Board = {
    id: "",
    title: "",
    description: "",
    collumn_quantity: 0,
    collumns: []
}
