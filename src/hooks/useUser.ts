import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import UserContextType from "../interfaces/UserContextType";

export default function useUser() {
  const context: UserContextType | undefined = useContext(UserContext);
  if (!context) throw new Error("Context doesn't have a Provider");
  return context;
}
