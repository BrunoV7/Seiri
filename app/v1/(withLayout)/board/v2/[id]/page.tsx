"use client";

import BoardGrid from "./components/boardgrid";
import { useBoardStore } from "./store/useBoardStore";

export default function Board() {
    const board = useBoardStore(s => s.board)
    const isLoading = useBoardStore(s => s.isLoading);


    if(isLoading || !board) {
        return <div>Loading board...</div>;
    }

    return <BoardGrid />;
}