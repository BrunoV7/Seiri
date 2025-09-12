"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeleton";
import api from "@/lib/api";
import { toast } from "sonner";
import { useBoardContext } from "@/app/v1/(withLayout)/board/[id]/boardContext";
import { Board } from "@/app/v1/(withLayout)/board/service/board";
import {
  ChevronFirst,
  ChevronLeft,
  Dot,
  EllipsisIcon,
  EllipsisVertical,
  Filter,
  Home,
  Share2,
  Download,
  Settings,
  Users,
  Star,
  Archive,
  Trash2,
  Edit3,
  Copy,
  MoreHorizontal,
  Search,
  Calendar,
  BarChart3,
  Clock,
  CheckSquare,
  Plus
} from "lucide-react";
import { User, loadUserFromCookie, loadUser } from "@/utils/user";
import { useRouter } from "next/navigation";
import { Avatar } from "@radix-ui/react-avatar";
import UserAvatar from "./UserAvatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SidebarMenuButton } from "./ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function BoardNavBar({
  isColab = false,
}: {
  isColab?: boolean;
}) {
  const { board, setBoard } = useBoardContext();
  const [user, setUser] = useState<User>();
  const [isClicked, setIsClicked] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [filter, setFilter] = useState<string[]>([]);
  const [filteredBoard, setFilteredBoard] = useState<Board | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBoardStats, setShowBoardStats] = useState(false);
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  useEffect(() => {}, []);

  useEffect(() => {
    async function fetchBoard() {
      try {
        const res = await api.get(`/api/v1/board/find/full/${id}`);
        const data: Board = res.data;
        setBoard(data);
        console.log(data);
      } catch (error) {
        toast.error("Algo deu errado ao carregar o board.");
      }
    }

    async function fetchUser() {
      const loadedUser = loadUserFromCookie();
      let finalUser: User | undefined;

      if (loadedUser) {
        finalUser = loadedUser;
      } else {
        const loadedUserFromBackend = await loadUser();
        if (loadedUserFromBackend) {
          finalUser = loadedUserFromBackend;
        } else {
          router.push("/auth/login");
          return;
        }
      }

      if (finalUser && !finalUser.avatarUrl) {
        finalUser = {
          ...finalUser,
          avatarUrl: "https://avatars.githubusercontent.com/BrunoV7",
        };
      }

      setUser(finalUser);
      console.log("User carregado:", finalUser);
    }
    fetchUser();
    if (id) fetchBoard();
  }, [id, router]);

  const handleTitleChange = async () => {
    try {
      const res = await api.put("/api/v1/board/edit/" + board.id, board);
      const data: Board = res.data;
      setBoard(data);
      console.log(board);
      toast.success("Pronto! Seu quadro já tem o novo título.");
    } catch (error) {
      toast.error("Hmm… o título não quis mudar. Tente de novo!");
      router.refresh();
    }
  };

  if (!board) return <LoadingSkeleton />;

  return (
    <div className="w-full bg-white border-b border-slate-200">
      <div className="flex items-center justify-between p-4">
        {/* Left Section - Brand & Navigation */}
        <div className="flex items-center gap-4">
          {/* Back Button */}
          <Link href="/v1/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar</span>
            </Button>
          </Link>
          {/* Board Info */}
          {board && (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{board.title.charAt(0)}</span>
              </div>
              <div className="flex flex-col leading-tight max-w-[300px] truncate">
                {isClicked ? (
                    <input
                      className="text-lg font-semibold truncate border-0 bg-transparent outline-none px-1 w-full"
                      type="text"
                      name="title"
                      id="title"
                      value={board.title}
                      onChange={(e) => {
                        setBoard({ ...board, title: e.target.value });
                      }}
                      onBlur={handleTitleChange}
                      onKeyUp={(e) => {
                        if (e.key == "Enter") {
                          handleTitleChange();
                          e.currentTarget.blur();
                        }
                      }}
                      autoFocus
                    />
                ) : (
                  <h1
                    className="text-lg font-semibold text-slate-900 truncate cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => setIsClicked(!isClicked)}
                  >
                    {board.title}
                  </h1>
                )}
                <p className="text-sm text-slate-500 truncate">{board.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Buscar cards, tarefas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-slate-200 focus:border-[#FFE301] focus:ring-[#FFE301]"
            />
          </div>
        </div>

        {/* Right Section - Actions & User */}
        <div className="flex items-center gap-3">
          {/* Board Actions */}
          <div className="flex items-center gap-2">
            {/* Board Stats */}
            <Button
              variant="outline"
              size="sm"
              className="border-slate-200 hover:bg-slate-50"
              onClick={() => setShowBoardStats(!showBoardStats)}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Estatísticas</span>
            </Button>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
            {isColab && <UserAvatar className="-mr-2" user={null} />}
            <UserAvatar user={user} />

            {/* Filters */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-slate-200 hover:bg-slate-50 ${
                    filter.length > 0 ? "border-[#FFE301] bg-[#FFE301]/10" : ""
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Filtros</span>
                  {filter.length > 0 && (
                    <span className="ml-1 bg-[#FFE301] text-slate-900 text-xs px-1.5 py-0.5 rounded-full">
                      {filter.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-900">Filtros</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-slate-500 hover:text-slate-700"
                      onClick={() => {
                        setFilter([]);
                        setFilteredBoard(null);
                        setIsActive(false);
                      }}
                    >
                      Limpar
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-3 block">
                        Status
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { key: "PLANNED", label: "Planejado", color: "bg-blue-100 text-blue-800 border-blue-200" },
                          { key: "IN_PROGRESS", label: "Em Progresso", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
                          { key: "FINISHED", label: "Concluído", color: "bg-green-100 text-green-800 border-green-200" },
                        ].map((status) => (
                          <Button
                            key={status.key}
                            variant={filter.includes(status.key) ? "default" : "outline"}
                            size="sm"
                            className={`text-xs ${
                              filter.includes(status.key)
                                ? "bg-[#FFE301] text-slate-900 border-[#FFE301] hover:bg-[#f5d900]"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                            }`}
                            onClick={() => {
                              const newFilters = filter.includes(status.key)
                                ? filter.filter((f) => f !== status.key)
                                : [...filter, status.key];
                              setFilter(newFilters);
                            }}
                          >
                            {status.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-3 block">
                        Data
                      </label>
                      <div className="space-y-2">
                        <Input
                          type="date"
                          className="text-sm border-slate-200 focus:border-[#FFE301] focus:ring-[#FFE301]"
                          placeholder="Data início"
                          onChange={(e) => {
                            const newFilters = [
                              ...filter.filter((f) => !f.includes("startDate")),
                              `startDate:${e.target.value}`,
                            ];
                            setFilter(newFilters);
                          }}
                        />
                        <Input
                          type="date"
                          className="text-sm border-slate-200 focus:border-[#FFE301] focus:ring-[#FFE301]"
                          placeholder="Data fim"
                          onChange={(e) => {
                            const newFilters = [
                              ...filter.filter((f) => !f.includes("endDate")),
                              `endDate:${e.target.value}`,
                            ];
                            setFilter(newFilters);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* More Actions */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-200 hover:bg-slate-50"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="end">
                <div className="flex flex-col">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-slate-700 hover:bg-slate-100"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-slate-700 hover:bg-slate-100"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                  <div className="border-t border-slate-200 my-1"></div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-slate-700 hover:bg-slate-100"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configurações
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-slate-700 hover:bg-slate-100"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Membros
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-slate-700 hover:bg-slate-100"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Favoritar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-slate-700 hover:bg-slate-100"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicar
                  </Button>
                  <div className="border-t border-slate-200 my-1"></div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-red-600 hover:bg-red-50"
                  >
                    <Archive className="w-4 h-4 mr-2" />
                    Arquivar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Board Stats Panel */}
      <AnimatePresence>
        {showBoardStats && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.4, 0.0, 0.2, 1],
              opacity: { duration: 0.2 }
            }}
            className="overflow-hidden"
          >
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4">
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.1,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
              >
                <motion.div 
                  className="bg-white rounded-lg p-3 border border-slate-200 hover:shadow-sm transition-shadow"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.2,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.3,
                        ease: [0.4, 0.0, 0.2, 1]
                      }}
                    >
                      <CheckSquare className="w-4 h-4 text-green-600" />
                    </motion.div>
                    <span className="text-sm font-medium text-slate-700">Tarefas Concluídas</span>
                  </div>
                  <motion.p 
                    className="text-2xl font-bold text-slate-900 mt-1"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.4,
                      ease: [0.4, 0.0, 0.2, 1]
                    }}
                  >
                    0
                  </motion.p>
                </motion.div>

                <motion.div 
                  className="bg-white rounded-lg p-3 border border-slate-200 hover:shadow-sm transition-shadow"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.25,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.35,
                        ease: [0.4, 0.0, 0.2, 1]
                      }}
                    >
                      <Clock className="w-4 h-4 text-yellow-600" />
                    </motion.div>
                    <span className="text-sm font-medium text-slate-700">Em Progresso</span>
                  </div>
                  <motion.p 
                    className="text-2xl font-bold text-slate-900 mt-1"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.45,
                      ease: [0.4, 0.0, 0.2, 1]
                    }}
                  >
                    0
                  </motion.p>
                </motion.div>

                <motion.div 
                  className="bg-white rounded-lg p-3 border border-slate-200 hover:shadow-sm transition-shadow"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.3,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.4,
                        ease: [0.4, 0.0, 0.2, 1]
                      }}
                    >
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </motion.div>
                    <span className="text-sm font-medium text-slate-700">Prazo Hoje</span>
                  </div>
                  <motion.p 
                    className="text-2xl font-bold text-slate-900 mt-1"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.5,
                      ease: [0.4, 0.0, 0.2, 1]
                    }}
                  >
                    0
                  </motion.p>
                </motion.div>

                <motion.div 
                  className="bg-white rounded-lg p-3 border border-slate-200 hover:shadow-sm transition-shadow"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.35,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.45,
                        ease: [0.4, 0.0, 0.2, 1]
                      }}
                    >
                      <BarChart3 className="w-4 h-4 text-purple-600" />
                    </motion.div>
                    <span className="text-sm font-medium text-slate-700">Total de Cards</span>
                  </div>
                  <motion.p 
                    className="text-2xl font-bold text-slate-900 mt-1"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.55,
                      ease: [0.4, 0.0, 0.2, 1]
                    }}
                  >
                    0
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
