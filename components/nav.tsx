"use client";

import { useEffect, useState } from "react";
import { loadUser, loadUserFromCookie, User } from "@/utils/user";
import { Settings, Inbox, MenuIcon } from "lucide-react";
import LoadingSkeleton from "./LoadingSkeleton";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose, DialogOverlay } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'

export default function NavBar() {
  const [user, setUser] = useState<User>();
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter()

  useEffect(() => {
    async function fetchUser() {
      const loadedUser = loadUserFromCookie();
      if (loadedUser) {
        setUser(loadedUser);
      } else {
        const loadedUserFromBackend = await loadUser(); 
        if (loadedUserFromBackend) {
          setUser(loadedUserFromBackend);
        } else {
          router.push('/auth/login', { scroll: false })
        }
      }
    }
    fetchUser();
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
          <Popover>
            <PopoverTrigger
              className="flex justify-center items-center w-9 h-9 rounded-lg border border-[#d1d9e0] hover:bg-slate-100 transition-colors duration-200"
              title="Caixa de mensagens"
            >
              <Inbox className="w-5 h-5 text-slate-600 relative" />
              <div className="w-2 h-2 bg-red-500 rounded-full absolute translate-2 -translate-y-1.5"></div>
            </PopoverTrigger>
            <PopoverContent className="mx-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-sm leading-none font-semibold">Inbox</h2>
                <p className="text-xs text-muted-foreground">Suas últimas mensagens</p>
              </div>
              <div className="flex flex-col gap-2 h-9/10 overflow-y-scroll">

              </div>
            </PopoverContent>
          </Popover>
          <Dialog>
            <DialogTrigger
              className="flex justify-center items-center w-9 h-9 rounded-lg border border-[#d1d9e0] hover:bg-slate-100 transition-colors duration-200"
              title="Configurações"
            >
              <Settings className="w-5 h-5 text-slate-600" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configurações</DialogTitle>
                <DialogDescription>
                  Aqui você pode gerenciar as preferências da sua conta e
                  personalizar sua experiência no Seiri. As alterações serão
                  salvas automaticamente e não afetarão seus dados existentes.
                </DialogDescription>
              </DialogHeader>
              <DialogOverlay>olá</DialogOverlay>
              <div></div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="md:hidden flex items-center gap-2">
        <button
          className="flex justify-center items-center w-9 h-9 rounded-lg border border-[#d1d9e0] hover:bg-slate-100 transition-colors duration-200"
          title="Caixa de mensagens"
          onClick={() => setIsClicked(!isClicked)}
        >
          <MenuIcon className="w-6 h-6 text-slate-600" />
        </button>
        {isClicked && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            onClick={() => setIsClicked(false)}
          >
            <motion.div
              className="absolute top-0 right-0 w-64 h-full bg-white shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                mass: 0.8,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* TODO: comportamento do menu */}
              <motion.div
                className="p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.3,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
              >
                <motion.div
                  className="flex items-center gap-3 px-2 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.3,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                >
                  <div className="flex justify-center items-center w-9 h-9 bg-yellow-700 text-white rounded-md font-bold">
                    {user.firstName.charAt(0)}
                  </div>
                  <div className="flex flex-col leading-tight max-w-[160px] truncate">
                    <p className="text-sm font-medium truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-slate-500">Usuário Pioneiro</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.3,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                >
                  <motion.button
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-100 transition-colors"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Settings className="w-5 h-5 text-slate-600" />
                    <span className="text-sm">Configurações</span>
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-100 transition-colors"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Inbox className="w-5 h-5 text-slate-600" />
                    <span className="text-sm">Caixa de mensagens</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
