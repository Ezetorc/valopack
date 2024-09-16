import { useContext } from "react";
import useUser from "./useUser";
import Product from "../interfaces/Product";
import Agent from "../interfaces/Agent";
import getAgents from "../utils/getAgents";
import { levelMultiplier } from "../constants/general";
import ShopContextType from "../interfaces/ShopContextType";
import { ShopContext } from "../contexts/ShopContext";

export default function useShop() {
  const context: ShopContextType | undefined = useContext(ShopContext);
  if (!context) throw new Error("Context must be used with a Provider");

  const { setOwnedAgents, setOwnedProduct, setSelectedProduct } = context;
  const { setCredits, setInventory, inventory } = useUser();

  const buy = (product: Product): void => {
    const newAgents: Agent[] = getAgents(product.product.type, product.amount, inventory);
    const newInventory: Agent[] = getNewInventory(inventory, newAgents);

    setOwnedProduct(product);
    setSelectedProduct(null);
    setCredits((prevCredits) => prevCredits - product.product.price);
    setOwnedAgents(newAgents);
    setInventory(newInventory);
  };

  return { ...context, buy };
}

function getNewInventory(inventory: Agent[], newAgents: Agent[]): Agent[] {
  const newInventory: Agent[] = [...inventory];

  newAgents.forEach((newAgent) => {
    const existingAgentIndex: number = newInventory.findIndex(
      (agent: Agent) => agent.id === newAgent.id
    );

    if (existingAgentIndex !== -1) {
      newInventory[existingAgentIndex].level += levelMultiplier;
    } else {
      newInventory.push(newAgent);
    }
  });

  return newInventory;
}
