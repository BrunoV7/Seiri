"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";
import useOnClickOutside from "@/utils/hook";
import { Card, useBoardContext } from "./boardContext";
import { GripVertical } from "lucide-react";
import CardDefault from "./Old_Card";
import Drawer from "./Drawer";

interface ColumnProps {
    id: string;
    name: string;
    card_quantity: number;
    cards: { id: string; title: string; description?: string }[];
}

export type CardCreateDTO = {
  title: string; 
  description?: string; 
  position: number;
  priorityLevel?: number; 
  startDate?: Date;
  endDate?: Date;
  archived?: boolean; 
  collumnId: string; 
  statusId?: string; 
};

export default function Column({ id, name, card_quantity, cards }: ColumnProps) {
    const [newCardName, setNewCardName] = useState("");
    const [isLoadingCreateCard, setIsLoadingCreateCard] = useState(false);
    const [isCreatingCard, setIsCreatingCard] = useState(false);
    const { board, setBoard } = useBoardContext();
    const [card, setCard] = useState<CardCreateDTO | null>(null);
    const [cardQuantity, setCardQuantity] = useState(card_quantity);
    const [openCardId, setOpenCardId] = useState<string | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);

    useOnClickOutside(cardRef, () => {
        if (isCreatingCard) {
            if (!newCardName.trim()) {
                setIsCreatingCard(false);
            } else {
                addCard();
            }
        }
    });

    const addCard = async () => {
        if (!newCardName.trim()) {
            toast.error("Por favor, digite um nome para o card");
            return;
        }

        setIsLoadingCreateCard(true);
        try {
            const card: CardCreateDTO = {
                title: newCardName,
                description: "",
                position: cardQuantity,
                priorityLevel: 0,
                startDate: undefined,
                endDate: undefined,
                archived: false,
                collumnId: id,
                statusId: undefined,
            };

            const response = await api.post(`/api/v1/card/new/${id}`, card);

            const newCard: Card = {
                id: response.data.id,
                title: response.data.title,
                description: response.data.description ?? "",
                startDate: response.data.startDate ?? "",
                endDate: response.data.endDate ?? "",
                status: response.data.status,
                numOfTasks: response.data.numOfTasks,
                tasks: [],
            };


            setBoard((prevBoard) => ({
                ...prevBoard,
                collumns: prevBoard.collumns.map((col) =>
                    col.id === id
                        ? { ...col, cards: [...(col.cards || []), newCard] }
                        : col
                ),
            }));
            setCardQuantity(cardQuantity + 1);
            toast.success("Card adicionado com sucesso!");
            setNewCardName("");
            setIsCreatingCard(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Não foi possível criar o card.");
        } finally {
            setIsLoadingCreateCard(false);
        }
    };


    return (
        <div className="min-w-[300px] h-fit bg-white rounded-lg shadow-md p-4 flex flex-col">
            {/* Cabeçalho da coluna */}
            <div className="flex flex-row justify-between items-center mb-4">
                <h2 className="text-base font-medium text-slate-900">{name}</h2>
                <p className="flex items-center justify-center text-sm text-gray-500 bg-slate-200 rounded-sm w-fit h-6 px-2">
                    {cardQuantity > 100 ? "100+" : cardQuantity}
                </p>
            </div>

            {/* Lista de cards */}
            <div className="flex flex-col space-y-2">
                {cards.map((card) => (
                    <Drawer key={card.id} id={card.id} />
                ))}
                {/* Criar card */}
                <div ref={cardRef} className="w-full">
                    {isCreatingCard ? (
                        <Input
                            type="text"
                            placeholder="Nome do card"
                            value={newCardName}
                            onChange={(e) => setNewCardName(e.target.value)}
                            disabled={isLoadingCreateCard}
                            required
                        />
                    ) : (
                        <Button
                            variant="ghost"
                            className="text-slate-600 w-full bg-slate-100 hover:bg-slate-200"
                            onClick={() => setIsCreatingCard(true)}
                        >
                            Adicionar Card
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
