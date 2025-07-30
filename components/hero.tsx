import Header from "./header";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="h-dvh w-full">
      <Header></Header>
      <div className="px-8 lg:px-32 py-24 text-center md:max-w-230">
        <h2 className="text-4xl md:text-5xl md:text-left font-semibold tracking-tight text-neutral-900">
          Simples como um post-it. Poderoso como você precisa.
        </h2>
        <h3 className="text-lg md:text-xl md:text-left text-neutral-700 font-light mt-4 max-w-3xl">
          Um jeito inteligente e visual de manter suas tarefas em ordem. Rápido,
          leve e gratuito.
        </h3>
      </div>
      <div className="px-8 lg:px-32 flex gap-2 md:gap-8 flex-col md:flex-row">
        <Button
          size="lg"
          type="button"
          className="bg-[#FFE301] text-black hover:bg-[#f5d900] transition-colors"
        >
          <a href="#">Comece agora</a>
        </Button>

        <Button
          size="lg"
          type="button"
          className="bg-transparent border border-neutral-300 text-neutral-800 hover:bg-neutral-100 transition-colors"
        >
          <a href="">Saiba mais</a>
        </Button>
      </div>
    </section>
  );
}
