export default function Footer() {
  return (
    <footer className="w-full px-6 py-10 border-t border-neutral-200 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
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
              <a href="/terms" className="hover:text-neutral-900 transition">Termos de Serviço</a>
              <a href="/privacy" className="hover:text-neutral-900 transition">Política de Privacidade</a>
            </div>
          <p className="text-xs mt-2 text-neutral-400">© 2025 Seiri. Projeto open source feito com ❤️ por Bruno Vieira.</p>
        </div>
      </div>
    </footer>
  );
}