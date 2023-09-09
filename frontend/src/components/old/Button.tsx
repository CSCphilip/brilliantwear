interface ButtonProps {
  children: string;
  color?: "primary" | "secondary" | "success";
  onClick: () => void;
}

function Button({ children, onClick, color = "primary" }: ButtonProps) {
  return (
    <div className={"btn btn-" + color} onClick={onClick}>
      {children}
    </div>
  );
}

export default Button;
