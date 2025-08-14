import api from "@/lib/api"


export async function loadBoard(id: string) {
    try{
        const response = await api.get(`/api/v1/board/find/${id}`);
        console.log(response);
    } catch(error){
        console.log(error);
    }
}