import { ReactNode } from 'react';

interface TimelineItemProps {
  title: string;
  subtitle?: string;
  dateText?: string;
  icon?: ReactNode;
  children: ReactNode;
  index: number;
}

export function TimelineItem({ title, subtitle, dateText, icon, children, index }: TimelineItemProps) {
  const isEven = index % 2 === 0;
  
  const liClass = `mb-10 relative w-full pl-8 md:w-1/2 ${
    isEven ? 'md:left-0 md:pl-0 md:pr-8' : 'md:left-1/2 md:pl-8'
  }`;
  
  // Icon positioning - left side on mobile, alternating on desktop with improved dark mode visibility
  const iconClass = `absolute top-0 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 bg-primary text-white dark:bg-gray-800 dark:text-primary rounded-full ring-4 ring-white dark:ring-gray-700 z-10 left-0 -translate-x-1/2 ${
    isEven ? 'md:right-0 md:left-auto md:translate-x-1/2 md:-translate-x-0' : 'md:left-0 md:-translate-x-1/2'
  }`;
  
  return (
    <li className={liClass}>
      <span className={iconClass}>{icon}</span>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-left">      
        <h3 className="mb-1 text-lg font-semibold">{title}</h3>
        {subtitle && <h4 className="mb-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</h4>}
        {dateText && (
          <time className="block mb-2 text-sm text-gray-500 dark:text-gray-400">{dateText}</time>
        )}
        <div className="text-sm text-gray-600 dark:text-gray-300">{children}</div>
      </div>
    </li>
  );
}
