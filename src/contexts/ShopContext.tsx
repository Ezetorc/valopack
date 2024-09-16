import { createContext, ReactNode, useState } from "react";
import Product from "../interfaces/Product";
import Agent from "../interfaces/Agent";
import ShopContextType from "../interfaces/ShopContextType";

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined
);

export function ShopContextProvider({ children }: { children: ReactNode }) {
  const [ownedProduct, setOwnedProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [ownedAgents, setOwnedAgents] = useState<Agent[]>([]);

  return (
    <ShopContext.Provider
      value={{
        ownedAgents,
        setOwnedAgents,
        ownedProduct,
        setOwnedProduct,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
