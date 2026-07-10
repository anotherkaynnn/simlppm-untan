import { AlertCircle } from "lucide-react";

export function InlineValidation({ error, className = "" }: { error?: string, className?: string }) {
  if (!error) return null;

  return (
    <div className={`flex items-center mt-1.5 text-danger text-xs font-medium animate-in slide-in-from-top-1 ${className}`}>
      <AlertCircle className="w-3.5 h-3.5 mr-1.5 shrink-0" />
      <span>{error}</span>
    </div>
  );
}
