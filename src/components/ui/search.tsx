'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'; // Replace with your icons
import { cn } from '../../lib/utils'; // Shadcn-like utility

interface SearchResult {
    id: string;
    title: string;
    description: string;
    link: string; // URL to the item
}

interface SearchProps {
    className?: string;
    placeholder?: string;
    // Function that takes a search term and returns a promise of search results
    onSearch: (searchTerm: string) => Promise<SearchResult[]>;
    debounceTimeout?: number; // Debounce time in ms (default 300)
    maxResults?: number; // Max number of results to display (default 5)
}

const Search: React.FC<SearchProps> = ({
    className,
    placeholder = 'Search...',
    onSearch,
    debounceTimeout = 300,
    maxResults = 5,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Control the visibility of the results dropdown
    const searchInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Debounce the search function using useCallback
    const debouncedSearch = useCallback(
        (term: string) => {
            setIsSearching(true);
            onSearch(term)
                .then((results) => {
                    setSearchResults(results.slice(0, maxResults)); // Limit the number of results
                    setIsOpen(results.length > 0); // Only open if there are results
                })
                .catch((error) => {
                    console.error('Search error:', error);
                    setSearchResults([]); // Clear results on error
                    setIsOpen(false); // Close on error
                })
                .finally(() => {
                    setIsSearching(false);
                });
        },
        [onSearch, maxResults]
    );

    useEffect(() => {
        if (searchTerm) {
            const timeoutId = setTimeout(() => {
                debouncedSearch(searchTerm);
            }, debounceTimeout);

            return () => clearTimeout(timeoutId); // Cleanup function
        } else {
            setSearchResults([]); // Clear results when search term is empty
            setIsOpen(false); // Close when search term is empty
        }
    }, [searchTerm, debouncedSearch, debounceTimeout]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setIsOpen(false);
        searchInputRef.current?.focus(); // Refocus the input
    };

    const handleResultClick = (link: string) => {
        router.push(link); // Use Next.js router to navigate
        handleClearSearch(); // Clear search and close results after navigation
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            handleClearSearch(); // Clear search on escape
        }
    };

    return (
        <div className={cn('relative w-full', className)}>
            <div className='relative flex items-center'>
                <input
                    ref={searchInputRef}
                    type='search'
                    className='w-full py-2 px-4 pl-10 pr-12 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200'
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    aria-label='Search'
                    autoComplete='off'
                />
                <div className='absolute left-3 pointer-events-none'>
                    <MagnifyingGlassIcon className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                </div>
                {searchTerm && (
                    <button
                        className='absolute right-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200'
                        onClick={handleClearSearch}
                        aria-label='Clear search'
                    >
                        <XMarkIcon className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                    </button>
                )}
            </div>

            {isOpen && (
                <div className='absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg overflow-hidden'>
                    {isSearching && (
                        <div className='py-2 px-4 text-gray-500 dark:text-gray-400'>
                            Searching...
                        </div>
                    )}
                    {!isSearching && searchResults.length === 0 && (
                        <div className='py-2 px-4 text-gray-500 dark:text-gray-400'>
                            No results found.
                        </div>
                    )}
                    {searchResults.map((result) => (
                        <button
                            key={result.id}
                            className='block w-full py-2 px-4 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 transition-colors duration-200'
                            onClick={() => handleResultClick(result.link)}
                        >
                            <div className='font-medium'>{result.title}</div>
                            <div className='text-sm text-gray-500 dark:text-gray-400'>
                                {result.description}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
