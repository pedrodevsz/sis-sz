import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-zinc-800 text-primary-100 flex flex-col gap-4 rounded-xl py-6 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 flex justify-between items-center", className)}
      {...props}
    />
  )
}

function CardInfo({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-lg font-semibold leading-tight", className)}
      {...props}
    />
  )
}

function CardSubtitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-sm text-primary-300", className)}
      {...props}
    />
  )
}

function CardPrice({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-green-400 font-bold text-base", className)}
      {...props}
    />
  )
}

function CardActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex gap-3", className)} {...props} />
  )
}

export {
  Card,
  CardContent,
  CardInfo,
  CardTitle,
  CardSubtitle,
  CardPrice,
  CardActions,
}
