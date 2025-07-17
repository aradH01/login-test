'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Input } from '../../_components/Input/Input';
import { Button } from '../../_components/Button/Button';
import { phoneSchema, PhoneFormData } from '../../validations/validation';
import { fetchRandomUser } from '../../_services/api';
import { useUserStore } from '../../_stores/userStore';
import styles from './auth.module.scss';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();
  const { setUser, isAuthenticated, user } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
  });

  const phoneValue = watch('phone');

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push('/dashboard');
    } else {
      setIsCheckingAuth(false);
    }
  }, [isAuthenticated, user, router]);

  const onSubmit = async (data: PhoneFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchRandomUser();
      const user = response.results[0];
      
      // Save user to store (which persists to localStorage)
      setUser(user);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('خطا در دریافت اطلاعات کاربر. لطفا دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className={styles.container}>
        <div className={styles.authCard}>
          <div className={styles.header}>
            <h1 className={styles.title}>در حال بررسی...</h1>
            <p className={styles.subtitle}>
              لطفا صبر کنید
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>ورود به سیستم</h1>
          <p className={styles.subtitle}>
            لطفا شماره تلفن خود را وارد کنید
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            value={phoneValue || ''}
            onChange={(value) => setValue('phone', value)}
            placeholder="شماره تلفن (مثال: 09123456789)"
            error={errors.phone?.message}
            disabled={isLoading}
            
          />

          {error && <div className={styles.errorMessage}>{error}</div>}

          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'در حال پردازش...' : 'ورود'}
          </Button>
        </form>
      </div>
    </div>
  );
} 