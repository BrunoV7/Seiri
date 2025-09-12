"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import React from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function CreateBoardPage() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter();

    const FormSchema = z.object({
        title: z.string().min(2, {
            message: "O título deve ter no mínimo 2 caracteres.",
        }),
        description: z.string().optional(),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    // valores em tempo real do formulário
    const title = form.watch("title");
    const description = form.watch("description");

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        try {
            const response = await api.post("/api/v1/board/new", data);

            toast.success("Quadro criado com sucesso!");
            router.push(`/v1/board/${response.data.id}`);
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Não foi possível criar o quadro."
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="flex flex-row h-full w-full">
            {/* Lado esquerdo - preview dinâmico */}
            <div className="w-2/3 h-full hidden md:flex flex-col items-center justify-center bg-slate-50 border-r">
                <div className="w-11/12 max-w-4xl bg-white rounded-lg shadow-sm border border-slate-200 h-[600px] flex flex-col">
                    {/* Header do preview */}
                    <div className="w-full px-6 py-4 border-b border-slate-200 bg-white rounded-t-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    {title || "Meu Novo Quadro"}
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    {description || "Organize suas tarefas de forma visual e eficiente"}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Área do board */}
                    <div className="flex-1 p-6 bg-slate-50">
                        <div className="flex gap-4 h-full">
                            {/* Coluna 1 - A Fazer */}
                            <div className="flex-1 bg-white rounded-lg border border-slate-200 p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-medium text-slate-700 text-sm">A Fazer</h3>
                                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">3</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                                        <h4 className="text-sm font-medium text-slate-800">Planejar projeto</h4>
                                        <p className="text-xs text-slate-600 mt-1">Definir escopo e cronograma</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                            <span className="text-xs text-slate-500">Hoje</span>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                                        <h4 className="text-sm font-medium text-slate-800">Reunião com cliente</h4>
                                        <p className="text-xs text-slate-600 mt-1">Alinhar expectativas</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            <span className="text-xs text-slate-500">Amanhã</span>
                                        </div>
                                    </div>
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                                        <h4 className="text-sm font-medium text-slate-800">Criar wireframes</h4>
                                        <p className="text-xs text-slate-600 mt-1">Estrutura básica da interface</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                            <span className="text-xs text-slate-500">Esta semana</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Coluna 2 - Em Progresso */}
                            <div className="flex-1 bg-white rounded-lg border border-slate-200 p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-medium text-slate-700 text-sm">Em Progresso</h3>
                                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">2</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                                        <h4 className="text-sm font-medium text-slate-800">Desenvolver API</h4>
                                        <p className="text-xs text-slate-600 mt-1">Endpoints principais</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                            <span className="text-xs text-slate-500">Em andamento</span>
                                        </div>
                                    </div>
                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                                        <h4 className="text-sm font-medium text-slate-800">Testes unitários</h4>
                                        <p className="text-xs text-slate-600 mt-1">Cobertura de 80%</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                            <span className="text-xs text-slate-500">Quase pronto</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Coluna 3 - Concluído */}
                            <div className="flex-1 bg-white rounded-lg border border-slate-200 p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-medium text-slate-700 text-sm">Concluído</h3>
                                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">1</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 opacity-75">
                                        <h4 className="text-sm font-medium text-slate-600 line-through">Setup inicial</h4>
                                        <p className="text-xs text-slate-500 mt-1">Configuração do ambiente</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                                            <span className="text-xs text-slate-400">Ontem</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lado direito - formulário */}
            <div className="w-full md:w-1/3 h-full flex flex-col items-center justify-center p-8 gap-6 bg-white">
                <div className="text-center w-full max-w-sm">
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Novo Quadro</h1>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Crie seu quadro e organize suas tarefas de forma rápida e visual.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full space-y-6"
                        >
                            {/* Campo Título */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-slate-700">Título</FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                placeholder="Título do quadro"
                                                disabled={isLoading}
                                                className="border-slate-200 focus:border-[#FFE301] focus:ring-[#FFE301]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="text-xs text-slate-500">
                                            Digite o título do seu quadro.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Campo Descrição */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-slate-700">Descrição</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Descrição do quadro (opcional)"
                                                disabled={isLoading}
                                                className="border-slate-200 focus:border-[#FFE301] focus:ring-[#FFE301]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="text-xs text-slate-500">
                                            Escreva uma breve descrição para identificar seu quadro.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Botão */}
                            <Button
                                className="w-full bg-[#FFE301] text-slate-900 hover:bg-[#f5d900] transition-colors font-medium"
                                size="lg"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Icons.spinner className="h-4 w-4 animate-spin mr-2" />
                                ) : null}
                                {isLoading ? "Criando..." : "Criar Quadro"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
}
