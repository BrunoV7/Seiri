import { UserProvider } from "./UserContext";

export default function V1Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}