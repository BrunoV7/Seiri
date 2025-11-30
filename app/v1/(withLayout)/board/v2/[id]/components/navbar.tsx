"use client";

import { Button } from "@/components/ui/button";
import { useBoardStore } from "../store/useBoardStore";
import InputRename from "./inputRenameInline";

export default function BoardNavBar() {
    const board = useBoardStore(s => s.board)
    const isLoading = useBoardStore(s => s.isLoading);

    if (isLoading || !board) {
        return <div>Loading navBar...</div>;
    }


    return (
        <div className="flex flex-row w-full pb-2 pt-2 pl-4 pr-4">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-1">
                    <InputRename value={board.description} onChange={(newValue) => {
                    }} />
                    <h3>{board.description}</h3>
                </div>
                <p>BOARD-{board.id.slice(0, 10)}</p>
            </div>



            <Button></Button>

         
        </div>
    )
}
