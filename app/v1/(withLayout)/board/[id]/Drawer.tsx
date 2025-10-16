"use client"
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Car, Clock, EllipsisVertical, GripVertical, Menu, RefreshCw, Save, SaveAll, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/api";
import { Card } from "../service/board";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import DivButton from "@/components/ui/divButton";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
interface Props { id: string; title: string; description?: string; }

export default function Drawer({ id, title, description }: Props) {
    const [card, setCard] = useState<Card | null>(null);

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        const dateFormatted = date.toLocaleDateString('pt-BR');
        const timeFormatted = date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        return { dateFormatted, timeFormatted };
    };

    const updateCard = async (updatedCard: Card) => {
        try {
            const cardToUpdate = updatedCard;
            const response = await api.put(`/api/v1/card/update/${cardToUpdate.id}`, cardToUpdate);
            console.log("Card atual: ", card);
            console.log(response);
            setCard(response.data);
            toast.success("Card atualizado com sucesso");

        } catch (error) {
            toast.error("Erro ao atualizar card");
        }
    };

    useEffect(() => {
        if (!id) {
            toast.error("ID do card não fornecido");
            return;
        }

        const loadCard = async () => {
            try {
                const fetchCardDetails = async () => {
                    const response = await api.get(`/api/v1/card/find/${id}`);
                    setCard(response.data);
                    console.log(response.data);
                };
                await fetchCardDetails();
            } catch (error) {
                toast.error("Erro ao carregar detalhes do card");
                return
            }
        };
        loadCard();
    }, [id]);
    //{card ? card.title : title}

    if (card !== null) {
        return (
            <Sheet>
                <SheetTrigger><div
                    key={id}
                    className="bg-slate-50 border p-3 rounded-md shadow-sm hover:bg-slate-200 cursor-pointer flex flex-row items-stretch"
                >
                    <div className="mr-2 flex flex-col justify-center">
                        <GripVertical className="text-slate-300 w-4 cursor-grab" />
                    </div>

                    {/* Card content */}
                    <div className="flex flex-col text-left justify-center">
                        <h3 className="text-sm font-medium text-slate-900 leading-tight max-w-[220px] truncate">
                            {card.title}
                        </h3>
                        <p className="text-xs text-slate-600 truncate">{card.description}</p>
                    </div>


                </div></SheetTrigger>
                <SheetContent className="md:w-4/10 max-w-6/10 p-6 overflow-y-scroll">
                    <SheetHeader className="flex flex-row gap-4 justify-between pt-4 pl-4 pr-4 pb-0">
                        <div className="flex flex-col gap-4">
                            <SheetTitle className="text-2xl md:text-4xl lg:text-5xl font-bold text-wrap tracking-tight">{card.title ?? title}</SheetTitle>
                            <SheetDescription className="text-lg text-wrap">
                                {card.description ?? description}
                            </SheetDescription>
                            <div className="flex flex-row items-center h-fit gap-8">
                                {card.createdDate && (
                                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wide">Criado em</span>
                                            <span className="font-medium text-slate-700 dark:text-slate-300">
                                                {formatDateTime(card.createdDate).dateFormatted} às {formatDateTime(card.createdDate).timeFormatted}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {card.updatedDate && (
                                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                        <RefreshCw className="w-4 h-4 text-amber-500" />
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wide">Atualizado em</span>
                                            <span className="font-medium text-slate-700 dark:text-slate-300">
                                                {formatDateTime(card.updatedDate).dateFormatted} às {formatDateTime(card.updatedDate).timeFormatted}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 h-fit">
                            <SheetClose asChild>
                                <Button className="w-10 h-10" variant="outline"><XIcon /></Button>
                            </SheetClose>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="w-10 h-10" variant="outline">
                                        <EllipsisVertical />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Detalhes</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <SheetClose asChild>
                                        <Button
                                            className="w-10 h-10"
                                            variant="outline"
                                            onClick={() => card && updateCard(card)}
                                        >
                                            <SaveAll />
                                        </Button>
                                    </SheetClose>

                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Salvar</p>
                                </TooltipContent>
                            </Tooltip>

                        </div>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 p-6">

                        {/** Card Details */}

                        <div className="flex flex-row gap-8 w-full">
                            {/** Dates  Start and Finish */}
                            <div className="flex flex-col gap-2">
                                {/** Avaliar se mantem o titulo */}
                                {/*<h3 className="text-lg font-semibold mb-2">Datas</h3> */}
                                <div className="flex flex-row w-fit gap-4 items-center justify-center">
                                    <div className="grid grid-rows-1 gap-1 w-fit">
                                        <p className="text-sm font-medium px-1 w-fit">Início</p>
                                        <Popover>
                                            <PopoverTrigger>
                                                <DivButton className="w-full items-center font-normal">
                                                    {card.startDate
                                                        ? new Date(card.startDate).toLocaleDateString()
                                                        : "--/--/----"}

                                                </DivButton>
                                            </PopoverTrigger>
                                            <PopoverContent>Place content for the popover here.</PopoverContent>
                                        </Popover>
                                    </div>
                                    {/* Ícone de até */}
                                    <p className="text-2xl text-muted-foreground font-bold mt-5">→</p>
                                    <div className="grid grid-rows-1 gap-1 w-fit">
                                        <p className="text-sm font-medium px-1 w-fit">Término</p>
                                        <Popover>
                                            <PopoverTrigger>
                                                <DivButton className="w-full items-center font-normal">
                                                    {card.endDate
                                                        ? new Date(card.endDate).toLocaleDateString()
                                                        : "--/--/----"}

                                                </DivButton>
                                            </PopoverTrigger>
                                            <PopoverContent>Place content for the popover here.</PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                            {/** Status and Priority */}
                            <div className="flex flex-row w-full">
                                <div className="grid grid-rows-1 gap-1 w-4/10">
                                    <p className="text-sm font-medium px-1 w-full">Status</p>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger><DivButton className="w-full">Open</DivButton></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Profile</DropdownMenuItem>
                                            <DropdownMenuItem>Billing</DropdownMenuItem>
                                            <DropdownMenuItem>Team</DropdownMenuItem>
                                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>

                        {/** Body */}
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                            <Textarea
                                className="resize-none overflow-y-auto h-44"
                                placeholder="Digite a descrição da tarefa..."
                                value={card.body ?? ""}
                                onChange={e => setCard({ ...card, body: e.target.value })}
                            />
                        </div>
                        {/** Tasks */}
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-semibold mb-2">Tarefas</h3>
                            <div className="w-full rounded-lg h-fit overflow-y-auto border border-slate-200 p-2 bg-slate-100">
                                {/* Mapeamento das tasks */}
                                {card.tasks?.map((task, index) => (
                                    <div key={index} className="text-sm text-wrap">
                                        {task.title}
                                    </div>
                                ))}
                                <Button className="w-full p-4" variant="outline" size="sm">Adicionar Tarefa</Button>
                            </div>
                        </div>
                    </div>
                    <SheetFooter>

                    </SheetFooter>
                </SheetContent>
            </Sheet>
        );
    } else return (<div>Loading...</div>);
}