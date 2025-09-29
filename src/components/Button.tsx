import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
}) => {
  const baseClasses = 'px-4 py-2 rounded';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400',
    secondary: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;