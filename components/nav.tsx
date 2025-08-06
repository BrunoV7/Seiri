"use client";

import { useEffect, useState } from "react";
import { User } from "@/utils/user";
import { Settings, Inbox, MenuIcon } from "lucide-react";
import LoadingSkeleton from "./LoadingSkeleton";
import { motion } from "framer-motion";


export default function NavBar() {
    const [user, setUser] = useState<User>();
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const mockUser = new User("Bruno", "Nobre", "bruno.silva@example.com");
        setUser(mockUser);
    }, []);

    if (!user) return <LoadingSkeleton />;

    return (
        <div className="p-4 px-8 flex flex-row justify-between items-center bg-white border-b border-slate-200">
            <div className="flex items-center gap-3">
                <svg
                    width="28"
                    height="30"
                    viewBox="0 0 75 99"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M70.9335 35.5211C70.9335 14.4228 70.9335 7.7088 70.9335 5.68055C70.9335 5.14982 70.5034 5.10191 69.997 5.21977L4.75976 20.4062C4.34477 20.5028 3.99219 20.9544 3.99219 21.3894V21.3894V94.2456C3.99219 94.3607 4.07669 94.4325 4.18591 94.4136C12.2928 93.0152 15.5099 91.8361 30.7616 88.2228M70.9335 35.5211C70.9335 70.1015 53.0414 83.0289 34.437 87.3598C33.1381 87.6621 31.9154 87.9494 30.7616 88.2228M70.9335 35.5211C70.7272 41.7674 61.5615 56.6057 47.8217 57.1133C51.124 69.9832 43.7075 85.2017 30.7616 88.2228"
                        stroke="black"
                        strokeWidth="8.35443"
                    />
                </svg>
                <span className="font-semibold text-xl text-neutral-900 tracking-tight">
                    Seiri
                </span>
            </div>
            <div className="hidden md:flex flex-row gap-4 items-center">
                <div className="flex items-center gap-3 px-2">
                    <div className="flex justify-center items-center w-9 h-9 bg-yellow-700 text-white rounded-md font-bold">
                        {user.firstName.charAt(0)}
                    </div>
                    <div className="flex flex-col leading-tight max-w-[160px] truncate">
                        <p className="text-sm font-medium truncate">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-slate-500">Usuário Pioneiro</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className="flex justify-center items-center w-9 h-9 rounded-lg border border-[#d1d9e0] hover:bg-slate-100 transition-colors duration-200"
                        title="Configurações"
                    >
                        <Settings className="w-5 h-5 text-slate-600" />
                    </button>
                    <button
                        className="flex justify-center items-center w-9 h-9 rounded-lg border border-[#d1d9e0] hover:bg-slate-100 transition-colors duration-200"
                        title="Caixa de mensagens"
                    >
                        <Inbox className="w-5 h-5 text-slate-600" />
                    </button>
                </div>
            </div>
            <div className="md:hidden flex items-center gap-2 relative">
                <button
                    className="flex justify-center items-center w-9 h-9 rounded-lg border border-[#d1d9e0] hover:bg-slate-100 transition-colors duration-200"
                    title="Caixa de mensagens"
                    onClick={() => setIsClicked(!isClicked)}
                >
                    <MenuIcon className="w-6 h-6 text-slate-600" />
                </button>
                {isClicked && (
                <motion.div className="absolute top-0 bg-black w-48 h-dvh" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                </motion.div>
            )}
            </div>
        </div>
    )
}