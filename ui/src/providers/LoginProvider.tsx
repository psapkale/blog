import { createContext } from "react";

export const LoginContext = createContext<{
   isLogin: boolean;
   setIsLogin: (isLogin: boolean) => void;
}>({
   isLogin: false,
   setIsLogin: () => {},
});
