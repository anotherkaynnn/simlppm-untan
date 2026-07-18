"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-white group-[.toaster]:!text-neutral-900 group-[.toaster]:border-neutral-200 group-[.toaster]:shadow-lg",
          title: "group-[.toast]:!text-neutral-900 group-[.toast]:font-bold group-[.toast]:text-sm",
          description: "group-[.toast]:!text-neutral-600 group-[.toast]:font-medium group-[.toast]:text-xs",
          actionButton: "group-[.toast]:bg-neutral-900 group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-600",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
