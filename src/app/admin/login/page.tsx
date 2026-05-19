'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import styles from './login.module.css';

export default function AdminLogin() {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
                body: JSON.stringify({ username: username.trim(), password }),
            });
            const data = await res.json();

            if (data.success) {
                window.location.href = '/admin';
            } else {
                setError(data.message || 'Account or password is incorrect.');
            }
        } catch {
            setError('Unable to connect to the admin service.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <section className={styles.loginPanel} aria-label="Admin login">
                <div className={styles.brandBlock}>
                    <div className={styles.brandMark}>N-TET</div>
                    <div>
                        <p className={styles.kicker}>Admin Console</p>
                        <h1 className={styles.title}>管理后台登录</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.field}>
                        <span className={styles.label}>账号</span>
                        <span className={styles.inputShell}>
                            <UserRound size={18} aria-hidden="true" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={styles.input}
                                autoComplete="username"
                                required
                            />
                        </span>
                    </label>

                    <label className={styles.field}>
                        <span className={styles.label}>密码</span>
                        <span className={styles.inputShell}>
                            <LockKeyhole size={18} aria-hidden="true" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                                autoComplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                className={styles.iconButton}
                                onClick={() => setShowPassword((value) => !value)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </span>
                    </label>

                    {error && <div className={styles.error}>{error}</div>}

                    <button type="submit" className={styles.button} disabled={loading}>
                        <ShieldCheck size={18} aria-hidden="true" />
                        {loading ? '正在登录...' : '登录系统'}
                    </button>
                </form>
            </section>
        </div>
    );
}
