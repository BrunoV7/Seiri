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
import { SidebarMenuButton } from "./ui/sidebar";

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
    <div className="w-full border-b border-slate-200 p-2 px-1 md:px-8 flex flex-row justify-between">
      <div className="flex">
        <button
          className="flex justify-center items-center w-9 h-9 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          title="Caixa de mensagens"
        >
          <ChevronLeft className="w-6 h-6 text-slate-600" />
        </button>
        {board && (
          <div className="flex items-center gap-3 px-2">
            <div className="flex flex-col leading-tight max-w-[300px] truncate">
              {isClicked ? (
                <div>
                  <input
                    className="text-sm font-medium truncate border-none focus:border-none"
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
                  />
                </div>
              ) : (
                <p
                  className="text-sm font-medium truncate"
                  onClick={() => setIsClicked(!isClicked)}
                >
                  {board.title}
                </p>
              )}
              <p className="text-xs text-slate-500">{board.description}</p>
            </div>
          </div>
        )}
      </div>
      <div></div>
      <div className="flex items-center justify-center gap-2">
        <div>
          {isColab && <UserAvatar className="-mr-2" user={null} />}
          <UserAvatar user={user} />
        </div>
        <Popover>
          <PopoverTrigger
            className="flex bg-white justify-center items-center w-9 h-9 rounded-lg border border-[#d1d9e0] hover:bg-slate-100 transition-colors duration-200"
            title="Filtros"
          >
            <Filter
              className={`w-4 h-4 text-slate-600 ${
                filter.length > 0 ? "text-yellow-500" : ""
              }`}
            />
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Filtros</h2>
                <button
                  className="text-xs text-slate-500 hover:text-slate-700"
                  onClick={() => {
                    setFilter([]);
                    setFilteredBoard(null);
                    setIsActive(false);
                  }}
                >
                  Limpar
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-700 mb-2 block">
                    Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: "PLANNED", label: "Planejado" },
                      { key: "IN_PROGRESS", label: "Em Progresso" },
                      { key: "FINISHED", label: "Concluído" },
                    ].map((status) => (
                      <button
                        key={status.key}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                          filter.includes(status.key)
                            ? "bg-yellow-500 text-white border-yellow-500"
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
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 mb-2 block">
                    Data
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <input
                      type="date"
                      className="px-3 py-1.5 text-xs rounded border border-slate-200 focus:border-yellow-500 focus:outline-none"
                      placeholder="Data início"
                      onChange={(e) => {
                        const newFilters = [
                          ...filter.filter((f) => !f.includes("startDate")),
                          `startDate:${e.target.value}`,
                        ];
                        setFilter(newFilters);
                      }}
                    />
                    <input
                      type="date"
                      className="px-3 py-1.5 text-xs rounded border border-slate-200 focus:border-yellow-500 focus:outline-none"
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
        <Popover>
          <PopoverTrigger
            className="flex bg-white justify-center items-center w-9 h-9 rounded-lg border border-[#d1d9e0] hover:bg-slate-100 transition-colors duration-200"
            title="Filtros"
          >
            <EllipsisVertical
              className={`w-4 h-4 text-slate-600 ${
                filter.length > 0 ? "text-yellow-500" : ""
              }`}
            />
          </PopoverTrigger>
          <PopoverContent>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="">
                    <h3></h3>
                  </div>
                </div>
              </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
