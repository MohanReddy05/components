import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    'bg-primary cursor-pointer text-primary-foreground shadow-xs hover:bg-primary/90',
                destructive:
                    'bg-destructive cursor-pointer text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
                outline:
                    'border border-input cursor-pointer bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
                secondary:
                    "inline-block px-6 py-3 border border-gray-600 rounded transition-all duration-200 ease-in relative overflow-hidden text-base cursor-pointer text-black z-10 hover:text-white hover:border-teal-500 before:content-[''] before:absolute before:left-1/2 before:top-full before:transform before:-translate-x-1/2 before:scale-y-100 before:scale-x-125 before:w-[140%] before:h-[180%] before:bg-black/5 before:rounded-full before:block before:transition-all before:duration-500 before:ease-custom before:z-[-1] after:content-[''] after:absolute after:left-[55%] after:top-full after:transform after:-translate-x-1/2 after:scale-y-100 after:scale-x-145 after:w-[160%] after:h-[190%] after:bg-teal-500 after:rounded-full after:block after:transition-all after:duration-500 after:ease-custom after:z-[-1] hover:before:-top-[35%] hover:before:bg-teal-500 hover:before:scale-y-130 hover:before:scale-x-80 hover:after:-top-[45%] hover:after:bg-teal-500 hover:after:scale-y-130 hover:after:scale-x-80",
                ghost: 'hover:bg-accent cursor-pointer hover:text-accent-foreground',
                link: 'text-primary cursor-pointer underline-offset-4 hover:underline hover:',
                gradient:
                    'w-fit flex items-center justify-center px-2.5 py-3.5 cursor-pointer gap-1 font-bold rounded-3xl text-white shadow-md bg-[linear-gradient(15deg,#880088,#aa2068,#cc3f47,#de6f3d,#f09f33,#de6f3d,#cc3f47,#aa2068,#880088)] bg-[length:300%] bg-left hover:bg-right transition-all duration-300 ',
                slide: 'bg-white text-center cursor-pointer border-2 border-green-400 w-fit rounded-[100] h-10 relative text-black text-xl font-semibold group flex items-center overflow-hidden',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-8 rounded-md gap-1.5 px-3 ',
                lg: 'h-10 rounded-md px-6',
                icon: 'size-9 rounded-full px-0 flex items-center justify-center',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

interface ButtonProps
    extends React.ComponentProps<'button'>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    slideIcon?: React.ReactNode; // Prop specific to the slide variant
}

function Button({
    className,
    variant,
    size,
    asChild = false,
    slideIcon, //Destructure `slideIcon` here
    ...props
}: ButtonProps) {
    const Comp = asChild ? Slot : 'button';

    const renderSlideContent = () => {
        if (variant === 'slide') {
            return (
                <>
                    <span className='bg-green-400 rounded-2xl h-full w-1/4 flex items-center justify-center absolute left-0 top-0 group-hover:w-full z-10 duration-500'>
                        {slideIcon}
                    </span>
                    <p className='translate-x-2 p-4'>{props.children}</p>{' '}
                    {/* Access children using props */}
                </>
            );
        }
        return props.children; // For other variants, just return the children
    };

    return (
        <Comp
            data-slot='button'
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        >
            {renderSlideContent()}
        </Comp>
    );
}

export { Button, buttonVariants };
