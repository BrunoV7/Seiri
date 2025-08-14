"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import BoardPreview from "@/components/boardPreview";
import { useUserContext } from "../../UserContext";
import router from "next/router";
import { toast } from "sonner";
import { LayoutDashboard, Settings } from "lucide-react";
import { loadUser, User } from "@/utils/user";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Cookies from "js-cookie";
import BoardGrid from "./BoardGrid";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Board = {
  id: string;
  title: string;
  description: string;
  collumn_quantity: number;
};

const tabs = {
  Quadros: <BoardGrid />
};

export default function Dashboard() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [user, setUser] = useState<User>();
  const [activeTab, setActiveTab] = useState<keyof typeof tabs>("Quadros");

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const response = await api.get("/api/v1/board/find/all");
        setBoards(response.data);
      } catch (error: any) {
        console.error("Erro ao carregar boards", error);
      }
    };
    loadBoards();
  }, []);

  return (
    <section className="h-full flex flex-col">
      {/* TODO: Implementar alguma feature de estatística */}
      <div></div>
      <div className="flex flex-col md:flex-row p-4 gap-8 md:gap-4 h-full">
        <div className="grid grid-cols-2 flex-col md:flex md:flex-col gap-2 w-full md:w-68 md:auto-rows-max">
          {Object.keys(tabs).map((key) => (
            <Button
              key={key}
              onClick={() => setActiveTab(key as keyof typeof tabs)}
              className={` w-full flex items-start justify-start hover:bg-yellow-200 transition-colors duration-200 ${
                activeTab === key
                  ? "bg-[#FFE301] text-slate-800 "
                  : "bg-gray-50 text-slate-800"
              }`}
            >
              {key}
            </Button>
          ))}
        </div>
        <motion.div
          className="flex h-9/10 flex-1"
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {tabs[activeTab]}
        </motion.div>
      </div>
    </section>
  );
}
