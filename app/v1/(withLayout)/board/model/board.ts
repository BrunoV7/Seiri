export interface BoardResponseFullDTO {
  id: string;
  title: string;
  description: string;
  collumn_quantity: number;
  collumns: CollumnResponseFullDTO[];
  statuses: StatusDTO[];
}

export interface CollumnResponseFullDTO {
  id: string;
  name: string;
  card_quantity: number;
  cards: CardResponseFullDTO[];
  board_id: string;
}

export interface CardResponseFullDTO {
  id: string;
  title: string;
  description: string;
  body: string;
  issueKey: string;
  position: number;
  priorityLevel: number;
  archived: boolean;
  startDate: string | null;
  endDate: string | null;
  status: StatusDTO | null;
  collumnId: string | null;
  numOfTasks: number;
  tasks: TaskResponseDTO[];
  createdDate: string;
  updatedDate: string;
}

export interface TaskResponseDTO {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: Status;
  cardId: string;
}

export interface StatusDTO {
  id: string;
  title: string;
  colorCode: string;
  board_id: string;
}

export enum Status {
  PENDING = "PENDING",
  FINISHED = "FINISHED",
  CANCELLED = "CANCELLED",
  DELETED = "DELETED"
}
