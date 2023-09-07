import Favicon from "react-favicon";
import ProductCatalog from "./components/ProductCatalog";
import Navbar from "./components/Navbar";

// NOTE: Remember to enter the following after creating a new file for a component: rafce

function App() {
  return (
    <div>
      <Favicon url="public/favicon.ico" />

      <Navbar />
      <ProductCatalog />
    </div>
  );
}

export default App;
