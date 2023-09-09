// NOTE the PascalCasing here for the function name, standard for React development.
function Message() {
  // The following is one feature and the beauty of JSX:
  const name = "Brilliantwear";
  if (name) {
    return <h1>Hello {name}!</h1>;
  }
  return <h1>Hello World!</h1>;
}

export default Message;
