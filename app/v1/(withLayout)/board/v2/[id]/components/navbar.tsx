"use client";

import { Button } from "@/components/ui/button";
import { useBoardStore } from "../store/useBoardStore";
import InputRename from "./inputRenameInline";
import Link from "next/link";
import { useUserContext } from "@/app/v1/UserContext";

export default function BoardNavBar() {
    const board = useBoardStore(s => s.board)
    const isLoading = useBoardStore(s => s.isLoading);

    if (isLoading || !board) {
        return <div>Loading navBar...</div>;
    }


    return (
        <section className="px-8 py-6 flex flex-row justify-between items-center">
            {/* Navbar left side with board title and description */}
            <div className="flex items-center gap-4 px-5 py-4 bg-white rounded-xl border border-gray-200">

                {/* Ícone / voltar */}
                <Link
                    className="flex items-center justify-center h-12 w-12 rounded-lg hover:bg-gray-100 transition"
                    href="/v1/dashboard"
                >
                    <svg
                        width="26"
                        height="28"
                        viewBox="0 0 75 99"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-700"
                    >
                        <path
                            d="M70.9335 35.5211C70.9335 14.4228 70.9335 7.7088 70.9335 5.68055C70.9335 5.14982 70.5034 5.10191 69.997 5.21977L4.75976 20.4062C4.34477 20.5028 3.99219 20.9544 3.99219 21.3894V21.3894V94.2456C3.99219 94.3607 4.07669 94.4325 4.18591 94.4136C12.2928 93.0152 15.5099 91.8361 30.7616 88.2228M70.9335 35.5211C70.9335 70.1015 53.0414 83.0289 34.437 87.3598C33.1381 87.6621 31.9154 87.9494 30.7616 88.2228M70.9335 35.5211C70.7272 41.7674 61.5615 56.6057 47.8217 57.1133C51.124 69.9832 43.7075 85.2017 30.7616 88.2228"
                            stroke="currentColor"
                            strokeWidth="8.354"
                        />
                    </svg>
                </Link>

                {/* Informações do board */}
                <div className="flex flex-col">
                    <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">
                        {board.title}
                    </h2>

                    <p className="text-gray-600 text-sm line-clamp-1 max-w-[45ch]">
                        {board.description}
                    </p>
                </div>

            </div>


            {/* Navbar right side with utils & user profile to added here */}
            <div className="flex items-center gap-4 px-5 py-4 bg-white rounded-xl border border-gray-200">

            </div>
        </section>
    )
}


/**
 * 
 * 
 * 
 * <div className="flex flex-row w-full pb-2 pt-2 pl-4 pr-4">
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
 * 
 */