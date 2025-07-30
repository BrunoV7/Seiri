import { Button } from "./ui/button";

export default function Cta() {
    return (
        <section className="flex flex-col px-6 md:px-16 lg:px-32 py-24 bg-[#FFF9DB] justify-center align-center">
            <div className="flex flex-col gap-2 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Comece a organizar suas ideias com o Seiri.</h2>
                <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
                    100% gratuito. Sem anúncios. Código aberto.
                </p>
            </div>
            <div className="flex flex-col items-center justify-center mt-4">
                <Button
                    size="xl"
                    type="button"
                    className="bg-[#FFE301] text-black hover:bg-[#f5d900] transition-colors w-fit"
                >
                    <a href="#" className="font-semibold">Crie sua conta gratuitamente</a>
                </Button>
            </div>
        </section>
    )
}