import * as React from "react"
import { cn } from "@/lib/utils"

type CardProps = React.ComponentProps<"div"> & {
  children: React.ReactNode
}

function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-zinc-900 text-white border border-zinc-800 rounded-2xl shadow-sm transition hover:shadow-md hover:border-zinc-700",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "p-6 flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardBody({ className, children, ...props }: CardProps) {
  return (
    <div
      data-slot="card-body"
      className={cn("space-y-1", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function CardTitle({ className, children, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-xl font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  )
}

type CardTextProps = React.ComponentProps<"p"> & {
  variant?: "default" | "subtitle" | "price" | "quantity"
}

function CardText({
  className,
  variant = "default",
  children,
  ...props
}: CardTextProps) {
  const baseClass = {
    default: "text-base text-white",
    subtitle: "text-sm text-zinc-500",
    price: "text-green-600 font-bold text-lg",
    quantity: "text-base font-medium text-white",
  }

  return (
    <p
      data-slot={`card-text-${variant}`}
      className={cn(baseClass[variant], className)}
      {...props}
    >
      {children}
    </p>
  )
}

function CardActions({ className, children, ...props }: CardProps) {
  return (
    <div
      data-slot="card-actions"
      className={cn("flex gap-2 md:ml-auto", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  Card,
  CardContent,
  CardBody,
  CardTitle,
  CardText,
  CardActions,
}
