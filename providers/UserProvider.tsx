'use client';

import { MyUserContextProvider } from "@/hooks/uesUser";


interface UserProviderProps {
      children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
      return (
            <MyUserContextProvider>
                  {children}
            </MyUserContextProvider>
      )
}

export default UserProvider;