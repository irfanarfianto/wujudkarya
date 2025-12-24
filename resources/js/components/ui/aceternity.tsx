import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SpotlightProps {
    className?: string;
    fill?: string;
}

export const Spotlight = ({ className, fill }: SpotlightProps) => {
    return (
        <svg
            className={cn(
                'animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0',
                className
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3787 2842"
            fill="none"
        >
            <g filter="url(#filter)">
                <ellipse
                    cx="1924.71"
                    cy="273.501"
                    rx="1924.71"
                    ry="273.501"
                    transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                    fill={fill || 'white'}
                    fillOpacity="0.21"
                ></ellipse>
            </g>
            <defs>
                <filter
                    id="filter"
                    x="0.860352"
                    y="0.838989"
                    width="3785.16"
                    height="2840.26"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    ></feBlend>
                    <feGaussianBlur
                        stdDeviation="151"
                        result="effect1_foregroundBlur_1065_8"
                    ></feGaussianBlur>
                </filter>
            </defs>
        </svg>
    );
};

interface BackgroundBeamsProps {
    className?: string;
}

export const BackgroundBeams = ({ className }: BackgroundBeamsProps) => {
    return (
        <div className={cn('absolute inset-0 overflow-hidden', className)}>
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute h-full w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-beam"
                    style={{
                        left: `${(i + 1) * 16.66}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${3 + i * 0.5}s`,
                    }}
                />
            ))}
        </div>
    );
};

interface GridBackgroundProps {
    className?: string;
    children?: ReactNode;
}

export const GridBackground = ({ className, children }: GridBackgroundProps) => {
    return (
        <div className={cn('relative', className)}>
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            {children}
        </div>
    );
};

interface FloatingOrbProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    color?: string;
}

export const FloatingOrb = ({ className, size = 'md', color = 'primary' }: FloatingOrbProps) => {
    const sizes = {
        sm: 'w-48 h-48',
        md: 'w-72 h-72',
        lg: 'w-96 h-96',
    };

    return (
        <div
            className={cn(
                'absolute rounded-full blur-3xl animate-float opacity-20',
                sizes[size],
                `bg-${color}/10`,
                className
            )}
        />
    );
};

interface GlassCardProps {
    className?: string;
    children: ReactNode;
    hover?: boolean;
}

export const GlassCard = ({ className, children, hover = true }: GlassCardProps) => {
    return (
        <div
            className={cn(
                'relative bg-background/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6',
                hover && 'hover:border-primary/50 transition-all duration-300',
                className
            )}
        >
            {children}
        </div>
    );
};

interface ShineEffectProps {
    className?: string;
}

export const ShineEffect = ({ className }: ShineEffectProps) => {
    return (
        <div className={cn('absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300', className)}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
    );
};

// Add to global CSS
export const aceternityStyles = `
@keyframes spotlight {
    0% {
        opacity: 0;
        transform: translate(-72%, -62%) scale(0.5);
    }
    100% {
        opacity: 1;
        transform: translate(-50%, -40%) scale(1);
    }
}

@keyframes beam {
    0%, 100% {
        opacity: 0;
        transform: translateY(-100%);
    }
    50% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
}

.animate-spotlight {
    animation: spotlight 2s ease 0.5s 1 forwards;
}

.animate-beam {
    animation: beam 3s ease-in-out infinite;
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.bg-grid-white\\/\\[0\\.02\\] {
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
}
`;
