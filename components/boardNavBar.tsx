"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeleton";
import api from "@/lib/api";
import { toast } from "sonner";
import { useBoardContext } from "@/app/v1/(withLayout)/board/[id]/boardContext";
import { Board } from "@/app/v1/(withLayout)/board/service/board";
import { ChevronFirst, ChevronLeft } from "lucide-react";
import { User, loadUserFromCookie, loadUser } from "@/utils/user";
import { useRouter } from "next/navigation";
import { Avatar } from "@radix-ui/react-avatar";
import UserAvatar from "./UserAvatar";

export default function BoardNavBar() {
  const { board, setBoard } = useBoardContext();
  const [user, setUser] = useState<User>();
  const [isClicked, setIsClicked] = useState(false);
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
      toast.success("Pronto! Seu quadro já tem o novo título.")
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
                      if(e.key == "Enter"){
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
      <div className="flex items-center justify-center ">
        <UserAvatar className="-mr-2" user={null} />
        <UserAvatar user={user} />
      </div>
    </div>
  );
}
