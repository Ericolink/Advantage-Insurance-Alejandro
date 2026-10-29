import type { ReactNode } from "react";
import type { IconName } from "@/config/types";
import { Icon } from "./Icon";

// Notices from design sheet 02. Every kind pairs an icon with words, so meaning never depends on color alone.
// "pending" (red dashed box) marks text or data that must be supplied or approved — it never ships to production.
const kinds = {
  info: { box: "bg-navy-50", icon: "info", iconColor: "text-navy-900", title: "text-navy-900" },
  success: { box: "bg-green-50", icon: "check", iconColor: "text-green-700", title: "text-green-700" },
  error: { box: "border-2 border-red-700 bg-white", icon: "alert", iconColor: "text-red-700", title: "text-red-700" },
  pending: { box: "border-2 border-dashed border-red-600 bg-white", icon: "pencil", iconColor: "text-red-700", title: "text-red-700" },
} satisfies Record<string, { box: string; icon: IconName; iconColor: string; title: string }>;

export type NoticeKind = keyof typeof kinds;

export function Notice({ kind, title, children, role, className = "" }: { kind: NoticeKind; title?: string; children?: ReactNode; role?: "status" | "alert" | "note"; className?: string }) {
  const style = kinds[kind];
  return (
    <div role={role} className={`flex items-start gap-3 rounded-lg p-5 text-small text-gray-700 ${style.box} ${className}`} {...(kind === "pending" && { "data-pending": "" })}>
      <Icon name={style.icon} className={`mt-0.5 size-5 shrink-0 ${style.iconColor}`} />
      <div className="space-y-1">
        {title && <p className={`font-bold ${style.title}`}>{title}</p>}
        {children}
      </div>
    </div>
  );
}
