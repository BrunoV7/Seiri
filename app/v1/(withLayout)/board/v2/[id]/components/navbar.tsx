"use client";

import { useBoardStore } from "../store/useBoardStore";

export default function BoardNavBar() {
    const board = useBoardStore(s => s.board)
    const isLoading = useBoardStore(s => s.isLoading);


    if (isLoading || !board) {
        return <div>Loading navBar...</div>;
    }

    return (
        <div>
            <h2>{board.title} - NavBar</h2>
            <h3>{board.description}</h3>
            <p>BOARD-{board.id.slice(0,5)}</p>
        </div>
    )
}