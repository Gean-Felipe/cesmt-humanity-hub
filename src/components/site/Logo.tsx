interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", variant = "light", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-11 w-11",
    lg: "h-14 w-14",
  };

  const titleClasses = {
    sm: "text-lg font-bold",
    md: "text-xl font-bold",
    lg: "text-2xl font-bold",
  };

  const subtitleClasses = {
    sm: "text-[10px]",
    md: "text-[11px]",
    lg: "text-[12px]",
  };

  const textColor = variant === "dark" ? "text-navy" : "text-white";
  const subtextColor = variant === "dark" ? "text-navy/80" : "text-white/80";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/logo.svg"
        alt="Logo ONG CES-MT"
        className={`${sizeClasses[size]} shrink-0 drop-shadow-sm object-contain`}
      />
      <span className="leading-tight">
        <span className={`block font-serif tracking-wide ${titleClasses[size]} ${textColor}`}>
          CES-MT
        </span>
        <span className={`block uppercase tracking-[0.18em] font-semibold ${subtitleClasses[size]} ${subtextColor}`}>
          Cristo é o Salvador
        </span>
      </span>
    </span>
  );
}

