import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full px-8 lg:px-32 py-6 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <svg
              width="28"
              height="30"
              viewBox="0 0 75 99"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M70.9335 35.5211C70.9335 14.4228 70.9335 7.7088 70.9335 5.68055C70.9335 5.14982 70.5034 5.10191 69.997 5.21977L4.75976 20.4062C4.34477 20.5028 3.99219 20.9544 3.99219 21.3894V21.3894V94.2456C3.99219 94.3607 4.07669 94.4325 4.18591 94.4136C12.2928 93.0152 15.5099 91.8361 30.7616 88.2228M70.9335 35.5211C70.9335 70.1015 53.0414 83.0289 34.437 87.3598C33.1381 87.6621 31.9154 87.9494 30.7616 88.2228M70.9335 35.5211C70.7272 41.7674 61.5615 56.6057 47.8217 57.1133C51.124 69.9832 43.7075 85.2017 30.7616 88.2228"
                stroke="black"
                strokeWidth="8.35443"
              />
            </svg>
            <span className="font-semibold text-xl text-neutral-900 tracking-tight">
              Seiri
            </span>
          </Link>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="bg-[#FFE301] text-black hover:bg-[#f5d900]">
                Começar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-8 lg:px-32 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900 mb-6">
          Organize suas ideias com clareza
        </h1>
        <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto mb-12">
          Descubra como o Seiri pode transformar sua produtividade com ferramentas visuais intuitivas e poderosas.
        </p>
      </section>

      {/* Features Grid */}
      <section className="px-8 lg:px-32 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#FFE301] rounded-lg flex items-center justify-center mb-4">
              <Icons.check className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">
              Interface Visual Intuitiva
            </h3>
            <p className="text-neutral-600">
              Organize suas tarefas em colunas visuais, arraste e solte para reorganizar, e veja seu progresso de forma clara.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#FFE301] rounded-lg flex items-center justify-center mb-4">
              <Icons.spinner className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">
              Sincronização em Tempo Real
            </h3>
            <p className="text-neutral-600">
              Suas tarefas são sincronizadas automaticamente entre todos os seus dispositivos, sempre atualizadas.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#FFE301] rounded-lg flex items-center justify-center mb-4">
              <Icons.gitHub className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">
              Gratuito e Open Source
            </h3>
            <p className="text-neutral-600">
              Acesse todas as funcionalidades sem pagar nada. Código aberto e transparente para a comunidade.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#FFE301] rounded-lg flex items-center justify-center mb-4">
              <Icons.react className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">
              Tecnologia Moderna
            </h3>
            <p className="text-neutral-600">
              Construído com as melhores tecnologias web: Next.js, React, TypeScript e Tailwind CSS.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#FFE301] rounded-lg flex items-center justify-center mb-4">
              <Icons.tailwind className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">
              Design Responsivo
            </h3>
            <p className="text-neutral-600">
              Funciona perfeitamente em desktop, tablet e mobile. Acesse suas tarefas de qualquer lugar.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-6 border border-neutral-200 rounded-lg hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#FFE301] rounded-lg flex items-center justify-center mb-4">
              <Icons.radix className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-3">
              Acessibilidade
            </h3>
            <p className="text-neutral-600">
              Interface acessível para todos os usuários, seguindo as melhores práticas de UX/UI.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 lg:px-32 py-16 bg-neutral-50">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">
            Pronto para organizar sua vida?
          </h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já transformaram sua produtividade com o Seiri.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Link href="/auth/register">
              <Button size="lg" className="bg-[#FFE301] text-black hover:bg-[#f5d900]">
                Começar agora
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-8 lg:px-32 py-10 border-t border-neutral-200 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex items-center gap-3">
            <svg
              width="28"
              height="30"
              viewBox="0 0 75 99"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M70.9335 35.5211C70.9335 14.4228 70.9335 7.7088 70.9335 5.68055C70.9335 5.14982 70.5034 5.10191 69.997 5.21977L4.75976 20.4062C4.34477 20.5028 3.99219 20.9544 3.99219 21.3894V21.3894V94.2456C3.99219 94.3607 4.07669 94.4325 4.18591 94.4136C12.2928 93.0152 15.5099 91.8361 30.7616 88.2228M70.9335 35.5211C70.9335 70.1015 53.0414 83.0289 34.437 87.3598C33.1381 87.6621 31.9154 87.9494 30.7616 88.2228M70.9335 35.5211C70.7272 41.7674 61.5615 56.6057 47.8217 57.1133C51.124 69.9832 43.7075 85.2017 30.7616 88.2228"
                stroke="black"
                strokeWidth="8.35443"
              />
            </svg>
            <span className="font-semibold text-lg text-neutral-900 tracking-tight">
              Seiri
            </span>
          </div>

          <div className="text-sm text-neutral-600 flex flex-col gap-1">
            <p>整理 — Seiri: colocar as coisas em ordem.</p>
            <div className="flex gap-4 text-neutral-500">
              <a href="https://github.com/BrunoV7" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition">
                GitHub
              </a>
              <Link href="/privacy" className="hover:text-neutral-900 transition">
                Política de Privacidade
              </Link>
            </div>
            <p className="text-xs mt-2 text-neutral-400">© 2025 Seiri. Projeto open source feito com ❤️ por Bruno Vieira.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 