'use client';

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";

import useAuthModal from '@/hooks/useAuthModal'
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";


 
 const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

   return (
     <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
     >
        <Auth 
          theme="dark"
          magicLink
          providers={[ 'google', 'apple','github']}
          supabaseClient={supabaseClient}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#404040',
                  brandAccent: '#00a550'
                }
              }
            }
          }}
        />
     </Modal>
   )
 }
 
 export default AuthModal