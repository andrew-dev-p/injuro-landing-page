import { cn } from "@/lib/utils";

interface PlusMinusIconProps {
  isOpen?: boolean;
  className?: string;
}

export const PlusMinusIcon = ({
  isOpen = false,
  className,
}: PlusMinusIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
    >
      {/* Horizontal line - always visible */}
      <path
        d="M19.002 12.002H5"
        stroke="#222A2F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Vertical line - rotates 90deg and fades out when open */}
      <path
        d="M12.001 5V19.002"
        stroke="#222A2F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: `rotate(${isOpen ? 90 : 0}deg)`,
          transformOrigin: "center",
          opacity: isOpen ? 0 : 1,
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
      />
    </svg>
  );
};
