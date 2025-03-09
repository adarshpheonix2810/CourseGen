import React from 'react';

const Button = ({
  children,
  onClick,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <button
      onClick={disabled ? undefined : onClick} // Prevents click event when disabled
      disabled={disabled}
      className={`relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none 
      focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 
      ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} 
      ${className}`}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] 
      bg-[conic-gradient(from_90deg_at_50%_50%,#a2aeff_0%,#3749be_50%,#a2aeff_100%)] 
      dark:bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
      />
      <span className={`inline-flex h-full w-full items-center justify-center rounded-full 
      dark:bg-[#070e41] bg-[#070e41] px-8 py-1 text-sm font-medium 
      dark:text-gray-50 text-white backdrop-blur-3xl
      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
        {children}
      </span>
    </button>
  );
};

export default Button;
