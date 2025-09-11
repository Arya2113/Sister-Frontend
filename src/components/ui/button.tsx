import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
}

export function Button({ children, variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  const baseClasses = "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring"

  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-secondary",
    secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
    outline: "border border-border bg-background text-foreground hover:bg-muted",
  }

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
