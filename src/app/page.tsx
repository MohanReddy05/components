'use client'; // Mark this component as a client component

import Accordion from '../components/ui/accordian';
import React from 'react';
import ThemeToggle from '../components/ui/themeToggle';
import Search from '../components/ui/search'; // Import your Search component
import Navbar from '@/components/ui/navbar';
import Link from 'next/link';
function Home() {
    const accordionItems = [
        {
            title: 'Section 1',
            content: <p>This is the content for section 1.</p>,
            id: 'section1',
        },
        {
            title: 'Section 2',
            content: <p>This is the content for section 2.</p>,
            id: 'section2',
        },
        {
            title: 'Section 3',
            content: <p>This is the content for section 3.</p>,
            id: 'section3',
        },
    ];

    const handleSearch = () => {
        alert('searched');
    };
    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
        { label: 'External', href: 'https://example.com', isExternal: true },
    ];
    const ctaButton = (
        <Link
            href='/pricing'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
            Pricing
        </Link>
    );

    const myLogo = <span className='text-xl font-bold'>My Custom Logo</span>;
    return (
        <>
            <Navbar
                // logo={myLogo}
                navItems={navItems}
                cta={ctaButton}
                className='bg-gray-50 dark:bg-gray-800' // Optional: Style the entire navbar
                containerClassName='max-w-screen-xl' // Optional: Limit the container width
                isSticky={true}
            />
            <div className='flex justify-end p-4'>
                <ThemeToggle />
            </div>
            <div>{/* <Search /> */}</div>
            <div className='container mx-auto p-4'>
                <h2 className='text-2xl font-bold mb-4'>Single Accordion</h2>
                <Accordion
                    items={accordionItems}
                    type='single'
                    titleClassName='border-b-1 border-black
                    dark:border-b-1
                    dark:border-white'
                />

                <h2 className='text-2xl font-bold mt-8 mb-4'>
                    Multiple Accordion
                </h2>
                <Accordion
                    items={accordionItems}
                    type='multiple'
                />
            </div>
        </>
    );
}

export default Home;
