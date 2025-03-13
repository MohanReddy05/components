import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Or your preferred routing library
import { cn } from '../../lib/utils'; // Shadcn-like utility for conditional classes
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Heroicons for menu

interface NavItem {
    label: string;
    href: string;
    isExternal?: boolean; // Optional: If the link is external
}

interface NavbarProps {
    logo?: React.ReactNode; // Custom logo (can be an image or text)
    navItems: NavItem[];
    cta?: React.ReactNode; // Call-to-action button or element
    className?: string; // For custom styling the navbar
    containerClassName?: string; // For custom styling the container
    navItemClassName?: string; // For custom styling nav items
    mobileMenuBreakpoint?: string; // Tailwind breakpoint for mobile menu (default: 'lg')
    isSticky?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
    logo,
    navItems,
    cta,
    className,
    containerClassName,
    navItemClassName,
    mobileMenuBreakpoint = 'lg',
    isSticky = false,
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10); // Change 10 to your desired scroll threshold
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={cn(
                'w-full py-4 transition-shadow duration-300',
                isSticky && 'sticky top-0 z-50', //Make navbar sticky
                isScrolled
                    ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md'
                    : 'bg-transparent', // Style on scroll
                className
            )}
        >
            <div
                className={cn(
                    'container mx-auto px-4 flex items-center justify-between',
                    containerClassName
                )}
            >
                {/* Logo */}
                <div className='font-bold text-xl text-gray-900 dark:text-gray-100'>
                    {logo || 'Your Brand'}
                </div>

                {/* Desktop Navigation */}
                <nav
                    className={cn(
                        'items-center space-x-6 hidden', // Initially hidden on small screens
                        ` ${mobileMenuBreakpoint}:flex` // Make it flex on large screens and above
                    )}
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200',
                                navItemClassName // Apply custom styling from props
                            )}
                            target={item.isExternal ? '_blank' : undefined}
                            rel={
                                item.isExternal
                                    ? 'noopener noreferrer'
                                    : undefined
                            }
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={cn(
                        `lg:hidden`, // This is the key change!
                        'text-gray-600 dark:text-gray-300 focus:outline-none'
                    )}
                    onClick={toggleMobileMenu}
                    aria-label='Toggle Menu'
                >
                    {isMobileMenuOpen ? (
                        <XMarkIcon className='h-6 w-6' />
                    ) : (
                        <Bars3Icon className='h-6 w-6' /> // Replaced MenuIcon with Bars3Icon
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    'lg:hidden overflow-hidden transition-height duration-300 ease-in-out',
                    isMobileMenuOpen ? 'h-auto' : 'h-0'
                )}
            >
                <div className='py-4 px-4 flex flex-col space-y-4'>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className='block text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
                            onClick={closeMobileMenu}
                            target={item.isExternal ? '_blank' : undefined}
                            rel={
                                item.isExternal
                                    ? 'noopener noreferrer'
                                    : undefined
                            }
                        >
                            {item.label}
                        </Link>
                    ))}
                    {cta && <div className='mt-2'>{cta}</div>}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
