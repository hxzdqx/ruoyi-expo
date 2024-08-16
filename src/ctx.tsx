import React from "react";
import { useStorageState } from "./hooks/useStorageState";

const AuthContext = React.createContext<{
  signIn: (token: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => void 0,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// 这个钩子可以用来访问用户信息。
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession必须封装在 <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("App-Token");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (token: string) => {
          // Perform sign-in logic here
          await setSession(token);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
