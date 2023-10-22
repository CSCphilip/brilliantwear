// "use client"; // To make this entire component a Client Component and make events work
import AddToCart from "./AddToCart";
import styles from "./ProductCard.module.css";

const ProductCard = () => {
  return (
    // <div className={styles.cardContainer}>
    // When using tailwindcss, the styling is done here directly (see below) and not in a separate css file
    <div className="p-5 my-5 bg-sky-400 text-white text-xl hover:bg-sky-500">
      <AddToCart />
    </div>
  );
};

export default ProductCard;
