'use client';

import React from 'react';
import { useUserStore } from '../../_stores/userStore';
import styles from './page.module.scss';

export default function DashboardPage() {
  const { user } = useUserStore();

  if (!user) {
    return null;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcomeCard}>
        <div className={styles.welcomeHeader}>
          <img 
            src={user.picture.large} 
            alt={`${user.name.first} ${user.name.last}`}
            className={styles.welcomeAvatar}
          />
          <div className={styles.welcomeText}>
            <h1 className={styles.welcomeTitle}>
              خوش آمدید به داشبورد
            </h1>
            <p className={styles.welcomeSubtitle}>
              سلام {user.name.first} {user.name.last}!
            </p>
          </div>
        </div>
        
        <div className={styles.userInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>ایمیل:</span>
            <span className={styles.infoValue}>{user.email}</span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>شماره تلفن:</span>
            <span className={styles.infoValue}>{user.phone}</span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>شهر:</span>
            <span className={styles.infoValue}>{user.location.city}</span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>کشور:</span>
            <span className={styles.infoValue}>{user.location.country}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 