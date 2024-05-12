import { type ReactNode } from 'react';

type HeaderProps = {
  children: ReactNode;
  image: {
    src: string;
    alt: string;
  };
};

export default function Header({ image, children }: HeaderProps) {
  return (
    <header>
      {children}
      <img {...image} />
    </header>
  );
}
