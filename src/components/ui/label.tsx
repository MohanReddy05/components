import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, ...props }, ref) => {
        return (
            <label
                className={cn(labelVariants({ className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

Label.displayName = 'Label';

export { Label };
