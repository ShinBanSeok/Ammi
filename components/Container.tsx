import { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  return <div className="mx-auto w-full max-w-[1200px] px-5">{children}</div>;
}
