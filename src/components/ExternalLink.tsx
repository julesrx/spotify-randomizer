import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  to: string;
  title?: string;
}

export default function ExternalLink({ children, to, title }: Props) {
  return (
    <Link target="_blank" rel="nofollow" to={to} title={title}>
      {children}
    </Link>
  );
}
