"use client";

import { useState, useRef } from "react";
import { useBoardContext } from "./boardContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import useOnClickOutside from "@/utils/hook";

export default function Board() {
  const { board, setBoard } = useBoardContext();

  // Column creation state
  const [isCreateColumnClicked, setIsCreateColumnClicked] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [isLoadingCreateColumn, setIsLoadingCreateColumn] = useState(false);

  // Card creation state (track which column is active)
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [newCardName, setNewCardName] = useState("");
  const [isLoadingCreateCard, setIsLoadingCreateCard] = useState(false);

  // Column creation handler
  const containerRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(containerRef, () => {
    if (!newColumnName.trim()) {
      setIsCreateColumnClicked(false);
    } else {
      addColumn();
    }
  });

  const addColumn = async () => {
    if (!newColumnName.trim()) {
      toast.error("Por favor, digite um nome para a coluna");
      return;
    }
    setIsLoadingCreateColumn(true);

    try {
      const response = await api.post(`/api/v1/collumn/new/${board.id}`, {
        name: newColumnName,
      });

      const newColumn = {
        id: response.data.id,
        name: newColumnName,
        card_quantity: 0,
        cards: [],
        board_id: board.id,
      };

      setBoard({
        ...board,
        collumns: [...(board.collumns || []), newColumn],
        collumn_quantity: (board.collumn_quantity || 0) + 1,
      });

      setNewColumnName("");
      setIsCreateColumnClicked(false);
      toast.success("Coluna adicionada com sucesso!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Não foi possível criar a coluna.");
    } finally {
      setIsLoadingCreateColumn(false);
    }
  };

  // Card creation handler (per column)
  const addCard = async (columnId: string) => {
    if (!newCardName.trim()) {
      toast.error("Por favor, digite um nome para o card");
      return;
    }

    setIsLoadingCreateCard(true);

    try {
      const response = await api.post(`/api/v1/card/new/${activeColumnId}`, {
        title: newCardName,
      });

        const newCard = {
        id: response.data.id,
        title: newCardName,
        column_id: activeColumnId,
      };

      setNewCardName("");
      setActiveColumnId(null);
      toast.success("Card adicionado com sucesso!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Não foi possível criar o card.");
    } finally {
      setIsLoadingCreateCard(false);
    }
  };

  return (
    <div className="h-full flex flex-row overflow-x-auto bg-slate-50 p-4 space-x-4">
      {board.collumns?.map((column) => {
        // Each column has its own cardRef
        const cardRef = useRef<HTMLDivElement | null>(null);

        // Handle click outside for this column
        useOnClickOutside(cardRef, () => {
          if (activeColumnId === column.id) {
            if (!newCardName.trim()) {
              setActiveColumnId(null);
            } else {
              addCard(column.id);
            }
          }
        });

        return (
          <div key={column.id} className="min-w-[300px] h-fit bg-white rounded-lg shadow-md p-4 flex flex-col">
            {/* Column Header */}
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="text-base font-medium text-slate-900">{column.name}</h2>
              <p className="flex items-center justify-center text-sm text-gray-500 bg-slate-200 rounded-sm w-fit h-6 px-2">
                {column.card_quantity > 100 ? "100+" : column.card_quantity}
              </p>
            </div>

            {/* Cards List */}
            <div className="flex flex-col space-y-2">
              {column.cards?.map((card) => (
                <div key={card.id} className="bg-slate-100 p-2 rounded-md shadow-sm hover:bg-slate-200 cursor-pointer">
                  <h3 className="text-sm font-medium text-slate-900">{card.title}</h3>
                  <p className="text-xs text-slate-600">{card.description}</p>
                </div>
              ))}

              {/* Card Creation */}
              <div ref={cardRef} className="w-full">
                {activeColumnId === column.id ? (
                  <div>
                    <Input
                      type="text"
                      placeholder="Nome do card"
                      value={newCardName}
                      onChange={(e) => setNewCardName(e.target.value)}
                      disabled={isLoadingCreateCard}
                      required
                    />
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    className="text-slate-600 w-full bg-slate-100 hover:bg-slate-200"
                    onClick={() => setActiveColumnId(column.id)}
                  >
                    Adicionar Card
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Column Creation */}
      <div className={cn("flex flex-row items-center border-dotted border-2 border-gray-300 rounded-lg min-w-[300px] h-fit p-4 bg-slate-100", isCreateColumnClicked && "border-solid bg-white")}>
        <div ref={containerRef} className="w-full">
          {isCreateColumnClicked ? (
            <div className="flex flex-col space-y-2 w-full">
              <Input
                type="text"
                placeholder="Nome da coluna"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                disabled={isLoadingCreateColumn}
                required
              />
              <Button
                onClick={addColumn}
                disabled={isLoadingCreateColumn || !newColumnName.trim()}
                className="text-slate-900 text-sm bg-yellow-300 hover:bg-slate-300"
              >
                Adicionar coluna
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsCreateColumnClicked(true)}
              className="text-slate-600 w-full bg-slate-100 hover:bg-slate-200"
              variant="ghost"
            >
              Criar nova coluna
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
