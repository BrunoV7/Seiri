"use client";

import { createContext, useContext, useState } from "react";

type User = {
    firstName: string,
    lastName: string,
    email: string
}

const defaultUser: User = {
    firstName: "",
    lastName: "",
    email: ""
}

type UserContextType = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({children}: {children: React.ReactNode}){
    const [user, setUser] = useState<User>(defaultUser);
    return (
        <UserContext.Provider value={{user: user, setUser: setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
}