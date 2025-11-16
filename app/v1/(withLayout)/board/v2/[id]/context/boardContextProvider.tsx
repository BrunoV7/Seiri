"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { BoardResponseFullDTO } from "../../../model/board";
import { toast } from "sonner";
import api from "@/lib/api";

type BoardContextType = {
    board: BoardResponseFullDTO | undefined;
    setBoard: React.Dispatch<React.SetStateAction<BoardResponseFullDTO | undefined>>;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const boardContext = createContext<BoardContextType | undefined>(
    undefined
);

export function BoardProvider({ id, children }: { id: string; children: React.ReactNode }) {
    const [board, setBoard] = useState<BoardResponseFullDTO | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBoard = useCallback(async () => {
        if (!id) {
            setError("Board ID is missing");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const res = await api.get(`/api/v1/board/find/full/${id}`);
            const data: BoardResponseFullDTO = res.data;
            setBoard(data);
        } catch (err) {
            const errorMessage = "Algo deu errado ao carregar o board.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchBoard();
    }, [fetchBoard]);

    return (
        <boardContext.Provider 
            value={{ 
                board, 
                setBoard, 
                isLoading, 
                error,
                refetch: fetchBoard 
            }}
        >
            {children}
        </boardContext.Provider>
    );
}

export function useBoardContext() {
    const context = useContext(boardContext);
    if (context === undefined) {
        throw new Error("useBoardContext must be used within a BoardProvider");
    }
    return context;
}