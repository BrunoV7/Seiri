
export default function About() {
    return (
        <section id="sobre" className="flex flex-col px-6 md:px-16 lg:px-32 py-24 justify-center align-center">
            <div className="flex flex-col gap-2 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Sobre o projeto</h2>
                <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
                    O Seiri nasceu como um projeto pessoal criado por estudantes apaixonados por tecnologia e design.
                    Foi idealizado para resolver um problema real: organizar tarefas de forma simples, visual e agradável.
                    Hoje, evoluiu para uma ferramenta gratuita, feita com carinho, código limpo e foco total na experiência do usuário.
                </p>
                <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
                    “Seiri” vem do japonês 整理 — colocar as coisas em ordem.
                </p>
            </div>
        </section>
    )
}