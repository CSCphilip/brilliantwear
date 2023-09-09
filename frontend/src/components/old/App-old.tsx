import { useState } from "react";
import Alert from "./Alert";
import Button from "./Button";
import ListGroup from "./ListGroup";

// NOTE: Remember to enter the following after creating a new file for a component: rafce

function App() {
  let items = ["Stockholm", "Paris", "Berlin", "London", "Rome"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
      H<br></br>
      {/* <Alert>
        Hello <b>World!</b>
      </Alert> */}
      <br></br>
      {alertVisible && (
        <Alert onClick={() => setAlertVisibility(false)}>
          This is an alert!
        </Alert>
      )}
      <Button color="success" onClick={() => setAlertVisibility(true)}>
        Click me!
      </Button>
    </div>
  );
}

export default App;
