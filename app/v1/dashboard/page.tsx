"use client";

import { useEffect } from "react";
import api from "@/lib/api";

export default function Dashboard() {
  useEffect(() => {
    // Teste de requisição para verificar se o token está sendo enviado
    const testRequest = async () => {
      try {
        const response = await api.get('/api/v1/user/profile');
        console.log('✅ Requisição bem-sucedida:', response.data);
      } catch (error: any) {
        console.log('❌ Erro na requisição:', error.response?.status, error.response?.data);
      }
    };

    testRequest();
  }, []);

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Verifique o console para ver os logs de debug da API</p>
    </section>
  );
}