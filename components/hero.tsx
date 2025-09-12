import Link from "next/link";
import Header from "./header";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="w-full">
      <Header></Header>
      <div className="px-8 lg:px-32 py-24 text-center md:max-w-230 pb-12">
        <h2 className="text-4xl md:text-6xl md:text-left font-semibold tracking-tight text-neutral-900">
          Simples como um post-it. Poderoso como você precisa.
        </h2>
        <h3 className="text-lg md:text-2xl md:text-left text-neutral-700 font-medium mt-4 max-w-3xl">
          Um jeito inteligente e visual de manter suas tarefas em ordem. Rápido,
          leve e gratuito.
        </h3>
      </div>
      <div className="px-8 lg:px-32 flex gap-2 md:gap-8 flex-col md:flex-row">
        <Link className="font-semibold" href="/auth/register">
          <Button
            size="lg"
            type="button"
            className="bg-[#FFE301] text-black hover:bg-[#f5d900] transition-colors w-full"
          >
            Comece agora
          </Button>
        </Link>
        <Link href="/features">
          <Button
            size="lg"
            type="button"
            className="bg-transparent border border-neutral-300 text-neutral-800 hover:bg-neutral-100 transition-colors"
          >
            <span className="font-semibold">
              Saiba mais
            </span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
