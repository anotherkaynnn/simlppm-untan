"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { MENU_CONFIG } from "@/components/layout/AppSidebar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function Breadcrumb() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  
  if (!user || pathname === "/dashboard") return null;

  const roleConfig = MENU_CONFIG[user.role] || [];
  
  // Flatten menu to map of href -> title
  const routeMap = new Map<string, string>();
  roleConfig.forEach(item => {
    if (item.href) routeMap.set(item.href, item.title);
    if (item.subItems) {
      item.subItems.forEach(sub => {
        routeMap.set(sub.href, sub.title);
      });
    }
  });

  const segments = pathname.split("/").filter(Boolean);
  
  // Build cumulative paths starting from dashboard
  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" }
  ];

  let currentPath = "";
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    
    // skip dashboard as it's already added manually
    if (currentPath === "/dashboard") return;

    const label = routeMap.get(currentPath);
    if (label) {
      breadcrumbs.push({ label, href: currentPath });
    } else {
      // If no exact match in menu, format segment
      const formattedLabel = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      breadcrumbs.push({ label: formattedLabel, href: currentPath });
    }
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center space-x-2 text-sm text-neutral-500">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <React.Fragment key={crumb.href}>
            {isLast ? (
              <span aria-current="page" className="font-medium text-slate-800">
                {crumb.label}
              </span>
            ) : (
              <>
                <Link href={crumb.href} className="hover:text-primary-600 transition-colors">
                  {crumb.label}
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
              </>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
