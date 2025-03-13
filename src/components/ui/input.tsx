import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Label } from './label';

const inputVariants = cva('', {
    variants: {
        variant: {
            default:
                'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            move: 'h-[40px] min-h-[40px] pl-2 pr-[40px] leading-normal rounded-[10px] text-inherit bg-white dark:bg-zinc-800 focus-visible:outline-0 focus-visible:border-teal-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a] text-black dark:text-white border border-black ',
            line: 'font-size: 16px; padding: 10px 10px 10px 5px; display: block; width: 200px; border: none; border-bottom: 1px solid #515151; background: transparent;',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {
    label?: string;
    leftIcon?: React.ReactNode;
    requiredMessage?: string;
    errorMessage?: string;
    validate?: (value: string) => string | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            variant,
            label,
            required,
            leftIcon,
            requiredMessage,
            errorMessage,
            validate,
            ...props
        },
        ref
    ) => {
        const [error, setError] = React.useState<string | undefined>(
            errorMessage
        );
        const inputClass = cn(inputVariants({ variant, className }));

        const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
            if (validate) {
                const validationError = validate(event.target.value);
                setError(validationError);
            }
        };

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (props.onChange) {
                props.onChange(event);
            }
            if (validate) {
                const validationError = validate(event.target.value);
                setError(validationError);
            }
        };

        const renderInput = () => {
            switch (variant) {
                case 'move':
                    return (
                        <div className='relative flex flex-row items-center'>
                            <input
                                {...props}
                                ref={ref}
                                type='email'
                                className={cn(
                                    inputClass,
                                    'peer' // Added the peer class here
                                )}
                                aria-invalid={!!error}
                                placeholder=''
                                spellCheck='false'
                                autoComplete='on'
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {label && (
                                <>
                                    <label
                                        htmlFor={props.id || props.name}
                                        className='cursor-text ml-2 text-grey-700 inline-block z-0 text-sm mb-px font-normal text-start select-none absolute duration-300 transform origin-[0] translate-x-8 peer-focus-visible:text-teal-500 peer-focus-visible:translate-x-2 peer-[:not(:placeholder-shown)]:translate-x-2 peer-focus-visible:-translate-y-9 peer-[:not(:placeholder-shown)]:-translate-y-9 peer-[:not(:placeholder-shown)]:text-xs'
                                    >
                                        {label}
                                    </label>
                                </>
                            )}
                            {leftIcon && (
                                <span className='pointer-events-none mr-4 absolute z-[+1] left-0 top-0 bottom-0 flex items-center justify-center size-10 text-grey-700 peer-focus-visible:hidden peer-[:not(:placeholder-shown)]:hidden'>
                                    {leftIcon}
                                </span>
                            )}

                            {error && (
                                <div className='text-red-500 text-sm mt-14 left-1 absolute'>
                                    {error}
                                </div>
                            )}
                        </div>
                    );
                case 'line':
                    return (
                        <div className='wave-group relative'>
                            <input
                                required
                                type='text'
                                className='input block w-[200px] text-base px-2.5 py-2.5 pb-1.5 border-none border-b border-solid border-[#515151] bg-transparent focus:outline-none'
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <span className='bar block relative w-[200px]'></span>
                            <label className='label absolute pointer-events-none left-1.5 top-2.5 flex text-[#999] text-lg font-normal'>
                                {label?.split('').map((char, index) => (
                                    <span
                                        key={index}
                                        className='label-char transition-all ease-[ease] duration-200'
                                        style={{
                                            transitionDelay: `calc(${index} * 0.05s)`,
                                        }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </label>

                            {/* Error message */}
                            {error && (
                                <div className='text-red-500 text-sm mt-1'>
                                    {error}
                                </div>
                            )}

                            {/* Custom CSS for pseudo-elements and advanced transitions */}
                            <style>
                                {`
          .wave-group .bar::before,
          .wave-group .bar::after {
            content: '';
            height: 2px;
            width: 0;
            bottom: 1px;
            position: absolute;
            background: #5264ae;
            transition: 0.2s ease all;
          }

          .wave-group .bar::before {
            left: 50%;
          }

          .wave-group .bar::after {
            right: 50%;
          }

          .wave-group .input:focus ~ .bar::before,
          .wave-group .input:focus ~ .bar::after {
            width: 50%;
          }

          .wave-group .input:focus ~ label .label-char,
          .wave-group .input:valid ~ label .label-char {
            transform: translateY(-20px);
            font-size: 14px;
            color: #5264ae;
          }
        `}
                            </style>
                        </div>
                    );
                default:
                    return (
                        <div>
                            <label className='font-bold ml-3'>{label}</label>
                            <input
                                type='text'
                                className={inputClass}
                                ref={ref}
                                {...props}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {error && (
                                <div className='text-red-500 text-sm '>
                                    {error}
                                </div>
                            )}
                        </div>
                    );
            }
        };

        return renderInput();
    }
);

Input.displayName = 'Input';

export { Input };
