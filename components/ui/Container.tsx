import { cn } from "@/lib/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-layout px-[var(--grid-gutter-mobile)] md:px-[var(--grid-gutter)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
