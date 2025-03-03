"use client";

import Link from "next/link";
import { ReactNode } from "react";
import "@/scss/button.scss";

type CommonButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export const CommonButton = ({
  href,
  children,
  className,
}: CommonButtonProps) => {
  return (
    <Link href={href} className={`button ${className}`}>
      <span>{children}</span>
    </Link>
  );
};
