import type { ComponentProps, ReactNode } from "react";
import {
  Link as TanStackLink,
  Navigate as TanStackNavigate,
} from "@tanstack/react-router";

type LinkProps = {
  to: string;
  children?: ReactNode;
  className?: string;
  id?: string;
  "aria-label"?: string;
  onClick?: ComponentProps<"a">["onClick"];
  target?: string;
  rel?: string;
};

export function Link({ to, children, ...rest }: LinkProps) {
  return (
    <TanStackLink to={to} {...rest}>
      {children}
    </TanStackLink>
  );
}

export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  return <TanStackNavigate to={to} replace={replace} />;
}
