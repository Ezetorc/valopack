import duelistPackImage from "../../assets/images/packs/duelist_pack.webp";
import controllerPackImage from "../../assets/images/packs/controller_pack.webp";
import initiatorPackImage from "../../assets/images/packs/initiator_pack.webp";
import sentinelPackImage from "../../assets/images/packs/sentinel_pack.webp";
import { useEffect } from "react";
import useSettings from "../../hooks/useSettings";
import useUser from "../../hooks/useUser";
import useShop from "../../hooks/useShop";
import Opener from "../Opener/Opener";
import { ProductDisplay } from "../ProductDisplay/ProductDisplay";
import { sectionsBg } from "../../constants/sectionsBg";
import BuyModal from "../BuyModal/BuyModal";
import "./Shop.css";

export default function Shop() {
  const { ownedProduct, selectedProduct } = useShop();
  const { credits } = useUser();
  const { texts, updateSection } = useSettings();
  const canBuy = selectedProduct
    ? credits >= selectedProduct.product.price
    : false;

  useEffect(() => updateSection(texts.shop, sectionsBg.shop, true));

  return (
    <>
      {selectedProduct && <BuyModal canBuy={canBuy} />}

      {!ownedProduct ? (
        <section className="shop">
          <ProductDisplay
            product={{
              name: texts.duelistPack,
              price: 2000,
              image: duelistPackImage,
              type: "duelist",
            }}
            color="#833d25"
            amount={1}
          />
          <ProductDisplay
            product={{
              name: texts.controllerPack,
              price: 2000,
              image: controllerPackImage,
              type: "controller",
            }}
            color="#234950"
            amount={1}
          />
          <ProductDisplay
            product={{
              name: texts.initiatorPack,
              price: 2000,
              image: initiatorPackImage,
              type: "initiator",
            }}
            color="#1f4531"
            amount={1}
          />
          <ProductDisplay
            product={{
              name: texts.sentinelPack,
              price: 2000,
              image: sentinelPackImage,
              type: "sentinel",
            }}
            color="#4a4a4a"
            amount={1}
          />
          <ProductDisplay
            product={{
              name: texts.mixedPack,
              price: 3000,
              image: sentinelPackImage,
              type: "all",
            }}
            color="#70226d"
            amount={1}
          />
          <ProductDisplay
            product={{
              name: texts.newPack,
              price: 5000,
              image: sentinelPackImage,
              type: "new",
            }}
            color="#7b0707"
            amount={1}
          />
        </section>
      ) : (
        <Opener />
      )}
    </>
  );
}
