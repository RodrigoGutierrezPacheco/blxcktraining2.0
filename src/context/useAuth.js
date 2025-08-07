// Si mantienes useAuth en archivo separado, debe importar correctamente
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}