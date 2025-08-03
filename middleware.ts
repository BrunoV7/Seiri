import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('🔍 Middleware executando para:', request.nextUrl.pathname);
  
  // Verifica se a rota começa com /v1 (rotas protegidas)
  if (request.nextUrl.pathname.startsWith('/v1')) {
    console.log('🚨 Rota protegida detectada:', request.nextUrl.pathname);
    
    // Verifica se existe token de autenticação
    const token = request.cookies.get('token')?.value;
    console.log('🔑 Token encontrado:', !!token);
    
    if (!token) {
      console.log('🔄 Redirecionando para login');
      // Se não há token, redireciona para login
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/v1/:path*']
}; 