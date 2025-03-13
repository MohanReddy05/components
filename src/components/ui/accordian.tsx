'use client';
import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline'; // Use outline icons for a modern look
import * as AccordionPrimitive from '@radix-ui/react-accordion'; // Import Radix UI Accordion primitives if desired
import { cn } from '../../lib/utils'; // Utility function for conditional class names (Shadcn-like)

interface AccordionItem {
    title: string;
    content: React.ReactNode;
    id?: string; // Optional ID, generated if not provided
}

interface AccordionProps {
    items: AccordionItem[];
    type: 'single' | 'multiple'; // 'single' or 'multiple' accordion behavior
    className?: string; // Optional classname for the container
    itemClassName?: string; // Optional classname for each item container
    titleClassName?: string; // Optional classname for the title
    contentClassName?: string; // Optional classname for the content
    transitionDuration?: number; // Duration of the transition in milliseconds (default: 200)
    bordered?: boolean; // Whether to add borders around the accordion items
}

const Accordion: React.FC<AccordionProps> = ({
    items,
    type,
    className,
    itemClassName,
    titleClassName,
    contentClassName,
    transitionDuration = 200,
    bordered = false,
}) => {
    const [activeItems, setActiveItems] = useState<string[]>([]); // Store IDs of open items
    const contentRefs = useRef<Record<string, HTMLDivElement | null>>({}); // Store references to content divs

    // Generate unique IDs if not provided
    const itemsWithIds = items.map((item) => ({
        ...item,
        id: item.id || useId(),
    }));

    useEffect(() => {
        contentRefs.current = itemsWithIds.reduce((acc, item) => {
            acc[item.id] = null; // Initialize with null
            return acc;
        }, {});
    }, [itemsWithIds]);

    const handleItemClick = (itemId: string) => {
        if (type === 'single') {
            setActiveItems(activeItems[0] === itemId ? [] : [itemId]);
        } else {
            setActiveItems(
                activeItems.includes(itemId)
                    ? activeItems.filter((id) => id !== itemId)
                    : [...activeItems, itemId]
            );
        }
    };

    return (
        <div className={cn('accordion', className)}>
            {itemsWithIds.map((item, index) => {
                const isLast = index === itemsWithIds.length - 1;

                return (
                    <div
                        key={item.id}
                        className={cn(
                            'accordion-item',
                            itemClassName,
                            bordered && 'border',
                            bordered && !isLast && 'border-b-0', // Remove bottom border except for the last item
                            'dark:border-gray-700' // Dark mode border
                        )}
                    >
                        <button
                            className={cn(
                                'accordion-title flex items-center justify-between w-full py-3 px-4 text-left font-medium focus:outline-none transition-colors',
                                !bordered &&
                                    'hover:bg-gray-50 focus:bg-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800', // Subtle hover effect if no border
                                bordered && 'bg-white dark:bg-gray-900', //Background if bordered
                                titleClassName,
                                activeItems.includes(item.id)
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-900 dark:text-gray-100'
                            )}
                            onClick={() => handleItemClick(item.id)}
                            aria-expanded={activeItems.includes(item.id)}
                        >
                            {item.title}
                            <ChevronDownIcon
                                className={cn(
                                    'h-5 w-5 transform transition-transform',
                                    activeItems.includes(item.id)
                                        ? 'rotate-180'
                                        : '',
                                    `duration-${transitionDuration}`,
                                    'text-gray-500 dark:text-gray-400' // Icon color
                                )}
                            />
                        </button>
                        <div
                            ref={(el) => (contentRefs.current[item.id] = el)}
                            className={cn(
                                'accordion-content overflow-hidden transition-height',
                                `duration-${transitionDuration} ease-in-out`,
                                contentClassName,
                                activeItems.includes(item.id)
                                    ? 'block'
                                    : 'hidden',
                                bordered &&
                                    'border-t border-gray-200 dark:border-gray-700' // Border above the content when bordered
                            )}
                        >
                            <div className='py-3 px-4 text-gray-700 dark:text-gray-300'>
                                {item.content}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Accordion;
