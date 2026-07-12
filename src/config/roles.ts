import { UserRole } from "@/types";

export const SHARED_ROUTES = [
  "/dashboard",
  "/profil"
];

// Mapping allowed root paths for each role
export const ROLE_ROUTES: Record<UserRole, string[]> = {
  DOSEN: [
    ...SHARED_ROUTES,
    "/pengajuan",
    "/monitoring",
    "/pelaporan",
    "/panduan"
  ],
  REVIEWER: [
    ...SHARED_ROUTES,
    "/review"
  ],
  OPERATOR_FK: [
    ...SHARED_ROUTES,
    "/verifikasi",
    "/manajemen/data" // as per sidebar Rekapitulasi Fakultas
  ],
  ADMIN_FK: [
    ...SHARED_ROUTES,
    "/statistik",
    "/manajemen/dosen",
    "/manajemen/reviewer",
    "/manajemen/berkas",
    "/manajemen/ekspor"
  ],
  KETUA_LPPM: [
    ...SHARED_ROUTES,
    "/statistik",
    "/monitoring",
    "/manajemen/ekspor"
  ],
  ADMIN_SISTEM: [
    ...SHARED_ROUTES,
    "/konfigurasi",
    "/audit-log",
    "/audit"
  ]
};

/**
 * Check if a given role is allowed to access a specific path.
 * The check is prefix-based (e.g., "/pengajuan/baru" will match "/pengajuan").
 */
export function isRouteAllowed(role: UserRole | undefined, pathname: string): boolean {
  if (!role) return false;
  
  const allowedRoutes = ROLE_ROUTES[role] || [];
  
  // Strict matching for root or exact matches, prefix matching for nested routes
  return allowedRoutes.some(route => {
    if (pathname === route) return true;
    if (pathname.startsWith(`${route}/`)) return true;
    return false;
  });
}
