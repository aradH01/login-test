'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../../_stores/userStore';
import styles from './layout.module.scss';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated, clearUser } = useUserStore();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      router.push('/auth');
    }
  }, [isAuthenticated, user, router]);

  const handleLogout = () => {
    clearUser();
    router.push('/auth');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <h1>لوگو</h1>
          </div>

          <div className={styles.userInfo}>
            <div className={styles.userDetails}>
              <span className={styles.userName}>
                {user.name.first} {user.name.last}
              </span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>

            <div className={styles.userAvatar}>
              <img
                src={user.picture.thumbnail}
                alt={`${user.name.first} ${user.name.last}`}
                className={styles.avatar}
              />
            </div>

            <button onClick={handleLogout} className={styles.logoutButton}>
             <span> خروج</span>
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
