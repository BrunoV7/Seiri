import { Button } from "@/components/ui/button";
import DivButton from "@/components/ui/divButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Plus, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { Card, useBoardContext } from "../boardContext";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";

type Status = { title: string; colorCode: string };

export default function DrawerBody({ card, setCard }: { card: any, setCard: any }) {
    const { board, setBoard } = useBoardContext();
    const [status, setStatus] = useState<Status>({ title: "", colorCode: "" });
    const [hovered, setHovered] = useState<string | null>(null);
    const [editStatus, setEditStatus] = useState("");
    const popOverItemClass = "flex items-center justify-between w-36 rounded-md border bg-background shadow-sm text-sm font-medium px-2 py-1";


    const saveStatus = async (name: string) => {
        if (name === null || name.trim() === "") {
            toast.error("Por favor, digite um nome para o status");
            return;
        }
        try {
            const response = await api.post(`/api/v1/card/status/create/${board.id}`, {
                title: name,
                colorCode: "#FFF8DB"
            });
            setBoard({ ...board, statuses: [...(board.statuses || []), response.data] });
            toast.success("Status salvo com sucesso");
        } catch (error) {
            toast.error("Erro ao salvar status");
        }
    };

    function adjustColor(color: string, amount: number) {
        return (
            '#' +
            color
                .replace(/^#/, '')
                .replace(/../g, (hex) =>
                    (
                        '0' +
                        Math.min(255, Math.max(0, parseInt(hex, 16) + amount)).toString(16)
                    ).slice(-2)
                )
        )
    }


    const updateCardStatus = async (statusId: string) => {
        try {
            if (!card) return;

            const response = await api.put(`/api/v1/card/update/${card.id}/status/${statusId}`, {
                statusId
            });
            setCard(response.data);
            toast.success("Status do card atualizado com sucesso");
        } catch (error) {
            toast.error("Erro ao atualizar status do card");
        }
    };




    return (
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
                            <DropdownMenuTrigger><DivButton className="w-full">{card.status?.title ? card.status.title : "Selecione um status"}</DivButton></DropdownMenuTrigger>
                            <DropdownMenuContent className="mx-19">
                                <DropdownMenuLabel>
                                    <p className="mx-2 mb-2">Crie um novo status</p>
                                    <div className="flex gap-2">
                                        <Input type="text" placeholder="Digite o status" onChange={(e) => setEditStatus(e.target.value)} />
                                        <Button disabled={editStatus?.length === 0} onClick={() => saveStatus(editStatus)}><Plus /></Button>
                                    </div></DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="grid grid-cols-3 p-2 gap-4">
                                    {board.statuses?.length ? (
                                        board.statuses.map((status) => (
                                            <div
                                                key={status.id}
                                                onMouseEnter={() => setHovered(status.id)}
                                                onMouseLeave={() => setHovered(null)}
                                                className={cn(popOverItemClass, "transition-all duration-200 ease-in-out cursor-pointer rounded-md")}
                                                style={{
                                                    backgroundColor: hovered === status.id
                                                        ? adjustColor(status.colorCode, -15)
                                                        : status.colorCode,
                                                    border: `1px solid ${adjustColor(status.colorCode, -40)}`,
                                                }}
                                            >

                                                <DropdownMenuItem className="flex-1 truncate text-left" onSelect={() => updateCardStatus(status.id)}>
                                                    {status.title}
                                                </DropdownMenuItem>

                                                <div className="flex items-center gap-1">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-7 w-7"
                                                                style={{
                                                                    ['--hover-bg' as any]: adjustColor(status.colorCode, -25)
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.backgroundColor = adjustColor(status.colorCode, -25);
                                                                    setHovered(null);
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.backgroundColor = '';
                                                                    setHovered(status.id);
                                                                }}
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-80 flex flex-col gap-4">
                                                            <h4 className="text-xm font-semibold">Editar Status</h4>
                                                            <div className="grid grid-cols-2 grid-rows-1">
                                                                <Input value={status.title} onChange={(e) => setStatus({ ...status, title: e.target.value })} />
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>

                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-7 w-7"
                                                                style={{
                                                                    ['--hover-bg' as any]: adjustColor(status.colorCode, -25)
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.backgroundColor = adjustColor(status.colorCode, -25);
                                                                    setHovered(null);
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.backgroundColor = '';
                                                                    setHovered(status.id);
                                                                }}
                                                            >
                                                                <Trash className="h-4 w-4" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-80">
                                                            {/* Conteúdo aqui */}
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </div>


                                        ))
                                    ) : (
                                        <p className="text-muted-foreground text-center p-2 text-sm">Adicione seu primeiro status!</p>
                                    )}
                                </div>

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
            {/** Tasks 
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold mb-2">Tarefas</h3>
                <div className="w-full rounded-lg h-fit overflow-y-auto border border-slate-200 p-2 bg-slate-100">
                    /* Mapeamento das tasks 
                    {card.tasks?.map((task: { title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
                        <div key={index} className="text-sm text-wrap">
                            {task.title}
                        </div>
                    ))}
                    <Button className="w-full p-4" variant="outline" size="sm">Adicionar Tarefa</Button>
                </div>
            </div>
            */}
        </div>
    )
}