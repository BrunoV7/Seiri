import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
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

      {/* Content */}
      <main className="px-8 lg:px-32 py-16 max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-6">
            Termos de Serviço
          </h1>
          <p className="text-lg text-neutral-600">
            Última atualização: 3 de agosto de 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              1. Aceitação dos Termos
            </h2>
            <p className="text-neutral-700 mb-4">
              Ao acessar e usar o Seiri, você concorda em cumprir e estar vinculado a estes Termos de Serviço. 
              Se você não concordar com qualquer parte destes termos, não poderá acessar o serviço.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              2. Descrição do Serviço
            </h2>
            <p className="text-neutral-700 mb-4">
              O Seiri é uma aplicação web de organização de tarefas que permite aos usuários criar, 
              gerenciar e organizar suas tarefas de forma visual e intuitiva. O serviço é fornecido 
              gratuitamente e é um projeto open source.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              3. Uso Aceitável
            </h2>
            <p className="text-neutral-700 mb-4">
              Você concorda em usar o Seiri apenas para fins legais e de acordo com estes Termos. 
              Você não deve:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 mb-4">
              <li>Usar o serviço para qualquer propósito ilegal ou não autorizado</li>
              <li>Interferir no funcionamento do serviço ou nos servidores</li>
              <li>Tentar acessar contas de outros usuários</li>
              <li>Transmitir vírus, malware ou código malicioso</li>
              <li>Violar direitos de propriedade intelectual</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              4. Privacidade e Dados
            </h2>
            <p className="text-neutral-700 mb-4">
              Sua privacidade é importante para nós. O uso de suas informações pessoais é regido 
              pela nossa Política de Privacidade, que faz parte destes Termos de Serviço.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              5. Propriedade Intelectual
            </h2>
            <p className="text-neutral-700 mb-4">
              O Seiri é um projeto open source licenciado sob a MIT License. O código fonte está 
              disponível publicamente e pode ser usado, modificado e distribuído de acordo com os 
              termos da licença.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              6. Limitação de Responsabilidade
            </h2>
            <p className="text-neutral-700 mb-4">
              O Seiri é fornecido "como está" sem garantias de qualquer tipo. Não nos responsabilizamos 
              por perda de dados, interrupções do serviço ou danos indiretos decorrentes do uso do serviço.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              7. Modificações dos Termos
            </h2>
            <p className="text-neutral-700 mb-4">
              Reservamo-nos o direito de modificar estes Termos a qualquer momento. As modificações 
              entrarão em vigor imediatamente após sua publicação. O uso continuado do serviço após 
              as modificações constitui aceitação dos novos termos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              8. Contato
            </h2>
            <p className="text-neutral-700 mb-4">
              Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco através 
              do nosso repositório no GitHub ou por email.
            </p>
          </section>
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-neutral-50 rounded-lg text-center">
          <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
            Pronto para começar?
          </h3>
          <p className="text-neutral-700 mb-6">
            Aceite os termos e comece a organizar suas tarefas com o Seiri.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Link href="/auth/register">
              <Button size="lg" className="bg-[#FFE301] text-black hover:bg-[#f5d900]">
                Criar conta
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline">
                Fazer login
              </Button>
            </Link>
          </div>
        </div>
      </main>

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