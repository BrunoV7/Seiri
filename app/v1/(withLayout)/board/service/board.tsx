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
};


const defaultBoard: Board = {
    id: "",
    title: "",
    description: "",
    collumn_quantity: 0,
    collumns: []
}
