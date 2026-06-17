'use client';

import { useEffect, useRef, useState } from 'react';

export default function Preloader() {
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Lock scroll during preloader
        document.body.style.overflow = 'hidden';

        const top = topRef.current;
        const bottom = bottomRef.current;
        const logo = logoRef.current;
        const wrapper = wrapperRef.current;
        if (!top || !bottom || !logo || !wrapper) return;

        setTimeout(() => {
            logo.style.transform = 'scale(1)';
            logo.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            logo.style.opacity = '0';
            logo.style.transform = 'scale(1.1)';
        }, 1800);

        setTimeout(() => {
            top.style.transform = 'translateY(-100%)';
            bottom.style.transform = 'translateY(100%)';
        }, 2100);

        setTimeout(() => {
            document.body.style.overflow = '';
            setVisible(false);
        }, 3000);

    }, []);

    if (!visible) return null;

    return (
        <div
            ref={wrapperRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 999999,
                pointerEvents: 'all',
            }}
        >
            {/* Top half */}
            <div
                ref={topRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '50%',
                    backgroundColor: '#0a0a0a',
                    transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
                    zIndex: 2,
                }}
            />

            {/* Bottom half */}
            <div
                ref={bottomRef}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '50%',
                    backgroundColor: '#0a0a0a',
                    transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
                    zIndex: 2,
                }}
            />

            {/* Logo center */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3,
                }}
            >
                <img
                    ref={logoRef}
                    src="/images/vastr-logo.png"
                    alt="VASTR"
                    style={{
                        width: '400px',
                        height: '400px',
                        objectFit: 'contain',
                        transform: 'scale(0.5)',
                        opacity: 0,
                        transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease',
                    }}
                />
            </div>
        </div>
    );
}