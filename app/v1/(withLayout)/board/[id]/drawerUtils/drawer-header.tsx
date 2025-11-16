import { SheetTitle, SheetDescription } from "@/components/ui/sheet";
import DrawerDates from "./drawer-dates";
import React from "react";
import { useUpdateCard } from "../hooks/useUpdateCard";
import { useCard } from "../hooks/useCard";
import { Board, useBoardContext } from "../boardContext";
import api from "@/lib/api";
import { toast } from "sonner";

export default function DrawerHeader({ selectedCard }: { selectedCard: any }) {
    const [isTitleClicked, setIsTitleClicked] = React.useState(false);
    const { card, setCard } = useCard(selectedCard.id);
    const { updateCard } = useUpdateCard(setCard);
    const [tempTitle, setTempTitle] = React.useState(selectedCard.title);
    const { board, setBoard } = useBoardContext();

    React.useEffect(() => {
        if (card?.title) {
            setTempTitle(card.title);
        }
    }, [card?.title]);

    async function fetchBoard() {
      try {
        const res = await api.get(`/api/v1/board/find/full/${board.id}`);
        const data: Board = res.data;
        setBoard(data);
      } catch (error) {
        toast.error("Algo deu errado ao carregar o board.");
      }
    }

    const handleSave = React.useCallback(() => {
        setIsTitleClicked(false);
        const trimmedTitle = tempTitle.trim();
        
        if (trimmedTitle === "" || trimmedTitle === card?.title) {
            // Reset to original if empty or unchanged
            setTempTitle(card?.title || "");
            return;
        }
        
        // Save the new title
        if (card) {
            updateCard({ ...card, title: trimmedTitle });
            fetchBoard();
        }
    }, [tempTitle, card, updateCard]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSave();
        } else if (e.key === "Escape") {
            setTempTitle(card?.title || "");
            setIsTitleClicked(false);
        }
    };

    if (!card) {
        return (
            <>
                <SheetTitle className="text-2xl md:text-4xl lg:text-5xl font-bold text-wrap tracking-tight" />
                <SheetDescription className="text-lg text-wrap" />
            </>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <SheetTitle className="text-2xl md:text-4xl lg:text-5xl font-bold text-wrap tracking-tight">
                {isTitleClicked ? (
                    <input
                        type="text"
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                        aria-label="Edit card title"
                        autoFocus
                    />
                ) : (
                    <button
                        onClick={() => setIsTitleClicked(true)}
                        className="text-left w-full hover:opacity-70 transition-opacity"
                        aria-label="Click to edit title"
                    >
                        {card.title}
                    </button>
                )}
            </SheetTitle>
            <SheetDescription className="text-lg text-wrap">
                {card.description || "No description"}
            </SheetDescription>
            <DrawerDates createdDate={card.createdDate} updatedDate={card.updatedDate} />
        </div>
    );
}