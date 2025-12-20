"use client";

import { Button } from "@/components/ui/button";
import { useBoardStore } from "../store/useBoardStore";
import Link from "next/link";
import { useUserStore } from "@/app/v1/store/useUserStore";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    MoreHorizontal, Share2, Download, Settings, Users, Star, Copy,
    Archive, Trash2, Filter, ArrowLeft, StarOff,
    Search,
    Plus,
    Columns,
    RefreshCcw,
    Activity,
    Clock
} from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import DivButton from "@/components/ui/divButton";
import { Input } from "@/components/ui/input";

export default function BoardNavBar() {
    const board = useBoardStore(s => s.board);
    const isLoading = useBoardStore(s => s.isLoading);
    const { user } = useUserStore();
    const [isFavorited, setIsFavorited] = useState(false);

    const isColab = false; // TODO: determinar se o usuário é colaborador do board

    if (isLoading || !board) {
        return (
            <section className="px-8 py-6 flex flex-row justify-between items-center">
                <div className="h-16 w-64 bg-gray-100 animate-pulse rounded-3xl" />
                <div className="h-16 w-48 bg-gray-100 animate-pulse rounded-3xl" />
            </section>
        );
    }

    const getTotalTasks = () => {
        let total = 0;
        board.collumns.forEach((col) => {
            col.cards.forEach((card) => {
                total += card.numOfTasks;
            });
        });
        return total;
    }

    return (
        <section className="py-6 flex flex-row justify-between items-center gap-4">
            {/* Left side - Board info */}
            <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-3xl border border-gray-200 shadow-sm min-w-0 flex-1 max-w-2xl m-0">
                {/* Back button */}
                <Link
                    className="flex items-center justify-center h-10 w-10 rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0"
                    href="/v1/dashboard"
                    title="Voltar ao dashboard"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </Link>

                <div className="w-px h-10 bg-gray-200 flex-shrink-0" />

                {/* Board info - now editable */}
                <div className="flex flex-col min-w-0 flex-1">
                    <input
                        type="text"
                        defaultValue={board.title}
                        className="px-2 py-1 font-semibold text-base text-gray-800 bg-transparent border-none outline-none focus:ring-0 rounded-lg focus:outline-none focus:bg-gray-50 hover:bg-gray-100 -mx-1 truncate transition"
                        placeholder="Nome do board"
                    />

                    <input
                        type="text"
                        defaultValue={board.description}
                        className="px-2 py-1 text-gray-500 text-sm bg-transparent border-none outline-none focus:ring-0 focus:outline-none rounded-lg focus:bg-gray-50 hover:bg-gray-100 -mx-1 truncate transition"
                        placeholder="Adicione uma descrição..."
                    />


                </div>

                {/* Task quantity */}
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full flex-shrink-0">
                    <span className="text-sm font-medium text-gray-600">
                        {board.collumns.length} {getTotalTasks() === 1 ? 'tasks' : 'task'}
                    </span>
                </div>
            </div>

            {/* Right side - Actions and users */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-3xl border border-gray-200 shadow-sm">
                {/* Collaborators */}
                <div className="flex items-center -space-x-2">
                    {isColab && (
                        <button
                            className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-xs font-medium text-gray-600 ring-2 ring-white"
                            title="Adicionar membros"
                        >
                            +
                        </button>
                    )}
                    <UserAvatar
                        className="ring-2 ring-white hover:z-10 transition-all cursor-pointer"
                        user={user}
                    />

                </div>

                <div className="w-px h-10 bg-gray-200" />

                {/* Share button - promoted from menu */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gray-100 h-10 px-3 gap-2"
                    title="Compartilhar board"
                >
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Compartilhar</span>
                </Button>

                <div className="w-px h-10 bg-gray-200" />


                {/* Search */}
                <Dialog>
                    <DialogTrigger>
                        <DivButton
                            className="hover:bg-gray-100 h-10 w-10 p-0 bg-transparent border-0 shadow-none"
                        >
                            <Search className="w-5 h-5" />
                        </DivButton>
                    </DialogTrigger>
                    <DialogContent showCloseButton={false}
                        className="p-0 gap-0"
                    >
                        <DialogHeader className="sr-only">
                            <DialogTitle>Buscar no board</DialogTitle>
                            <DialogDescription>
                                Encontre cards rapidamente no board.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="w-full border-b gap-2 flex items-center px-4 h-12 py-2">
                            <DivButton
                                className="hover:bg-gray-100 h-10 w-10 p-0 bg-transparent border-0 shadow-none pointer-events-none"
                            >
                                <Search className="w-5 h-5" />
                            </DivButton>
                            <input
                                type="text"
                                placeholder="Buscar no board..."
                                className="w-full h-10 outline-none border-0 focus:ring-0 bg-transparent text-gray-800 placeholder:text-gray-400"
                            />
                        </div>
                        <div className="w-full px-4 py-2 flex items-center justify-center border-b m-0">
                            {/* Search results would go here */}
                            <p className="text-sm p-2 text-gray-500">Seus resultados aparecerão aqui.</p>
                        </div>
                        <div className="px-4 py-3 border-t">
                            {/* Footer or additional actions can go here */}
                            <p className="text-xs text-gray-400 mb-2">Quick actions</p>

                            <div className="flex flex-col gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start text-gray-700 hover:bg-gray-100 w-full"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Adicionar novo card
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start text-gray-700 hover:bg-gray-100 w-full"
                                >
                                    <Columns className="w-4 h-4 mr-2" />
                                    Gerenciar colunas
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start text-gray-700 hover:bg-gray-100 w-full"
                                >
                                    <RefreshCcw className="w-4 h-4 mr-2" />
                                    Atualizar board
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start text-gray-700 hover:bg-gray-100 w-full"
                                >
                                    <Archive className="w-4 h-4 mr-2" />
                                    Arquivar board
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Filter */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-gray-100 h-10 w-10 p-0"
                            title="Filtrar cards"
                        >
                            <Filter className="w-5 h-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-3" align="end">
                        <h3 className="font-semibold text-sm mb-3">Filtrar por</h3>
                        <div className="flex flex-col gap-2">
                            <Button variant="ghost" size="sm" className="justify-start">
                                Por etiqueta
                            </Button>
                            <Button variant="ghost" size="sm" className="justify-start">
                                Por membro
                            </Button>
                            <Button variant="ghost" size="sm" className="justify-start">
                                Por data
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Agenda */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10">
                    <Clock className="w-5 h-5" />
                </Button>


                {/* More options */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-gray-100 h-10 w-10 p-0"
                            title="Mais opções"
                        >
                            <MoreHorizontal className="w-5 h-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-2" align="end">
                        <div className="flex flex-col">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="justify-start text-slate-700 hover:bg-slate-100"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Exportar
                            </Button>
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
                                Gerenciar membros
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="justify-start text-slate-700 hover:bg-slate-100"
                            >
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicar board
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
        </section>
    );
}