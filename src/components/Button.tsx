import React from 'react';


interface ButtonProps {
  className: string;
  outline?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, outline }) => {
  return (
    <button className={className}>
      {children}
      {outline && <div className="outline"></div>} {/* Добавляем проверку на наличие outline */}
    </button>
  );
};
export default Button;
