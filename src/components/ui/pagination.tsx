import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-4", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        "relative inline-flex items-center justify-center size-10 rounded-xl transition-all duration-300",
        isActive
          ? "bg-gradient-to-br from-purple-500/30 to-cyan-500/30 text-white border border-white/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          : "text-white/60 hover:text-white hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-cyan-500/20",
        "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-purple-500/10 before:to-cyan-500/10 before:opacity-0 before:transition-opacity hover:before:opacity-100",
        "backdrop-blur-sm hover:backdrop-blur-md",
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <a
      aria-label="Go to previous page"
      className={cn(
        "group flex items-center gap-1 text-sm font-medium text-white/60 transition-colors duration-200 hover:text-white",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
      <span>Previous</span>
    </a>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <a
      aria-label="Go to next page"
      className={cn(
        "group flex items-center gap-1 text-sm font-medium text-white/60 transition-colors duration-200 hover:text-white",
        className
      )}
      {...props}
    >
      <span>Next</span>
      <ChevronRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-10 items-center justify-center text-white/40",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}



