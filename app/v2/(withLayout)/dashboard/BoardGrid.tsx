"use client";

import BoardPreview from "@/components/boardPreview";
import { PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";

type Board = {
    id: string;
    title: string;
    description: string;
    collumn_quantity: number;
};
export default function BoardGrid() {
    const [boards, setBoards] = useState<Board[]>([]);

    useEffect(() => {
        // Mock dos boards
        const mockBoards: Board[] = [{
            id: "1",
            title: "Board de Estudos",
            description: "Organize seus estudos aqui.",
            collumn_quantity: 3,
        },
        {
            id: "2",
            title: "Projetos Pessoais",
            description: "Acompanhe seus projetos pessoais.",
            collumn_quantity: 4,
        },
        {
            id: "3",
            title: "Tarefas do Trabalho",
            description: "Gerencie suas tarefas profissionais.",
            collumn_quantity: 5,
        },];
        setBoards(mockBoards);
    }, []);

    function renderBoards() {
        if (boards.length === 0) {
            return (
                <button className="border border-neutral-200 rounded-md p-4 h-40 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="h-full w-full flex flex-col gap-2 items-center justify-center text-center">
                        <PlusIcon className="w-8 h-8 text-slate-400" />
                        <p className="text-sm font-medium text-slate-600">Nenhum quadro encontrado</p>
                        <p className="text-xs text-slate-500">Crie seu primeiro quadro</p>
                    </div>
                </button>
            );
        }

        return boards.map((board) => (
            <BoardPreview key={board.id} board={board} />
        ));
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-max gap-4 w-full">
            {renderBoards()}
        </div>
    );
}