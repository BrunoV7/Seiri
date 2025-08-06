import Cookies from "js-cookie";
import api from "@/lib/api";
import { useRouter } from "next/router";
import { toast } from "sonner";

export class User {
  firstName: string;
  lastName: string;
  email: string;
  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

export async function loadUser(): Promise<User | null> {
  try {
    const response = await api.get("/api/v1/sc/user/info");
    const loadedUser: User = response.data;
    return loadedUser;
  } catch (error) {
    toast.error("Não foi possível carregar o seu perfil.");
    return null;
  }
}

export function loadUserFromCookie(): User | null {
  const cookieData = Cookies.get("seiri_user");
  if (!cookieData) return null;

  try {
    const { firstName, lastName, email } = JSON.parse(cookieData);
    return new User(firstName, lastName, email);
  } catch (error) {
    console.error("Erro ao ler o cookie do usuário:", error);
    return null;
  }
}