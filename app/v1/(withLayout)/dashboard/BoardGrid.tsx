"use client";

import BoardPreview from "@/components/boardPreview";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Icons } from "@/components/ui/icons";
import api from "@/lib/api";
import { PlusIcon, Calendar, MoreHorizontal, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Board = {
  id: string;
  title: string;
  description: string;
  collumn_quantity: number;
  created_at?: string;
  updated_at?: string;
};

interface BoardGridProps {
  searchQuery?: string;
  viewMode?: "grid" | "list";
}

export default function BoardGrid({ searchQuery = "", viewMode = "grid" }: BoardGridProps) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const response = await api.get("/api/v1/board/find/all");
        setBoards(response.data);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Erro ao carregar boards", error);
        setIsLoading(false);
      }
    };
    loadBoards();
  }, []);

  const filteredBoards = boards.filter(board =>
    board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    board.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function renderEmptyState() {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <PlusIcon className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">
          {searchQuery ? "Nenhum quadro encontrado" : "Nenhum quadro criado ainda"}
        </h3>
        <p className="text-slate-500 text-center mb-6 max-w-sm">
          {searchQuery 
            ? "Tente ajustar sua busca ou criar um novo quadro."
            : "Comece organizando suas tarefas criando seu primeiro quadro."
          }
        </p>
        <Link href="/v1/board/create">
          <Button className="bg-[#FFE301] text-slate-900 hover:bg-[#f5d900] font-medium">
            <PlusIcon className="w-4 h-4 mr-2" />
            Criar Primeiro Quadro
          </Button>
        </Link>
      </div>
    );
  }

  function renderGrid() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBoards.map((board, index) => (
          <motion.div
            key={board.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <BoardPreview board={board} />
          </motion.div>
        ))}
      </div>
    );
  }

  function renderList() {
    return (
      <div className="space-y-3">
        {filteredBoards.map((board, index) => (
          <motion.div
            key={board.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/v1/board/${board.id}`}>
              <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-all duration-200 group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {board.title.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                      {board.title}
                    </h3>
                    <p className="text-sm text-slate-500 truncate max-w-md">
                      {board.description || "Sem descrição"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-xs text-slate-500">
                      {board.collumn_quantity} coluna{board.collumn_quantity !== 1 ? 's' : ''}
                    </p>
                    {board.updated_at && (
                      <p className="text-xs text-slate-400">
                        Atualizado {new Date(board.updated_at).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.preventDefault();
                      // TODO: Implement board actions menu
                    }}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icons.spinner className="h-8 w-8 text-[#FFE301] animate-spin" />
      </div>
    );
  }

  if (filteredBoards.length === 0) {
    return renderEmptyState();
  }

  return viewMode === "grid" ? renderGrid() : renderList();
}
