'use client';
import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'; // Or outline
import { cn } from '../../lib/utils';

interface ThemeToggleProps {
    className?: string;
    defaultTheme?: 'dark' | 'light';
    storageKey?: string;
    size?: 'sm' | 'md' | 'lg';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
    className,
    defaultTheme = 'light',
    storageKey = 'theme',
    size = 'md',
}) => {
    const [theme, setTheme] = useState<'dark' | 'light'>(defaultTheme);

    useEffect(() => {
        const storedTheme = localStorage.getItem(storageKey) as
            | 'dark'
            | 'light'
            | null;
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            setTheme(defaultTheme);
        }
    }, [storageKey, defaultTheme]);

    useEffect(() => {
        const applyTheme = (theme: 'dark' | 'light') => {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };

        applyTheme(theme);
        localStorage.setItem(storageKey, theme);
    }, [theme, storageKey]);

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    };

    const getButtonLabel = () => {
        return theme === 'light' ? 'Dark' : 'Light';
    };

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'h-7 w-7';
            case 'lg':
                return 'h-10 w-10';
            default:
                return 'h-8 w-8'; // Medium size
        }
    };

    return (
        <button
            className={cn(
                'relative flex items-center justify-center rounded-full focus:outline-none dark:focus:ring-blue-400',
                getSizeClasses(),
                theme === 'light'
                    ? 'bg-gray-100 hover:bg-gray-200'
                    : 'bg-gray-700 hover:bg-gray-600', // Background based on theme
                'transition-colors duration-200', // Transition for background
                className
            )}
            onClick={toggleTheme}
            aria-label={`Switch to ${getButtonLabel()} mode`}
        >
            {theme === 'light' && (
                <MoonIcon className='h-4 w-4 text-gray-800 dark:text-gray-400' />
            )}
            {theme === 'dark' && (
                <SunIcon className='h-4 w-4 text-gray-800 dark:text-gray-400' />
            )}
        </button>
    );
};

export default ThemeToggle;
