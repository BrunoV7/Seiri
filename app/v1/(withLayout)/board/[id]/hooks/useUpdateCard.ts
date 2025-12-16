import api from "@/lib/api";
import { toast } from "sonner";
import { Card } from "../../service/board";

export function useUpdateCard(setCard: (card: Card) => void) {

    const updateCard = async (updatedCard: Card) => {
        try {
            const response = await api.put(`/api/card/v1/update/${updatedCard.id}`, updatedCard);
            setCard(response.data);
            toast.success("Card atualizado com sucesso");
        } catch (error) {
            toast.error("Erro ao atualizar card");
        }
    };

    return { updateCard };
}
