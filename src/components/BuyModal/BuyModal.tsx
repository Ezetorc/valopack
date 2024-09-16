import Modal from "../Modal/Modal";
import useShop from "../../hooks/useShop";
import useSettings from "../../hooks/useSettings";
import useUser from "../../hooks/useUser";
import sounds from "../../constants/sounds";
import "./BuyModal.css";

export default function BuyModal({ canBuy }: { canBuy: boolean }) {
  const { texts } = useSettings();
  const { credits } = useUser();
  const { selectedProduct, setSelectedProduct, buy } = useShop();
  if (!selectedProduct) return;

  const handleClick = () => selectedProduct && buy(selectedProduct);
  const handleLoad = () => sounds.purchase.play();

  return canBuy ? (
    <Modal className="buy-modal" onLoad={handleLoad}>
      <span>{texts.wannaBuy(selectedProduct.product)}</span>
      <button onClick={() => setSelectedProduct(null)}>{texts.close}</button>
      <button onClick={handleClick}>{texts.buy}</button>
    </Modal>
  ) : (
    <Modal className="buy-modal" onLoad={handleLoad}>
      <span>{texts.cantBuy(selectedProduct.product, credits)}</span>
      <button onClick={() => setSelectedProduct(null)}>{texts.close}</button>
    </Modal>
  );
}
