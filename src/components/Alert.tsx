import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'error' | 'success';
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ children, variant = 'error', className = '' }) => {
  const variantClasses = {
    error: 'bg-red-100 border-red-300 text-red-700',
    success: 'bg-green-100 border-green-300 text-green-700'
  };

  return (
    <div className={`border rounded p-3 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Alert;