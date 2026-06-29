import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')

# 1. UTILS
write_file('lib/utils/cn.ts', '''
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility to merge tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
''')

write_file('lib/utils/polymorphic.ts', '''
import * as React from "react"

/**
 * Types for polymorphic components
 */
export type AsProp<C extends React.ElementType> = {
  as?: C
}

export type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"]

export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> }
''')

write_file('lib/utils/accessibility.ts', '''
import * as React from "react"

/**
 * Accessibility helpers
 */
export const a11y = {
  srOnly: "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]",
  focusVisible: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  disabled: "disabled:opacity-50 disabled:pointer-events-none",
}

export function getAriaDisabled(disabled?: boolean, loading?: boolean) {
  if (disabled || loading) return true
  return undefined
}
''')

write_file('lib/utils/index.ts', '''
export * from "./cn"
export * from "./polymorphic"
export * from "./accessibility"
''')

# 2. BUTTON
write_file('components/ui/Button/Button.types.ts', '''
import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { buttonVariants } from "./Button.variants"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Enables Radix Slot pattern */
  asChild?: boolean
  /** Full width button */
  fullWidth?: boolean
  /** Loading state */
  loading?: boolean
  /** Left icon element */
  leftIcon?: React.ReactNode
  /** Right icon element */
  rightIcon?: React.ReactNode
}
''')

write_file('components/ui/Button/Button.variants.ts', '''
import { cva } from "class-variance-authority"
import { a11y } from "@/lib/utils"

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors",
    a11y.focusVisible,
    a11y.disabled,
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-border bg-transparent hover:bg-surface-elevated text-text-primary",
        ghost: "hover:bg-surface-elevated text-text-primary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        link: "text-text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)
''')

write_file('components/ui/Button/Button.tsx', '''
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn, getAriaDisabled } from "@/lib/utils"
import { buttonVariants } from "./Button.variants"
import { type ButtonProps } from "./Button.types"
import { LoadingSpinner } from "../LoadingSpinner"

/**
 * Reusable Button component
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = getAriaDisabled(disabled, loading)

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && <LoadingSpinner className="mr-2 h-4 w-4" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Comp>
    )
  }
)
Button.displayName = "Button"
''')

write_file('components/ui/Button/index.ts', 'export * from "./Button"\nexport * from "./Button.types"\nexport * from "./Button.variants"\n')

# 3. TYPOGRAPHY
write_file('components/ui/Typography/Typography.types.ts', '''
import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { typographyVariants } from "./Typography.variants"
import { PolymorphicComponentPropsWithRef } from "@/lib/utils"

export type TypographyVariant = VariantProps<typeof typographyVariants>["variant"]

export type TypographyProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    /** Typography style variant */
    variant?: TypographyVariant
  }
>
''')

write_file('components/ui/Typography/Typography.variants.ts', '''
import { cva } from "class-variance-authority"

export const typographyVariants = cva("text-text-primary", {
  variants: {
    variant: {
      displayXl: "font-sans text-[var(--text-display-xl)] leading-tight font-bold",
      display: "font-sans text-[var(--text-display)] leading-tight font-bold",
      h1: "font-heading text-[var(--text-h1)] leading-tight font-semibold",
      h2: "font-heading text-[var(--text-h2)] leading-snug font-semibold",
      h3: "font-heading text-[var(--text-h3)] leading-snug font-medium",
      title: "font-sans text-[var(--text-title)] leading-snug font-medium",
      bodyLarge: "font-sans text-[var(--text-body-large)] leading-relaxed font-normal",
      body: "font-sans text-[var(--text-body)] leading-relaxed font-normal",
      small: "font-sans text-[var(--text-small)] leading-normal font-normal",
      caption: "font-sans text-[var(--text-caption)] leading-normal font-normal text-text-secondary",
      mono: "font-mono text-[var(--text-mono)] leading-normal font-normal",
    },
  },
  defaultVariants: {
    variant: "body",
  },
})
''')

write_file('components/ui/Typography/Typography.tsx', '''
import * as React from "react"
import { cn } from "@/lib/utils"
import { typographyVariants } from "./Typography.variants"
import { type TypographyProps, type TypographyVariant } from "./Typography.types"

type TypographyComponent = <C extends React.ElementType = "span">(
  props: TypographyProps<C>
) => React.ReactElement | null

const createTypography = (defaultAs: string, defaultVariant: TypographyVariant) => {
  const Component = React.forwardRef(
    <C extends React.ElementType>(
      { as, className, variant = defaultVariant, ...props }: TypographyProps<C>,
      ref?: React.Ref<any>
    ) => {
      const ComponentToRender = as || defaultAs
      return (
        <ComponentToRender
          ref={ref}
          className={cn(typographyVariants({ variant }), className)}
          {...props}
        />
      )
    }
  )
  Component.displayName = `Typography${defaultVariant}`
  return Component as TypographyComponent
}

export const DisplayXL = createTypography("h1", "displayXl")
export const Display = createTypography("h1", "display")
export const H1 = createTypography("h1", "h1")
export const H2 = createTypography("h2", "h2")
export const H3 = createTypography("h3", "h3")
export const Title = createTypography("span", "title")
export const BodyLarge = createTypography("p", "bodyLarge")
export const Body = createTypography("p", "body")
export const Small = createTypography("small", "small")
export const Caption = createTypography("span", "caption")
export const Mono = createTypography("span", "mono")
''')

write_file('components/ui/Typography/index.ts', 'export * from "./Typography"\nexport * from "./Typography.types"\nexport * from "./Typography.variants"\n')


# 4. CONTAINER
write_file('components/ui/Container/Container.types.ts', '''
import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { containerVariants } from "./Container.variants"
import { PolymorphicComponentPropsWithRef } from "@/lib/utils"

export type ContainerProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  VariantProps<typeof containerVariants>
>
''')

write_file('components/ui/Container/Container.variants.ts', '''
import { cva } from "class-variance-authority"

export const containerVariants = cva("mx-auto px-4 sm:px-6 lg:px-8 w-full", {
  variants: {
    maxWidth: {
      xs: "max-w-xs",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    maxWidth: "xl", // maps to max-w-xl (~36rem) as default standard
  },
})
''')

write_file('components/ui/Container/Container.tsx', '''
import * as React from "react"
import { cn } from "@/lib/utils"
import { containerVariants } from "./Container.variants"
import { type ContainerProps } from "./Container.types"

/**
 * Reusable Container component
 */
export const Container = React.forwardRef(
  <C extends React.ElementType = "div">(
    { as, className, maxWidth, ...props }: ContainerProps<C>,
    ref?: React.Ref<any>
  ) => {
    const Comp = as || "div"
    return (
      <Comp
        ref={ref}
        className={cn(containerVariants({ maxWidth }), className)}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"
''')

write_file('components/ui/Container/index.ts', 'export * from "./Container"\nexport * from "./Container.types"\nexport * from "./Container.variants"\n')

# 5. SECTION
write_file('components/ui/Section/Section.types.ts', '''
import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { sectionVariants } from "./Section.variants"

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}
''')

write_file('components/ui/Section/Section.variants.ts', '''
import { cva } from "class-variance-authority"

export const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "py-0",
      sm: "py-8",
      md: "py-16",
      lg: "py-24",
      xl: "py-32",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
})
''')

write_file('components/ui/Section/Section.tsx', '''
import * as React from "react"
import { cn } from "@/lib/utils"
import { sectionVariants } from "./Section.variants"
import { type SectionProps } from "./Section.types"

/**
 * Reusable Section component
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ spacing }), className)}
        {...props}
      />
    )
  }
)
Section.displayName = "Section"
''')

write_file('components/ui/Section/index.ts', 'export * from "./Section"\nexport * from "./Section.types"\nexport * from "./Section.variants"\n')

# 6. STACK
write_file('components/ui/Stack/Stack.types.ts', '''
import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { stackVariants } from "./Stack.variants"
import { PolymorphicComponentPropsWithRef } from "@/lib/utils"

export type StackProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  VariantProps<typeof stackVariants>
>
''')

write_file('components/ui/Stack/Stack.variants.ts', '''
import { cva } from "class-variance-authority"

export const stackVariants = cva("flex flex-col", {
  variants: {
    gap: {
      0: "gap-0",
      4: "gap-1", // 0.25rem (4px base assuming tailwind scale)
      8: "gap-2", // 0.5rem (8px)
      12: "gap-3", // 0.75rem (12px)
      16: "gap-4", // 1rem (16px)
      20: "gap-5",
      24: "gap-6",
      32: "gap-8",
      40: "gap-10",
      48: "gap-12",
      64: "gap-16",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    gap: 16,
    align: "stretch",
    justify: "start",
  },
})
''')

write_file('components/ui/Stack/Stack.tsx', '''
import * as React from "react"
import { cn } from "@/lib/utils"
import { stackVariants } from "./Stack.variants"
import { type StackProps } from "./Stack.types"

/**
 * Vertical Stack layout helper
 */
export const Stack = React.forwardRef(
  <C extends React.ElementType = "div">(
    { as, className, gap, align, justify, ...props }: StackProps<C>,
    ref?: React.Ref<any>
  ) => {
    const Comp = as || "div"
    return (
      <Comp
        ref={ref}
        className={cn(stackVariants({ gap, align, justify }), className)}
        {...props}
      />
    )
  }
)
Stack.displayName = "Stack"
''')

write_file('components/ui/Stack/index.ts', 'export * from "./Stack"\nexport * from "./Stack.types"\nexport * from "./Stack.variants"\n')

# 7. GRID
write_file('components/ui/Grid/Grid.types.ts', '''
import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { gridVariants } from "./Grid.variants"
import { PolymorphicComponentPropsWithRef } from "@/lib/utils"

export type GridProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  VariantProps<typeof gridVariants>
>
''')

write_file('components/ui/Grid/Grid.variants.ts', '''
import { cva } from "class-variance-authority"

export const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    },
    gap: {
      16: "gap-4",
      24: "gap-6",
      32: "gap-8",
      48: "gap-12",
    },
  },
  defaultVariants: {
    cols: 1,
    gap: 16,
  },
})
''')

write_file('components/ui/Grid/Grid.tsx', '''
import * as React from "react"
import { cn } from "@/lib/utils"
import { gridVariants } from "./Grid.variants"
import { type GridProps } from "./Grid.types"

/**
 * Grid layout helper
 */
export const Grid = React.forwardRef(
  <C extends React.ElementType = "div">(
    { as, className, cols, gap, ...props }: GridProps<C>,
    ref?: React.Ref<any>
  ) => {
    const Comp = as || "div"
    return (
      <Comp
        ref={ref}
        className={cn(gridVariants({ cols, gap }), className)}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"
''')

write_file('components/ui/Grid/index.ts', 'export * from "./Grid"\nexport * from "./Grid.types"\nexport * from "./Grid.variants"\n')

# 8. DIVIDER
write_file('components/ui/Divider/Divider.types.ts', '''
import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { dividerVariants } from "./Divider.variants"

export interface DividerProps
  extends React.HTMLAttributes<HTMLHRElement | HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  /** Decorative only means it gets aria-hidden */
  decorative?: boolean
}
''')

write_file('components/ui/Divider/Divider.variants.ts', '''
import { cva } from "class-variance-authority"

export const dividerVariants = cva("bg-border", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})
''')

write_file('components/ui/Divider/Divider.tsx', '''
import * as React from "react"
import { cn } from "@/lib/utils"
import { dividerVariants } from "./Divider.variants"
import { type DividerProps } from "./Divider.types"

/**
 * Reusable Divider component
 */
export const Divider = React.forwardRef<HTMLHRElement | HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
    const semanticProps = decorative
      ? { role: "none", "aria-hidden": true }
      : { role: "separator", "aria-orientation": orientation }

    if (orientation === "horizontal") {
      return (
        <hr
          ref={ref as React.Ref<HTMLHRElement>}
          className={cn(dividerVariants({ orientation }), className)}
          {...semanticProps}
          {...props}
        />
      )
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(dividerVariants({ orientation }), className)}
        {...semanticProps}
        {...props}
      />
    )
  }
)
Divider.displayName = "Divider"
''')

write_file('components/ui/Divider/index.ts', 'export * from "./Divider"\nexport * from "./Divider.types"\nexport * from "./Divider.variants"\n')


# 9. ICON
write_file('components/ui/Icon/Icon.types.ts', '''
import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { iconVariants } from "./Icon.variants"

export interface IconProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof iconVariants> {
  /** The Lucide icon component to render */
  icon: React.ElementType
  /** Accessible label */
  title?: string
}
''')

write_file('components/ui/Icon/Icon.variants.ts', '''
import { cva } from "class-variance-authority"

export const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
    color: {
      current: "text-current",
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      accent: "text-accent",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    color: "current",
  },
})
''')

write_file('components/ui/Icon/Icon.tsx', '''
import * as React from "react"
import { cn } from "@/lib/utils"
import { iconVariants } from "./Icon.variants"
import { type IconProps } from "./Icon.types"

/**
 * Reusable Icon wrapper component
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, className, size, color, title, ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        className={cn(iconVariants({ size, color }), className)}
        aria-hidden={title ? undefined : true}
        aria-label={title}
        {...props}
      />
    )
  }
)
Icon.displayName = "Icon"
''')

write_file('components/ui/Icon/index.ts', 'export * from "./Icon"\nexport * from "./Icon.types"\nexport * from "./Icon.variants"\n')

# 10. LINK
write_file('components/ui/Link/Link.types.ts', '''
import * as React from "react"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { type VariantProps } from "class-variance-authority"
import { linkVariants } from "./Link.variants"

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>,
    NextLinkProps,
    VariantProps<typeof linkVariants> {
  /** Is external link? */
  external?: boolean
}
''')

write_file('components/ui/Link/Link.variants.ts', '''
import { cva } from "class-variance-authority"
import { a11y } from "@/lib/utils"

export const linkVariants = cva(
  [
    "inline-flex items-center gap-1 transition-colors underline-offset-4",
    a11y.focusVisible,
  ],
  {
    variants: {
      variant: {
        primary: "text-text-primary hover:underline",
        secondary: "text-text-secondary hover:text-text-primary hover:underline",
        accent: "text-accent hover:underline",
        unstyled: "",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)
''')

write_file('components/ui/Link/Link.tsx', '''
import * as React from "react"
import NextLink from "next/link"
import { cn } from "@/lib/utils"
import { linkVariants } from "./Link.variants"
import { type LinkProps } from "./Link.types"

/**
 * Reusable Link component wrapping next/link
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, external, href, children, ...props }, ref) => {
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}

    return (
      <NextLink
        ref={ref}
        href={href}
        className={cn(linkVariants({ variant }), className)}
        {...externalProps}
        {...props}
      >
        {children}
      </NextLink>
    )
  }
)
Link.displayName = "Link"
''')

write_file('components/ui/Link/index.ts', 'export * from "./Link"\nexport * from "./Link.types"\nexport * from "./Link.variants"\n')


# 11. LOADING SPINNER
write_file('components/ui/LoadingSpinner/LoadingSpinner.types.ts', '''
import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { loadingSpinnerVariants } from "./LoadingSpinner.variants"

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingSpinnerVariants> {
  /** Accessibility text */
  label?: string
}
''')

write_file('components/ui/LoadingSpinner/LoadingSpinner.variants.ts', '''
import { cva } from "class-variance-authority"

export const loadingSpinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
      color: {
        current: "text-current",
        primary: "text-text-primary",
        accent: "text-accent",
      },
    },
    defaultVariants: {
      size: "md",
      color: "current",
    },
  }
)
''')

write_file('components/ui/LoadingSpinner/LoadingSpinner.tsx', '''
import * as React from "react"
import { cn, a11y } from "@/lib/utils"
import { loadingSpinnerVariants } from "./LoadingSpinner.variants"
import { type LoadingSpinnerProps } from "./LoadingSpinner.types"

/**
 * Reusable accessible loading spinner component
 */
export const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, color, label = "Loading...", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        className={cn(loadingSpinnerVariants({ size, color }), className)}
        {...props}
      >
        <span className={cn(a11y.srOnly)}>{label}</span>
      </div>
    )
  }
)
LoadingSpinner.displayName = "LoadingSpinner"
''')

write_file('components/ui/LoadingSpinner/index.ts', 'export * from "./LoadingSpinner"\nexport * from "./LoadingSpinner.types"\nexport * from "./LoadingSpinner.variants"\n')


# 12. INDEX EXPORT
write_file('components/ui/index.ts', '''
export * from "./Button"
export * from "./Typography"
export * from "./Container"
export * from "./Section"
export * from "./Stack"
export * from "./Grid"
export * from "./Divider"
export * from "./Icon"
export * from "./Link"
export * from "./LoadingSpinner"
''')

print("All components generated successfully.")
