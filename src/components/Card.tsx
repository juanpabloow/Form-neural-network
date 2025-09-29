import React from 'react';

interface CardProps {
  children: React.ReactNode;
  large?: boolean;
}

const Card: React.FC<CardProps> = ({ children, large = false }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className={`${large ? 'max-w-4xl' : 'max-w-md'} mx-auto bg-white rounded p-6`}>
        {children}
      </div>
    </div>
  );
};

export default Card;