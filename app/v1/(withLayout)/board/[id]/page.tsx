
"use client";

import { useState, useEffect } from "react";
import { useBoardContext } from "./boardContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, MoreHorizontal, Calendar, CheckSquare, Star, Edit, Trash2, Clock, AlertCircle, CheckCircle2, Archive } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import api from "@/lib/api";

export default function Board() {
    const { board, setBoard } = useBoardContext();
    const [isAddingColumn, setIsAddingColumn] = useState(false);
    const [newColumnName, setNewColumnName] = useState("");
    const [newCardName, setNewCardName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    // Card management states
    const [selectedCard, setSelectedCard] = useState<any>(null);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [isEditingCard, setIsEditingCard] = useState(false);
    const [editingCard, setEditingCard] = useState<any>(null);
    const [newTaskName, setNewTaskName] = useState("");
    const [isAddingTask, setIsAddingTask] = useState(false);

    // Load board data
    useEffect(() => {
        const loadBoard = async () => {
            if (board.id === "") {
                // For now, use mock data
                const mockBoard = {
                    id: "1",
                    title: "Projeto Seiri",
                    description: "Desenvolvimento da aplicação de gerenciamento de tarefas",
                    collumn_quantity: 0,
                    collumns: []
                };
                setBoard(mockBoard);
            } else {
                // TODO: Load real board data from API
                // const response = await api.get(`/api/v1/board/${board.id}`);
                // setBoard(response.data);
            }
        };

        loadBoard();
    }, [board.id, setBoard]);

    // Status tag utility
    const getStatusInfo = (status: string) => {
        switch (status) {
            case "BACKLOG":
                return {
                    label: "Backlog",
                    color: "bg-gray-100 text-gray-800 border-gray-200",
                    icon: Archive
                };
            case "PLANNED":
                return {
                    label: "Planejado",
                    color: "bg-blue-100 text-blue-800 border-blue-200",
                    icon: Clock
                };
            case "IN_PROGRESS":
                return {
                    label: "Em Progresso",
                    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
                    icon: AlertCircle
                };
            case "FINISHED":
                return {
                    label: "Concluído",
                    color: "bg-green-100 text-green-800 border-green-200",
                    icon: CheckCircle2
                };
            default:
                return {
                    label: "Backlog",
                    color: "bg-gray-100 text-gray-800 border-gray-200",
                    icon: Archive
                };
        }
    };

    // Card management functions
    const openCardModal = (card: any) => {
        setSelectedCard(card);
        setIsCardModalOpen(true);
    };

    const closeCardModal = () => {
        setSelectedCard(null);
        setIsCardModalOpen(false);
        setIsEditingCard(false);
        setEditingCard(null);
    };

    const startEditingCard = (card: any) => {
        setEditingCard({ ...card });
        setIsEditingCard(true);
    };

    const saveCardEdit = async () => {
        if (!editingCard) return;

        try {
            // TODO: API call to update card
            // await api.put(`/api/v1/card/${editingCard.id}`, editingCard);

            setBoard(prevBoard => ({
                ...prevBoard,
                collumns: prevBoard.collumns.map(column => ({
                    ...column,
                    cards: column.cards.map(card => 
                        card.id === editingCard.id ? editingCard : card
                    )
                }))
            }));

            setSelectedCard(editingCard);
            setIsEditingCard(false);
            setEditingCard(null);
            toast.success("Card atualizado com sucesso!");
        } catch (error: any) {
            toast.error("Erro ao atualizar card");
        }
    };

    const addTask = async (cardId: string) => {
        if (!newTaskName.trim()) {
            toast.error("Por favor, digite um nome para a tarefa");
            return;
        }

        try {
            // TODO: API call to create task
            // const response = await api.post(`/api/v1/task/new/${cardId}`, {
            //     title: newTaskName
            // });

            const newTask = {
                id: Date.now().toString(), // Temporary ID
                title: newTaskName,
                description: "",
                startDate: "",
                endDate: "",
                status: "PLANNED" as const,
                cardId: cardId
            };

            setBoard(prevBoard => ({
                ...prevBoard,
                collumns: prevBoard.collumns.map(column => ({
                    ...column,
                    cards: column.cards.map(card => 
                        card.id === cardId 
                            ? {
                                ...card,
                                tasks: [...card.tasks, newTask],
                                numOfTasks: card.numOfTasks + 1
                            }
                            : card
                    )
                }))
            }));

            setNewTaskName("");
            setIsAddingTask(false);
            toast.success("Tarefa adicionada com sucesso!");
        } catch (error: any) {
            toast.error("Erro ao adicionar tarefa");
        }
    };

    const toggleTaskStatus = (cardId: string, taskId: string) => {
        setBoard(prevBoard => ({
            ...prevBoard,
            collumns: prevBoard.collumns.map(column => ({
                ...column,
                cards: column.cards.map(card => 
                    card.id === cardId 
                        ? {
                            ...card,
                            tasks: card.tasks.map(task => 
                                task.id === taskId 
                                    ? {
                                        ...task,
                                        status: task.status === "FINISHED" ? "PLANNED" : "FINISHED"
                                    }
                                    : task
                            )
                        }
                        : card
                )
            }))
        }));
    };

    const addColumn = async () => {
        if (!newColumnName.trim()) {
            toast.error("Por favor, digite um nome para a coluna");
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post(`/api/v1/collumn/new/${board.id}`, {
                name: newColumnName
            });

            const newColumn = {
                id: response.data.id,
                name: newColumnName,
                card_quantity: 0,
                cards: [],
                board_id: board.id
            };

            setBoard({
                ...board,
                collumns: [...(board.collumns || []), newColumn],
                collumn_quantity: (board.collumn_quantity || 0) + 1
            });

            setNewColumnName("");
            setIsAddingColumn(false);
            toast.success("Coluna adicionada com sucesso!");
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Não foi possível criar a coluna."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const addCard = async (collumnId: string) => {
        if (!newCardName.trim()) {
            toast.error("Por favor, digite um nome para a tarefa");
            return;
        }
        try {
            const response = await api.post(`/api/v1/card/new/${collumnId}`, {
                title: newCardName
            });
            const newCard = {
                id: response.data.id,
                title: newCardName,
                description: "",
                startDate: "",
                endDate: "",
                status: "PLANNED" as const,
                numOfTasks: 0,
                tasks: []
            };

            // Update the board state with the new card
            setBoard(prevBoard => ({
                ...prevBoard,
                collumns: prevBoard.collumns.map(column =>
                    column.id === collumnId
                        ? {
                            ...column,
                            cards: [...column.cards, newCard],
                            card_quantity: column.card_quantity + 1
                        }
                        : column
                )
            }));

            setNewCardName("");
            toast.success("Card adicionado com sucesso!");
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Não foi possível criar o card."
            );
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-50">
            <div className="flex-1 p-6 overflow-x-auto overflow-y-auto">
                {!board.collumns || board.collumns.length === 0 ? (
                    // Empty State - No Columns
                    <div className="flex items-center justify-center h-full min-h-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Plus className="w-12 h-12 text-slate-400" />
                            </div>
                            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                                Nenhuma coluna encontrada
                            </h2>
                            <p className="text-slate-600 mb-8 max-w-md">
                                Comece organizando seu quadro criando sua primeira coluna.
                                Você pode adicionar quantas colunas precisar.
                            </p>

                            {isAddingColumn ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white rounded-lg border border-slate-200 p-6 max-w-md mx-auto"
                                >
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                                        Adicionar Nova Coluna
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-slate-700 mb-2 block">
                                                Nome da Coluna
                                            </label>
                                            <Input
                                                placeholder="Ex: A Fazer, Em Progresso, Concluído"
                                                value={newColumnName}
                                                onChange={(e) => setNewColumnName(e.target.value)}
                                                className="border-slate-200 focus:border-[#FFE301] focus:ring-[#FFE301]"
                                                autoFocus
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <Button
                                                onClick={addColumn}
                                                disabled={isLoading}
                                                className="flex-1 bg-[#FFE301] text-slate-900 hover:bg-[#f5d900] font-medium"
                                            >
                                                {isLoading ? (
                                                    <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-2" />
                                                ) : (
                                                    <Plus className="w-4 h-4 mr-2" />
                                                )}
                                                {isLoading ? "Criando..." : "Criar Coluna"}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setIsAddingColumn(false);
                                                    setNewColumnName("");
                                                }}
                                                className="border-slate-200"
                                            >
                                                Cancelar
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <Button
                                    onClick={() => setIsAddingColumn(true)}
                                    className="bg-[#FFE301] text-slate-900 hover:bg-[#f5d900] font-medium px-8 py-3 text-lg"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Adicionar Nova Coluna
                                </Button>
                            )}
                        </motion.div>
                    </div>
                ) : (
                    // Board with existing columns goes here
                    <div className="space-y-4">
                        {/* Add Column Form */}
                        {isAddingColumn && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-lg border border-slate-200 p-6 max-w-md"
                            >
                                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                                    Adicionar Nova Coluna
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-slate-700 mb-2 block">
                                            Nome da Coluna
                                        </label>
                                        <Input
                                            placeholder="Ex: A Fazer, Em Progresso, Concluído"
                                            value={newColumnName}
                                            onChange={(e) => setNewColumnName(e.target.value)}
                                            className="border-slate-200 focus:border-[#FFE301] focus:ring-[#FFE301]"
                                            autoFocus
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    addColumn();
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <Button
                                            onClick={addColumn}
                                            disabled={isLoading}
                                            className="flex-1 bg-[#FFE301] text-slate-900 hover:bg-[#f5d900] font-medium"
                                        >
                                            {isLoading ? (
                                                <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-2" />
                                            ) : (
                                                <Plus className="w-4 h-4 mr-2" />
                                            )}
                                            {isLoading ? "Criando..." : "Criar Coluna"}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setIsAddingColumn(false);
                                                setNewColumnName("");
                                            }}
                                            className="border-slate-200"
                                        >
                                            Cancelar
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div className="flex flex-row gap-4 overflow-x-auto overflow-y-auto">
                        {board.collumns.map((collumn) => (
                            <div
                                key={collumn.id}
                                className="w-[400px] h-fit bg-white rounded-lg p-4 border flex flex-col gap-4"
                            >
                                <h2>{collumn.name}</h2>

                                <div className="flex flex-col gap-3">
                                    {collumn.cards.map((card) => {
                                        const statusInfo = getStatusInfo(card.status);
                                        const StatusIcon = statusInfo.icon;
                                        const completedTasks = card.tasks.filter(task => task.status === "FINISHED").length;
                                        
                                        return (
                                            <motion.div
                                                key={card.id}
                                                whileHover={{ y: -2, shadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                                                className="bg-white border border-slate-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-200 group"
                                                onClick={() => openCardModal(card)}
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                            {card.title}
                                                        </h3>
                                                        {card.description && (
                                                            <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                                                                {card.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            startEditingCard(card);
                                                        }}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${statusInfo.color}`}>
                                                            <StatusIcon className="w-3 h-3" />
                                                            {statusInfo.label}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-3 text-xs text-slate-500">
                                                        {card.numOfTasks > 0 && (
                                                            <span className="flex items-center gap-1">
                                                                <CheckSquare className="w-3 h-3" />
                                                                {completedTasks}/{card.numOfTasks}
                                                            </span>
                                                        )}
                                                        {card.startDate && (
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="w-3 h-3" />
                                                                {new Date(card.startDate).toLocaleDateString('pt-BR')}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}

                                    <div className="flex flex-row justify-between p-2 gap-2 bg-slate-50 rounded-lg">
                                        <Input
                                            key={`card-input-${collumn.id}`}
                                            placeholder="Novo card"
                                            className="border-0 shadow-none flex-1"
                                            value={newCardName}
                                            onChange={(e) => setNewCardName(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    addCard(collumn.id);
                                                }
                                            }}
                                        />
                                        <Button
                                            onClick={() => addCard(collumn.id)}
                                            className="bg-[#FFE301] text-slate-900 hover:bg-[#f5d900] font-medium"
                                            disabled={!newCardName.trim()}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Add Column Button */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex-shrink-0"
                        >
                            <Button
                                variant="ghost"
                                className="w-[400px] h-12 border-2 border-dashed border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
                                onClick={() => setIsAddingColumn(true)}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Adicionar coluna
                            </Button>
                        </motion.div>
                        </div>
                    </div>

                )}
            </div>

            {/* Card Modal */}
            <Dialog open={isCardModalOpen} onOpenChange={closeCardModal}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        {isEditingCard ? "Editar Card" : "Detalhes do Card"}
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsEditingCard(!isEditingCard)}
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                {isEditingCard ? "Visualizar" : "Editar"}
                            </Button>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                {selectedCard && (
                    <div className="space-y-6">
                        {/* Card Header */}
                        <div className="space-y-4">
                            {isEditingCard ? (
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-slate-700 mb-1 block">
                                            Título
                                        </label>
                                        <Input
                                            value={editingCard?.title || ""}
                                            onChange={(e) => setEditingCard({...editingCard, title: e.target.value})}
                                            className="border-slate-200 focus:border-[#FFE301] focus:ring-[#FFE301]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-700 mb-1 block">
                                            Descrição
                                        </label>
                                        <textarea
                                            value={editingCard?.description || ""}
                                            onChange={(e) => setEditingCard({...editingCard, description: e.target.value})}
                                            className="w-full p-3 border border-slate-200 rounded-md focus:border-[#FFE301] focus:ring-[#FFE301] focus:outline-none"
                                            rows={3}
                                            placeholder="Adicione uma descrição..."
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <label className="text-sm font-medium text-slate-700 mb-1 block">
                                                Data de Início
                                            </label>
                                            <Input
                                                type="date"
                                                value={editingCard?.startDate || ""}
                                                onChange={(e) => setEditingCard({...editingCard, startDate: e.target.value})}
                                                className="border-slate-200 focus:border-[#FFE301] focus:ring-[#FFE301]"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-sm font-medium text-slate-700 mb-1 block">
                                                Data de Fim
                                            </label>
                                            <Input
                                                type="date"
                                                value={editingCard?.endDate || ""}
                                                onChange={(e) => setEditingCard({...editingCard, endDate: e.target.value})}
                                                className="border-slate-200 focus:border-[#FFE301] focus:ring-[#FFE301]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-700 mb-1 block">
                                            Status
                                        </label>
                                        <select
                                            value={editingCard?.status || "BACKLOG"}
                                            onChange={(e) => setEditingCard({...editingCard, status: e.target.value})}
                                            className="w-full p-3 border border-slate-200 rounded-md focus:border-[#FFE301] focus:ring-[#FFE301] focus:outline-none"
                                        >
                                            <option value="BACKLOG">Backlog</option>
                                            <option value="PLANNED">Planejado</option>
                                            <option value="IN_PROGRESS">Em Progresso</option>
                                            <option value="FINISHED">Concluído</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={saveCardEdit}
                                            className="bg-[#FFE301] text-slate-900 hover:bg-[#f5d900]"
                                        >
                                            Salvar Alterações
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setIsEditingCard(false);
                                                setEditingCard(null);
                                            }}
                                        >
                                            Cancelar
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900 mb-2">
                                        {selectedCard.title}
                                    </h2>
                                    {selectedCard.description && (
                                        <p className="text-slate-600 mb-4">{selectedCard.description}</p>
                                    )}
                                    
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        {(() => {
                                            const statusInfo = getStatusInfo(selectedCard.status);
                                            const StatusIcon = statusInfo.icon;
                                            return (
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 ${statusInfo.color}`}>
                                                    <StatusIcon className="w-4 h-4" />
                                                    {statusInfo.label}
                                                </span>
                                            );
                                        })()}
                                        
                                        {selectedCard.startDate && (
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(selectedCard.startDate).toLocaleDateString('pt-BR')}
                                            </span>
                                        )}
                                        
                                        {selectedCard.numOfTasks > 0 && (
                                            <span className="flex items-center gap-1">
                                                <CheckSquare className="w-4 h-4" />
                                                {selectedCard.tasks.filter((task: any) => task.status === "FINISHED").length}/{selectedCard.numOfTasks} tarefas
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tasks Section */}
                        <div className="border-t pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    Tarefas ({selectedCard.numOfTasks})
                                </h3>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsAddingTask(!isAddingTask)}
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Adicionar Tarefa
                                </Button>
                            </div>

                            {/* Add Task Form */}
                            {isAddingTask && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-4 p-4 bg-slate-50 rounded-lg"
                                >
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Nome da tarefa"
                                            value={newTaskName}
                                            onChange={(e) => setNewTaskName(e.target.value)}
                                            className="flex-1 border-slate-200 focus:border-[#FFE301] focus:ring-[#FFE301]"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    addTask(selectedCard.id);
                                                }
                                            }}
                                        />
                                        <Button
                                            onClick={() => addTask(selectedCard.id)}
                                            className="bg-[#FFE301] text-slate-900 hover:bg-[#f5d900]"
                                            disabled={!newTaskName.trim()}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setIsAddingTask(false);
                                                setNewTaskName("");
                                            }}
                                        >
                                            Cancelar
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Tasks List */}
                            <div className="space-y-2">
                                {selectedCard.tasks && selectedCard.tasks.length > 0 ? (
                                    selectedCard.tasks.map((task: any) => (
                                        <motion.div
                                            key={task.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                        >
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleTaskStatus(selectedCard.id, task.id)}
                                                className="p-1"
                                            >
                                                <CheckSquare 
                                                    className={`w-4 h-4 ${
                                                        task.status === "FINISHED" 
                                                            ? "text-green-600" 
                                                            : "text-slate-400"
                                                    }`} 
                                                />
                                            </Button>
                                            <div className="flex-1">
                                                <p className={`text-sm ${
                                                    task.status === "FINISHED" 
                                                        ? "line-through text-slate-500" 
                                                        : "text-slate-900"
                                                }`}>
                                                    {task.title}
                                                </p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                task.status === "FINISHED" 
                                                    ? "bg-green-100 text-green-800" 
                                                    : "bg-blue-100 text-blue-800"
                                            }`}>
                                                {task.status === "FINISHED" ? "Concluída" : "Pendente"}
                                            </span>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-slate-500">
                                        <CheckSquare className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                                        <p>Nenhuma tarefa adicionada ainda</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
            </Dialog>
        </div>
    );
}