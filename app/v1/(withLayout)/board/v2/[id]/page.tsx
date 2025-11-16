"use client";
import { useBoardContext } from "./context/boardContextProvider";
import { useBoardStore } from "./store/useBoardStore";

export default function Board() {
    const board = useBoardStore(s => s.board)
    const isLoading = useBoardStore(s => s.isLoading);


    if(isLoading || !board) {
        return <div>Loading board...</div>;
    }

    return <div>Board 2 Layout title: {board.title}</div>;
}                                                     