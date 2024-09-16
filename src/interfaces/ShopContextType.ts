import Agent from "./Agent";
import Product from "./Product";

export default interface ShopContextType {
  ownedProduct: Product | null;
  setOwnedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  selectedProduct: Product | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  ownedAgents: Agent[];
  setOwnedAgents: React.Dispatch<React.SetStateAction<Agent[]>>;
}
