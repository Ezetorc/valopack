import useShop from "../../hooks/useShop";
import getLightColor from "../../utils/getLightColor";
import Product from "../../interfaces/Product";
import sounds from "../../constants/sounds";
import "./ProductDisplay.css";

export function ProductDisplay({ product, color, amount }: Product) {
  const { setSelectedProduct } = useShop();
  const { image, name, price } = product;
  const lightColor = getLightColor(color, 0.4);
  const backgroundStyle = {
    background: `linear-gradient(0deg, ${color} 0%, ${lightColor} 100%)`,
  };

  const handleMouseEnter = () => sounds.hover.play()

  const handleClick = () => {
    setSelectedProduct({ product, color, amount });
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      className="product"
      onClick={handleClick}
    >
      <img src={image} title={name} alt={`${name} image`} />
      <div className="product__subcontainer" style={backgroundStyle}>
        <span>{name}</span>
        <span>{`$${price}`}</span>
      </div>
    </button>
  );
}
