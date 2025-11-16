import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { Card } from "../../service/board";


export function useCard(id: string) {
    const [card, setCard] = useState<Card | null>(null);

    useEffect(() => {
        if (!id) {
            toast.error("ID do card não fornecido");
            return;
        }

        const fetchCardDetails = async () => {
            try {
                const response = await api.get(`/api/v1/card/find/${id}`);
                setCard(response.data);
            } catch (error) {
                toast.error("Erro ao carregar detalhes do card");
            }
        };

        fetchCardDetails();
    }, [id]);

    return { card, setCard };
}
