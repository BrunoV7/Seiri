"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import BoardPreview from "@/components/boardPreview";
import router from "next/router";
import { toast } from "sonner";
import { Inbox, LayoutDashboard, Settings } from "lucide-react";
import { loadUser, User } from "@/utils/user";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import BoardGrid from "./BoardGrid";
import Hero from "@/components/hero";
import { motion } from "framer-motion";

type Board = {
  id: string;
  title: string;
  description: string;
  collumn_quantity: number;
};

const tabs = {
  Quadros: <BoardGrid />,
  Inbox: (<div className="flex items-center justify-center h-full">
    <Inbox className="w-12 h-12 text-gray-500" />
    <p className="text-gray-500">Caixa de entrada vazia</p>
  </div>
  ),
  Configurações: (
    <div className="flex items-center justify-center h-full">
      <Settings className="w-12 h-12 text-gray-500" />
      <p className="text-gray-500">Configurações ainda não implementadas</p>
    </div>
  ),
  Dashboard: (
    <div className="flex items-center justify-center h-full">
      <LayoutDashboard className="w-12 h-12 text-gray-500" />
      <p className="text-gray-500">Dashboard em desenvolvimento</p>
    </div>
  ),
};

export default function Dashboard() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [user, setUser] = useState<User>();
  const [activeTab, setActiveTab] = useState<keyof typeof tabs>("Quadros");

  useEffect(() => {
    // Mock do usuário
    const mockUser = new User("Bruno", "Silva", "bruno.silva@example.com");
    setUser(mockUser);

    // Mock dos boards
    const mockBoards: Board[] = [
      {
        id: "1",
        title: "Board de Estudos",
        description: "Organize seus estudos aqui.",
        collumn_quantity: 3,
      },
      {
        id: "2",
        title: "Projetos Pessoais",
        description: "Acompanhe seus projetos pessoais.",
        collumn_quantity: 4,
      },
      {
        id: "3",
        title: "Tarefas do Trabalho",
        description: "Gerencie suas tarefas profissionais.",
        collumn_quantity: 5,
      },
    ];
    setBoards(mockBoards);
  }, []);

  if (!user) return <LoadingSkeleton />;

  return (
    <section className="h-full flex flex-col">
      {/* TODO: Implementar alguma feature de estatística */}
      <div>

      </div>
      <div className="flex flex-row p-4 gap-4 h-full">
        <div className="flex flex-col gap-2 w-48">
          {Object.keys(tabs).map((key) => (
            <Button
              key={key}
              onClick={() => setActiveTab(key as keyof typeof tabs)}
              className={` flex items-start justify-start hover:bg-gray-200 transition-colors duration-200 ${activeTab === key ? "bg-gray-200 text-slate-800 " : "bg-gray-50 text-slate-800"
                }`}
            >
              {key}
            </Button>
          ))}
        </div>
        <motion.div className="flex h-full flex-1" key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {tabs[activeTab]}
        </motion.div>
      </div>

    </section>
  );
}
