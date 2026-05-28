'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { getTopicLabel, type TopicOption } from '@/lib/topics';

interface TopicDropdownProps {
  options: TopicOption[];
  currentTopic: string;
  onChange: (topic: string) => void;
  locale: string;
  label: string;
}

export default function TopicDropdown({
  options,
  currentTopic,
  onChange,
  locale,
  label,
}: TopicDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.key === currentTopic) || options[0];

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (!selected) return null;

  return (
    <div ref={rootRef} className="relative z-20 flex items-center gap-3">
      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-500">
        {label}
      </span>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-w-32 items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-white/80 px-4 py-2.5 text-sm font-medium text-primary shadow-sm transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/80 dark:hover:bg-neutral-800"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">{getTopicLabel(selected, locale)}</span>
        <ChevronDownIcon
          className={`h-4 w-4 text-neutral-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-neutral-200 bg-white/95 p-2 shadow-lg shadow-neutral-900/10 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/95"
        >
          {options.map((option) => {
            const active = option.key === currentTopic;
            return (
              <button
                key={option.key}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(option.key);
                  setOpen(false);
                }}
                className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors duration-150 ${
                  active
                    ? 'bg-neutral-100 text-primary dark:bg-neutral-800'
                    : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800/70'
                }`}
              >
                {getTopicLabel(option, locale)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
