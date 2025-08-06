import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
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
            Política de Privacidade
          </h1>
          <p className="text-lg text-neutral-600">
            Última atualização: 3 de agosto de 2025
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              1. Informações que Coletamos
            </h2>
            <p className="text-neutral-700 mb-4">
              Coletamos apenas as informações necessárias para fornecer nossos serviços:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 mb-4">
              <li><strong>Informações de conta:</strong> nome, email e senha</li>
              <li><strong>Dados de uso:</strong> como você interage com o aplicativo</li>
              <li><strong>Informações técnicas:</strong> tipo de dispositivo, navegador e sistema operacional</li>
              <li><strong>Cookies:</strong> para manter você logado e melhorar a experiência</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              2. Como Usamos Suas Informações
            </h2>
            <p className="text-neutral-700 mb-4">
              Usamos suas informações para:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 mb-4">
              <li>Fornecer e manter nossos serviços</li>
              <li>Autenticar sua identidade</li>
              <li>Melhorar a funcionalidade do aplicativo</li>
              <li>Enviar notificações importantes sobre o serviço</li>
              <li>Prevenir fraudes e garantir a segurança</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              3. Compartilhamento de Dados
            </h2>
            <p className="text-neutral-700 mb-4">
              <strong>Não vendemos, alugamos ou compartilhamos suas informações pessoais</strong> com terceiros, 
              exceto nas seguintes situações:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 mb-4">
              <li>Com seu consentimento explícito</li>
              <li>Para cumprir obrigações legais</li>
              <li>Para proteger nossos direitos e segurança</li>
              <li>Com provedores de serviços que nos ajudam a operar o aplicativo</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              4. Segurança dos Dados
            </h2>
            <p className="text-neutral-700 mb-4">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 mb-4">
              <li>Criptografia de dados em trânsito e em repouso</li>
              <li>Autenticação segura com tokens JWT</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backups regulares dos dados</li>
              <li>Controle de acesso rigoroso</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              5. Seus Direitos
            </h2>
            <p className="text-neutral-700 mb-4">
              Você tem os seguintes direitos relacionados aos seus dados:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 mb-4">
              <li><strong>Acesso:</strong> solicitar uma cópia dos seus dados pessoais</li>
              <li><strong>Correção:</strong> atualizar informações incorretas</li>
              <li><strong>Exclusão:</strong> solicitar a remoção dos seus dados</li>
              <li><strong>Portabilidade:</strong> receber seus dados em formato legível</li>
              <li><strong>Oposição:</strong> opor-se ao processamento dos seus dados</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              6. Cookies e Tecnologias Similares
            </h2>
            <p className="text-neutral-700 mb-4">
              Usamos cookies para:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 mb-4">
              <li>Manter você logado durante sua sessão</li>
              <li>Lembrar suas preferências</li>
              <li>Analisar como você usa o aplicativo</li>
              <li>Melhorar a performance e funcionalidade</li>
            </ul>
            <p className="text-neutral-700 mb-4">
              Você pode controlar o uso de cookies através das configurações do seu navegador.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              7. Retenção de Dados
            </h2>
            <p className="text-neutral-700 mb-4">
              Mantemos suas informações apenas pelo tempo necessário para:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 mb-4">
              <li>Fornecer nossos serviços</li>
              <li>Cumprir obrigações legais</li>
              <li>Resolver disputas</li>
              <li>Fazer cumprir nossos acordos</li>
            </ul>
            <p className="text-neutral-700 mb-4">
              Quando você exclui sua conta, removemos seus dados pessoais dentro de 30 dias.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              8. Transferências Internacionais
            </h2>
            <p className="text-neutral-700 mb-4">
              Como o Seiri é um projeto open source, seus dados podem ser processados em diferentes 
              países dependendo de onde o serviço está hospedado. Garantimos que todas as transferências 
              de dados seguem as melhores práticas de segurança.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              9. Menores de Idade
            </h2>
            <p className="text-neutral-700 mb-4">
              O Seiri não é destinado a menores de 13 anos. Não coletamos intencionalmente informações 
              pessoais de crianças menores de 13 anos. Se você é pai ou responsável e acredita que seu 
              filho nos forneceu informações pessoais, entre em contato conosco.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              10. Alterações na Política
            </h2>
            <p className="text-neutral-700 mb-4">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre 
              mudanças significativas através do aplicativo ou por email. O uso continuado do serviço 
              após as alterações constitui aceitação da nova política.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              11. Contato
            </h2>
            <p className="text-neutral-700 mb-4">
              Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados, 
              entre em contato conosco através do nosso repositório no GitHub ou por email.
            </p>
          </section>
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-neutral-50 rounded-lg text-center">
          <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
            Sua privacidade é importante para nós
          </h3>
          <p className="text-neutral-700 mb-6">
            Agora que você conhece nossa política de privacidade, sinta-se seguro para usar o Seiri.
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
              <Link href="/terms" className="hover:text-neutral-900 transition">
                Termos de Serviço
              </Link>
            </div>
            <p className="text-xs mt-2 text-neutral-400">© 2025 Seiri. Projeto open source feito com ❤️ por Bruno Vieira.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 