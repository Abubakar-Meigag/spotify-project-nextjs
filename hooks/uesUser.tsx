import { User } from "@supabase/auth-helpers-nextjs";

import { useSessionContext, useUser as useSupacaUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

import { UserDetails, Subscription } from "@/types";


type UserContestType = {
      accessToken: string| null;
      user: User | null;
      userDetails: UserDetails | null;
      isLoading: boolean;
      subscription: Subscription | null;
}

export  const UserContext = createContext<UserContestType | undefined> (
      undefined
)

export interface Props {
      [propName: string]: any
}

export const MyUserContextProvider = (props: Props) => {
      const {
            session, 
            isLoading: isLoadingUser,
            supabaseClient: supabase
      } = useSessionContext();
      const user = useSupacaUser();
      const accessToken = session?.access_token ?? null;
      const [isLoadingData, setIsLoadingData] = useState(false);
      const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
      const [subscription, setSubscription] = useState<Subscription | null>(null);


      const getUserDetails = () => supabase.from('users').select('*').single();
      const getSubscription = () => 
            supabase
                  .from('subscription')
                  .select('*, prices(*, products(*))')
                  .in('status', ['trialing', 'active'])
                  .single();


      useEffect(() => {
            if(user && !isLoadingData && !userDetails && !subscription) {
                  setIsLoadingData(true);

              Promise.allSettled([getUserDetails(), getSubscription()]).then
                  ((result) => {
                        const userDetailsPromise = result[0];
                        const subscriptionPromise = result[1];

                  if (userDetailsPromise.status === 'fulfilled') {
                        setUserDetails(userDetailsPromise.value.data as UserDetails);
                  }

                  if (subscriptionPromise.status === 'fulfilled') {
                        setSubscription(subscriptionPromise.value.data as Subscription);
                  }

                  setIsLoadingData(false);
              })
            }else if (!user && !isLoadingData && !isLoadingUser){
                  setUserDetails(null);
                  setSubscription(null);
            }
      }, [user, isLoadingUser])


      const value = {
            accessToken,
            user,
            userDetails,
            isLoading: isLoadingUser || isLoadingData,
            subscription
      }

      return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
      const context = useContext(UserContext);

      if (context === undefined) {
            throw new Error('useUser must be used within a MyUserContext')
      }

      return context; 
}
