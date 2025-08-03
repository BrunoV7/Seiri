import { ToyBrick } from "lucide-react";

export default function Features(){
    return(
        <section className="flex flex-col px-6 md:px-16 lg:px-32 py-24 justify-center align-center">
            <div className="flex flex-col gap-2 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                    Tudo o que você precisa para se organizar
                </h2>
                <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
                    Boards visuais, tarefas claras e controle total em um só lugar.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-7">
                <div className="p-4 bg-yellow-100 rounded-md border border-yellow-200">
                    <div className="flex flex-row gap-2">
                    <div className="flex flex-col">
                        <h3 className="text-lg text-neutral-700 font-semibold">Quadros personalizados</h3>
                        <p className="text-md text-neutral-500 font-medium">Crie e gerencie seus fluxos com colunas flexíveis.</p>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )   
}