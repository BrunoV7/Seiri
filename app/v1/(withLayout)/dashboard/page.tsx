"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import BoardPreview from "@/components/boardPreview";
import { useUserContext } from "../../UserContext";
import router from "next/router";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Settings,
  Plus,
  BarChart3,
  Clock,
  TrendingUp,
  Calendar,
  Filter,
  Search,
  Grid3X3,
  List,
  Star,
  MoreHorizontal
} from "lucide-react";
import { loadUser, User } from "@/utils/user";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Cookies from "js-cookie";
import BoardGrid from "./BoardGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/nav";

type Board = {
  id: string;
  title: string;
  description: string;
  collumn_quantity: number;
  created_at?: string;
  updated_at?: string;
};

type DashboardStats = {
  totalBoards: number;
  recentBoards: number;
  completedTasks: number;
  activeProjects: number;
};

export default function Dashboard() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [user, setUser] = useState<User>();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"Quadros">("Quadros");

  const tabs = {
    Quadros: <BoardGrid searchQuery={searchQuery} viewMode={viewMode} />
  };

  // Mock stats - in a real app, these would come from the API
  const [stats] = useState<DashboardStats>({
    totalBoards: 0,
    recentBoards: 0,
    completedTasks: 0,
    activeProjects: 0
  });

  const loadBoards = useCallback(async () => {
    try {
      const response = await api.get("/api/board/v1/find/all");
      setBoards(response.data);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Erro ao carregar boards", error);
      setIsLoading(false);
    }
  }, []);

  const loadUserData = useCallback(async () => {
    try {
      const loadedUser = await loadUser();
      if (loadedUser) {
        setUser(loadedUser);
      }
    } catch (error) {
      console.error("Erro ao carregar usuário", error);
    }
  }, []);

  useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const filteredBoards = boards.filter(board =>
    board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    board.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentBoards = boards
    .sort((a, b) => new Date(b.updated_at || b.created_at || 0).getTime() - new Date(a.updated_at || a.created_at || 0).getTime())
    .slice(0, 3);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <section>
      <NavBar />
      <section className="h-full flex flex-col bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Olá, {user?.firstName || "Usuário"}! 👋
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                Aqui está um resumo do que está acontecendo nos seus quadros
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/v1/board/create">
                <Button className="bg-[#FFE301] text-slate-900 hover:bg-[#f5d900] font-medium">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Quadro
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total de Quadros</p>
                  <p className="text-2xl font-bold text-slate-900">{boards.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Recentes</p>
                  <p className="text-2xl font-bold text-slate-900">{recentBoards.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Tarefas Concluídas</p>
                  <p className="text-2xl font-bold text-slate-900">0</p>
                </div>
                <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Projetos Ativos</p>
                  <p className="text-2xl font-bold text-slate-900">{boards.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="space-y-2">
                  <Button
                    onClick={() => setActiveTab("Quadros")}
                    className={`w-full justify-start ${activeTab === "Quadros"
                        ? "bg-[#FFE301] text-slate-800 hover:bg-[#f5d900]"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Meus Quadros
                  </Button>
                </div>

                {/* Recent Boards */}
                {recentBoards.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-slate-700 mb-3">Recentes</h3>
                    <div className="space-y-2">
                      {recentBoards.map((board) => (
                        <Link key={board.id} href={`/v1/board/${board.id}`}>
                          <div className="p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                            <p className="text-sm font-medium text-slate-800 truncate">{board.title}</p>
                            <p className="text-xs text-slate-500 truncate">{board.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg border border-slate-200">
                {/* Content Header */}
                <div className="p-6 border-b border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Meus Quadros</h2>
                      <p className="text-sm text-slate-600">
                        {filteredBoards.length} {filteredBoards.length === 1 ? 'quadro' : 'quadros'} encontrado{filteredBoards.length === 1 ? '' : 's'}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Search */}
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <Input
                          placeholder="Buscar quadros..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-64 border-slate-200 focus:border-[#FFE301] focus:ring-[#FFE301]"
                        />
                      </div>

                      {/* View Mode Toggle */}
                      <div className="flex border border-slate-200 rounded-lg">
                        <Button
                          variant={viewMode === "grid" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setViewMode("grid")}
                          className={viewMode === "grid" ? "bg-[#FFE301] text-slate-800 hover:bg-[#f5d900]" : ""}
                        >
                          <Grid3X3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={viewMode === "list" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setViewMode("list")}
                          className={viewMode === "list" ? "bg-[#FFE301] text-slate-800 hover:bg-[#f5d900]" : ""}
                        >
                          <List className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tabs[activeTab]}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
