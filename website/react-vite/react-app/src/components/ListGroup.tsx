import { MouseEvent, useState } from "react";

// Props: Input passed to a component. Similar to function args.
interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

// This is a component in React:
function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  // let items = ["Stockholm", "Paris", "Berlin", "London", "Rome"];
  // items = [];

  // let selectedIndex = 0;

  // State: Data managed by a component. Similar to local variable.

  // Hook:
  const [selectedIndex, setSelectedIndex] = useState(-1);
  // arr[0]; // variable (selectedIndex)
  // arr[1]; // updater function
  // const [name, setName] = useState(''); // Common way in React

  const getMessage = () => {
    return items.length === 0 && <p>No items found.</p>;
  };

  const handleClick = (event: MouseEvent) => console.log(event.clientX);

  return (
    <>
      <h1>{heading}</h1>
      {getMessage()}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
