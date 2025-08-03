import { DollarSign, LayoutDashboard, Zap } from "lucide-react";

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center mb-3 w-fit bg-yellow-200 p-2 rounded-md">
            <LayoutDashboard className="w-6 h-6 text-yellow-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Organização visual</h3>
          <p className="text-neutral-600">
            Use blocos, quadros e cartões para manter tudo em ordem
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center mb-3 w-fit bg-blue-200 p-2 rounded-md">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Simples e rápido</h3>
          <p className="text-neutral-600">
            Interface moderna, sem distrações. Foco total nas tarefas
            importantes.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center mb-3 w-fit bg-green-200 p-2 rounded-md">
            <DollarSign className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">100% gratuito</h3>
          <p className="text-neutral-600">
            Sem pegadinhas. Organize-se sem precisar gastar nada.
          </p>
        </div>
      </div>
    </section>
  );
}
