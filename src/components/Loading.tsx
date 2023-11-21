import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fullHeight?: boolean;
};

export default function Loading({ children, fullHeight }: Props) {
  return (
    <div className={`${fullHeight ? 'h-screen' : 'h-full'} flex justify-center items-center`}>
      <span className="text-xl">{children}</span>
    </div>
  );
}
