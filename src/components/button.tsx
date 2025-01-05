interface ButtonProps {
  name: string;
  type?: "button" | "submit" | "reset";
  redirectTo?: string;
  color: "gray" | "blue";
  onClick?: () => void;
  disabled?: boolean;
}

function Button({ name, type, redirectTo, color, onClick, disabled }: ButtonProps) {
  const buttonClasses = `hover:bg-blue-800 text-white font-bold py-2 px-4 rounded duration-300 ${
    color === "gray" ? "bg-neutral-600 hover:bg-neutral-600" : "bg-blue-600 hover:bg-blue-700"
  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  if (redirectTo) {
    return (
      <a href={redirectTo}>
        <button className={buttonClasses} type={type} disabled={disabled}>
          {name}
        </button>
      </a>
    );
  } else {
    return (
      <button className={buttonClasses} onClick={onClick} type={type} disabled={disabled}>
        {name}
      </button>
    );
  }
}

export default Button;