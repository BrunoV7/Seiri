"use client";
import { Icons } from "@/components/ui/icons";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import React from "react";
import { useRouter } from 'next/navigation'
import { useUserContext } from "./UserContext";
import { da, tr } from "zod/v4/locales";
import api from "@/lib/api";
import { toast } from "sonner";

type User = {
    firstName: string,
    lastName: string,
    email: string
}

export default function LoadingPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const { user } = useUserContext();
  const { setUser } = useUserContext();
  const router = useRouter();

  const inspiringPhrases = [
  "clareza traz tranquilidade",
  "organizar é o primeiro passo",
  "você no controle da sua rotina",
  "menos caos, mais foco",
  "cada post-it é um passo",
  "produtividade com leveza",
  "organizar é cuidar de si",
  "priorize com propósito"
];

  React.useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await api.get("/api/v1/sc/user/info");
      const loadedUser: User = response.data;
      setUser(loadedUser);
      router.push("/v1/dashboard");
    } catch (error) {
      toast.error(
        "Não foi possível fazer login com o seu perfil."
      );
      router.push("/auth/login");
    }
  };

  fetchUser();
}, []);


  return (
    <section className="flex flex-col items-center justify-center w-full py-24 h-dvh transition-all">
      <div className="flex flex-col items-center justify-center h-full gap-8 animate-fade-in">
        <div className="animate-zoom-in">
          <svg
            width="78"
            height="80"
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
        </div>
        <Icons.spinner className="h-8 w-8 text-yellow-600 animate-spin drop-shadow-sm" />
        <ContainerTextFlip
          words={inspiringPhrases}
        />
      </div>
    </section>
  );
}
