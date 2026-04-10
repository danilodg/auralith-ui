import * as React from 'react'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeStyles = {
  sm: 'h-6 w-6 text-[0.6rem]',
  md: 'h-10 w-10 text-[0.8rem]',
  lg: 'h-14 w-14 text-sm',
  xl: 'h-20 w-20 text-lg',
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false)

    const showFallback = imageError || !src

    return (
      <div
        ref={ref}
        className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--card-border)] bg-[color:var(--surface-base)] shadow-[inset_0_1px_3px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.1)] ${sizeStyles[size]} ${className || ''}`}
        {...props}
      >
        {showFallback ? (
          <span className="font-[IBM_Plex_Mono,monospace] font-semibold text-[color:var(--text-soft)] uppercase tracking-wider">
            {fallback.substring(0, 2)}
          </span>
        ) : (
          <img
            src={src}
            alt={alt || fallback}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  limit?: number
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, limit = 4, ...props }, ref) => {
    const avatars = React.Children.toArray(children)
    const visibleAvatars = limit ? avatars.slice(0, limit) : avatars
    const overflowCount = limit && avatars.length > limit ? avatars.length - limit : 0

    return (
      <div
        ref={ref}
        className={`flex items-center -space-x-3 ${className || ''}`}
        {...props}
      >
        {visibleAvatars.map((child, i) => (
          <div key={i} className="relative z-[0] transform transition-transform hover:z-[10] hover:-translate-y-1 hover:scale-105 ring-2 ring-[color:var(--page-bg)] rounded-full">
            {child}
          </div>
        ))}
        {overflowCount > 0 && (
          <div className="relative z-[0] flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[color:var(--card-border)] bg-[color:var(--surface-panel-3)] ring-2 ring-[color:var(--page-bg)] shadow-md">
            <span className="font-[IBM_Plex_Mono,monospace] text-xs font-semibold text-[color:var(--text-soft)]">
              +{overflowCount}
            </span>
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = 'AvatarGroup'
