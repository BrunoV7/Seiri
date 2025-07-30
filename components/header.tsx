import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="w-full p-3 pl-8 pr-8 justify-between flex pt-5 md:pt-4">
      <div className="flex gap-2 align-middle justify-start items-center">
        <svg
          width="28"
          height="30    "
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
      <div className="flex gap-8">
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700 font-bold">
          <a href="#features" className="hover:text-black transition">
            Funcionalidades
          </a>
          <a href="#sobre" className="hover:text-black transition">
            Sobre
          </a>
          <a href="#contato" className="hover:text-black transition">
            Contato
          </a>
        </nav>
        <Button
          size="lg"
          type="button"
          className="bg-[#FFE301] text-black hover:bg-[#f5d900] transition-colors hidden md:flex"
        >
          Comece agora
        </Button>
      </div>
    </header>
  );
}
