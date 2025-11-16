"use client";
import { useParams } from "next/navigation";
import { useBoardStore } from "./store/useBoardStore";
import { useEffect } from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const id = params.id as string;
    const fetchBoard = useBoardStore(state => state.fetchBoard);
    useEffect(() => {
        fetchBoard(id);
    }, [id, fetchBoard]);


    if(!id) {
        return <div>Board ID is missing</div>;
    }

    return (
        <div>
            <h1>Board Layout for ID: {id}</h1>
            {/* Additional layout components can be added here */}
            {children}
        </div>
    );
}