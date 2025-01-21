import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { SurfaceProps } from '@/types'

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ children, className, withShadow = true, withBorder = true, ...props },
   ref) => {
    const surfaceClass = cn(
      className,
      'bg-white rounded-lg dark:bg-black',
      withShadow ? 'shadow-sm' : '',
      withBorder ? 'border border-neutral-200 dark:border-neutral-800' : ''
    )

    return (
      <div className={surfaceClass} {...props} ref={ref}>
        {children}
      </div>
    )
  }
)

Surface.displayName = 'Surface'
