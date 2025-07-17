'use client';

import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  error,
  disabled = false,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Only allow numbers and specific characters for phone
    const phoneRegex = /^[0-9+\-\s()]*$/;
    if ((phoneRegex.test(inputValue) || inputValue === '') && inputValue.length <= 11) {
      onChange(inputValue);
    }
  };

  return (
    <div className={`${styles.inputContainer} ${className}`}>
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={11}
        className={`${styles.input} ${error ? styles.error : ''}`}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
