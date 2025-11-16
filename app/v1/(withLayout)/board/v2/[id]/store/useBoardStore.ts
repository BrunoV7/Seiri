"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { BoardResponseFullDTO } from "../../../model/board";
import api from "@/lib/api";
import { toast } from "sonner";

type BoardState = {
    board?: BoardResponseFullDTO;
    isLoading: boolean;
    error: string | null;

    fetchBoard: (id: string) => Promise<void>;
    refetch: () => Promise<void>;
}

export const useBoardStore = create<BoardState>()(
    devtools((set, get) => ({
        board: undefined,
        isLoading: false,
        error: null,

        fetchBoard: async (id: string) => {
            try {
                set({ isLoading: true, error: null });
                const res = await api.get(`/api/v1/board/find/full/${id}`);
                const data: BoardResponseFullDTO = res.data;
                set({ board: data });
            } catch (err) {
                const errorMessage = "Algo deu errado ao carregar o board.";
                set({ error: errorMessage });
                toast.error(errorMessage);
            } finally {
                set({ isLoading: false });
            }
        },
        refetch: async () => {
            const board = get().board;
            const id = board?.id;
            if (!id) {
                return;
            }
            await get().fetchBoard(id);
        },
    }))
)