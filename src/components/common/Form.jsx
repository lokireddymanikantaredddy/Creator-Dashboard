import React from 'react';
import PropTypes from 'prop-types';
import { theme } from '../../styles/theme';

export const FormGroup = ({ children, className = '', ...props }) => (
  <div className={`space-y-2 ${className}`} {...props}>
    {children}
  </div>
);

export const FormLabel = ({ children, htmlFor, required, className = '', ...props }) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-neutral-700 ${className}`}
    {...props}
  >
    {children}
    {required && <span className="text-error-500 ml-1">*</span>}
  </label>
);

export const FormInput = React.forwardRef(({
  id,
  type = 'text',
  error,
  className = '',
  ...props
}, ref) => (
  <input
    ref={ref}
    id={id}
    type={type}
    className={`
      w-full px-3 py-2
      border rounded-md
      text-neutral-900
      placeholder-neutral-400
      transition-colors duration-${theme.transitions.normal}
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
      disabled:bg-neutral-50 disabled:text-neutral-500
      ${error ? 'border-error-500' : 'border-neutral-300'}
      ${className}
    `}
    aria-invalid={error ? 'true' : 'false'}
    {...props}
  />
));

export const FormError = ({ children, className = '', ...props }) => (
  <p
    role="alert"
    className={`text-sm text-error-500 ${className}`}
    {...props}
  >
    {children}
  </p>
);

export const FormTextarea = React.forwardRef(({
  id,
  error,
  className = '',
  ...props
}, ref) => (
  <textarea
    ref={ref}
    id={id}
    className={`
      w-full px-3 py-2
      border rounded-md
      text-neutral-900
      placeholder-neutral-400
      transition-colors duration-${theme.transitions.normal}
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
      disabled:bg-neutral-50 disabled:text-neutral-500
      ${error ? 'border-error-500' : 'border-neutral-300'}
      ${className}
    `}
    aria-invalid={error ? 'true' : 'false'}
    {...props}
  />
));

export const FormSelect = React.forwardRef(({
  id,
  error,
  children,
  className = '',
  ...props
}, ref) => (
  <select
    ref={ref}
    id={id}
    className={`
      w-full px-3 py-2
      border rounded-md
      text-neutral-900
      transition-colors duration-${theme.transitions.normal}
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
      disabled:bg-neutral-50 disabled:text-neutral-500
      ${error ? 'border-error-500' : 'border-neutral-300'}
      ${className}
    `}
    aria-invalid={error ? 'true' : 'false'}
    {...props}
  >
    {children}
  </select>
));

// PropTypes
FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

FormLabel.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
};

FormError.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

FormTextarea.propTypes = {
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
  className: PropTypes.string,
};

FormSelect.propTypes = {
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}; 