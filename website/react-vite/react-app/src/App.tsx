import Favicon from "react-favicon";
import ProductCatalog from "./components/ProductCatalog";
import Navbar from "./components/Navbar";

// NOTE: Remember to enter the following after creating a new file for a component: rafce

function App() {
  return (
    <div>
      <Favicon url="public/favicon.ico" />

      <Navbar />
      <h2 className="catalog-heading">Product Catalog</h2>
      <ProductCatalog />
    </div>
  );
}

export default App;
