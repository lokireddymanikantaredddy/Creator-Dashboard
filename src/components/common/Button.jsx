import React from 'react';
import PropTypes from 'prop-types';
import { theme } from '../../styles/theme';
import { FiLoader } from 'react-icons/fi';

const variants = {
  primary: `bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500`,
  secondary: `bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500`,
  outline: `border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500`,
  danger: `bg-error-500 text-white hover:bg-error-600 focus:ring-error-500`,
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-md
    transition-colors duration-${theme.transitions.normal}
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <FiLoader className="animate-spin mr-2" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  className: PropTypes.string,
}; 