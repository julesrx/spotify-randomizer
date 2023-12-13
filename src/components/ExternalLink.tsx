import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  to: string;
  title?: string;
}

export default function ExternalLink({ children, to, title }: Props) {
  return (
    <a target="_blank" rel="nofollow" href={to} title={title}>
      {children}
    </a>
  );
}
