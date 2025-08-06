"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import BoardPreview from "@/components/boardPreview";
import { useUserContext } from "../UserContext";
import router from "next/router";
import { toast } from "sonner";
import { LayoutDashboard, Settings } from "lucide-react";
import { loadUser, User } from "@/utils/user";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Cookies from "js-cookie";

type Board = {
  id: string;
  title: string;
  description: string;
  collumn_quantity: number;
};

export default function Dashboard() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const response = await api.get("/api/v1/board/find/all");
        setBoards(response.data);
      } catch (error: any) {
        console.error("Erro ao carregar boards", error);
      }
    };
    const fetchUser = async () => {
      try {
        const user = await loadUser();
        if (!user) {
          router.push("/auth/login");
        } else {
          Cookies.set("seiri_user", JSON.stringify(user), {
            path: "/",
            secure: false,
            sameSite: "Lax",
          });
          router.push("/v1/dashboard");
        }
      } catch (error) {
        toast.error("Não foi possível carregar o seu perfil.");
        router.push("/auth/login");
      }
    };
    loadBoards();
    fetchUser();
  }, []);

  if (!user) return <LoadingSkeleton />;

  return (
    <section>
      <div className="p-3 pl-8 pr-8 flex flex-row justify-between">
        <h1 className="text-xl font-bold text-slate-900">
          Bem-vindo, {user.firstName}!
        </h1>
        <div className="flex flex-row gap-2">
          <div className="rounded-md gap-2 flex flex-row">
            <div className="flex flex-row gap-2 items-center p-2">
              <div className="flex justify-center items-center w-10 h-10 bg-yellow-900 rounded-md text-white font-semibold">
                <p>{user.firstName.charAt(0)}</p>
              </div>
              <div>
                <p className="text-md font-medium truncate max-w-[200px]">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Usuário Pioneiro
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center p-2">
              <div className="flex justify-center items-center w-10 h-10 rounded-md border  text-white font-semibold">
                <Settings color="#e5e5e5"></Settings>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm text-neutral-600 mb-6">
          Aqui estão os seus boards:
        </p>
      </div>
      <ul>
        {boards.map((board) => (
          <BoardPreview key={board.id} board={board} />
        ))}
      </ul>
    </section>
  );
}
