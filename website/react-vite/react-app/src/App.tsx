import Favicon from "react-favicon";
import ProductCatalog from "./components/ProductCatalog";

// NOTE: Remember to enter the following after creating a new file for a component: rafce

function App() {
  return (
    <div>
      <Favicon url="public/favicon.ico" />
      <ProductCatalog />
    </div>
  );
}

export default App;
