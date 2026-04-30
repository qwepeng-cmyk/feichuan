'use client';

import React, { useState } from 'react';
import styles from './login.module.css';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await res.json();
            
            if (data.success) {
                window.location.href = '/admin';
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server connection error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            {/* Hide global elements specifically for login if needed, though layout.tsx does it. Wait, layout.tsx wraps login! */}
            <div className={styles.loginCard}>
                <div className={styles.logo}>N-TET 管理系统</div>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>请验证您的身份</p>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        required
                    />
                    {error && <div className={styles.error}>{error}</div>}
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? '正在登录...' : '登录系统'}
                    </button>
                </form>
            </div>
        </div>
    );
}
