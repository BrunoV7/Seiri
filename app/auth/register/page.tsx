"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import React from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const FormSchema = z.object({
    firstName: z.string().min(1, { message: "Por favor, insira seu nome." }),
    lastName: z.string().min(1, { message: "Por favor, insira seu sobrenome." }),
    email: z.string().email({ message: "Endereço de e-mail inválido. Verifique e tente novamente." }),
    password: z.string().min(8, {
      message: "A senha deve ter pelo menos 8 caracteres.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      const response = await api.post("/api/auth/v1/register", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;

      Cookies.set("token", token, {
        domain: "seiri.com.br",
        path: "/",
        secure: true,
        sameSite: "Lax",
      });
      toast.success("Cadastro realizado com sucesso!");
      router.push('/v1/dashboard');
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Não foi possível realizar o cadastro."
      );
    } finally {

      setIsLoading(false);
    }
  }

  return (
    <section className="w-full h-dvh flex p-6 flex-col gap-6 items-center">
      <div className="flex gap-2 align-middle justify-start items-center">
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
        <span className="font-semibold text-2xl text-neutral-900 tracking-tight">
          Seiri
        </span>
      </div>
      <div className="flex flex-col w-full md:w-4/10 gap-4">
        <div className="text-xl text-center">
          <h1 className="font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground text-md">
            Organize suas ideias com clareza. Cadastre-se para começar sua jornada.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-9/10 md:w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Seu nome"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Digite seu nome.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Seu sobrenome"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Digite seu sobrenome.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="exemplo@seiri.dev"
                        autoComplete="email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Digite o e-mail cadastrado na sua conta.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="password"
                        placeholder="********"
                        autoComplete="new-password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Informe sua senha para acessar sua conta.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full bg-[#FFE301] text-black clicked active:bg-yellow-600"
                size={"lg"}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Icons.spinner className="h-4 w-4 animate-spin" />
                ) : (
                  <p>Cadastrar</p>
                )}
              </Button>
            </form>
          </Form>
          {/* 
          <p className="text-sm text-muted-foreground text-center">
            ou cadastre-se com uma rede social
          </p>
          <div className="flex flex-col gap-2 w-9/10 md:w-2/3">
            <Button
              className="w-full"
              variant="outline"
              type="button"
              size={"lg"}
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="h-4 w-4 animate-spin" />
              ) : (
                <Icons.gitHub className="mr-2 h-4 w-4" />
              )}
              GitHub
            </Button>
          </div>
          */}
          <div className="flex flex-col gap-2 w-9/10 md:w-2/3">
            <p className="text-sm text-muted-foreground text-center">
              Já tem uma conta?
            </p>
            <Link href="/auth/login" className="w-full">
              <Button
                className="w-full"
                variant="default"
                type="button"
                size="lg"
                disabled={isLoading}
              >
                Entrar
              </Button>
            </Link>
          </div>
          <div className="w-9/10 md:w-6/10 mt-2 pb-2">
            <p className="px-8 text-center text-sm text-muted-foreground">
              Ao continuar, você concorda com nossos{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary relative"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
