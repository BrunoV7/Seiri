"use client"
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GripVertical, Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/api";
import { Card } from "../service/board";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import DivButton from "@/components/ui/divButton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useBoardContext } from "./boardContext";
import { cn } from "@/lib/utils";
import DrawerDates from "./drawerUtils/drawer-dates";
import DrawerOptions from "./drawerUtils/drawer-options";
import DrawerTrigger from "./drawerUtils/drawer-trigger";
import DrawerHeader from "./drawerUtils/drawer-header";
import DrawerBody from "./drawerUtils/drawer-body";
import { useCard } from "./hooks/useCard";
import { useUpdateCard } from "./hooks/useUpdateCard";

type Status = { title: string; colorCode: string };

interface Props { id: string; }

export default function Drawer({ id }: Props) {
    const { card, setCard } = useCard(id);
    const { updateCard } = useUpdateCard(setCard);


    if (!card) return <div>Loading...</div>;

    return (
        <Sheet>
            <SheetTrigger>
                <DrawerTrigger id={card.id} title={card.title} description={card.description} />
            </SheetTrigger>
            <SheetContent className="md:w-4/10 max-w-6/10 p-6 overflow-y-scroll">
                <SheetHeader className="flex flex-row gap-4 justify-between pt-4 pl-4 pr-4 pb-0">
                    <DrawerHeader card={card} />
                    <DrawerOptions card={card} updateCard={updateCard} />
                </SheetHeader>

                <DrawerBody card={card} setCard={setCard} />

                <SheetFooter />
            </SheetContent>
        </Sheet>
    );
}