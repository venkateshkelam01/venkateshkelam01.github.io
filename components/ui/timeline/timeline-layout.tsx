import React, { ReactNode } from 'react';

interface TimelineLayoutProps {
  children: ReactNode;
}

export function TimelineLayout({ children }: TimelineLayoutProps) {
  return (
    <ol className="relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 md:before:left-1/2 before:border-l before:border-gray-200 dark:before:border-gray-700 w-full md:w-3/4">
      {children}
    </ol>
  );
}
