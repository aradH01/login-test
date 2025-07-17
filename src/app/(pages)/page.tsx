'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {useUserStore} from "../_stores";



export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();

  useEffect(() => {
    
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{ color: 'white', fontSize: '18px' }}>
        در حال بارگذاری...
      </div>
    </div>
  );
}
