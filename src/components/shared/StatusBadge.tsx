import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';

type Status = 'pending' | 'verified' | 'rejected' | 'classified' | 'request-sent' | 'recycled' | 'accepted' | 'completed';

interface StatusBadgeProps {
  status: Status;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<Status, { 
  label: string; 
  bg: string; 
  text: string; 
  border: string;
  icon: React.ReactNode;
}> = {
  pending: { 
    label: 'Pending', 
    bg: 'bg-amber-50 dark:bg-amber-950/40', 
    text: 'text-amber-700 dark:text-amber-400', 
    border: 'border-amber-200/80 dark:border-amber-800/60',
    icon: <Clock className="h-3.5 w-3.5" />
  },
  verified: { 
    label: 'Verified', 
    bg: 'bg-teal-50 dark:bg-teal-950/40', 
    text: 'text-teal-700 dark:text-teal-400', 
    border: 'border-teal-200/80 dark:border-teal-800/60',
    icon: <CheckCircle className="h-3.5 w-3.5" />
  },
  rejected: { 
    label: 'Rejected', 
    bg: 'bg-red-50 dark:bg-red-950/40', 
    text: 'text-red-700 dark:text-red-400', 
    border: 'border-red-200/80 dark:border-red-800/60',
    icon: <XCircle className="h-3.5 w-3.5" />
  },
  classified: { 
    label: 'Classified', 
    bg: 'bg-blue-50 dark:bg-blue-950/40', 
    text: 'text-blue-700 dark:text-blue-400', 
    border: 'border-blue-200/80 dark:border-blue-800/60',
    icon: <CheckCircle className="h-3.5 w-3.5" />
  },
  'request-sent': { 
    label: 'Request Sent', 
    bg: 'bg-purple-50 dark:bg-purple-950/40', 
    text: 'text-purple-700 dark:text-purple-400', 
    border: 'border-purple-200/80 dark:border-purple-800/60',
    icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />
  },
  recycled: { 
    label: 'Recycled', 
    bg: 'bg-teal-50 dark:bg-teal-950/40', 
    text: 'text-teal-700 dark:text-teal-400', 
    border: 'border-teal-200/80 dark:border-teal-800/60',
    icon: <CheckCircle className="h-3.5 w-3.5" />
  },
  accepted: { 
    label: 'Accepted', 
    bg: 'bg-teal-50 dark:bg-teal-950/40', 
    text: 'text-teal-700 dark:text-teal-400', 
    border: 'border-teal-200/80 dark:border-teal-800/60',
    icon: <CheckCircle className="h-3.5 w-3.5" />
  },
  completed: { 
    label: 'Completed', 
    bg: 'bg-teal-50 dark:bg-teal-950/40', 
    text: 'text-teal-700 dark:text-teal-400', 
    border: 'border-teal-200/80 dark:border-teal-800/60',
    icon: <CheckCircle className="h-3.5 w-3.5" />
  },
};

const sizeClasses = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-3.5 py-1.5 text-base',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium border',
        config.bg,
        config.text,
        config.border,
        sizeClasses[size]
      )}
    >
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;
