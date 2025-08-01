
export default function Why() {
    return (
        <section className="px-6 md:px-16 lg:px-32 py-24 bg-white text-neutral-900 w-full gap-8 flex flex-col">
            <div className="flex flex-col gap-2 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                    Feito para quem quer clareza
                </h2>
                <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
                    O Seiri combina o poder do kanban com uma interface simples e fluida.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Organização visual</h3>
                    <p className="text-neutral-600">Use blocos, quadros e cartões para manter tudo em ordem — sem esforço.</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Simples e rápido</h3>
                    <p className="text-neutral-600">Interface moderna, sem distrações. Foco total nas tarefas importantes.</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">100% gratuito</h3>
                    <p className="text-neutral-600">Sem pegadinhas. Organize-se sem precisar gastar nada.</p>
                </div>
            </div>
        </section>
    )
}