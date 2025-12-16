import React from 'react';
import { cn } from '@/lib/utils';

interface MaterialBadgeProps {
  material: string;
  showConfidence?: boolean;
  confidence?: number;
  isPrimary?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const materialColors: Record<string, { bg: string; text: string; border: string }> = {
  PVC: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Aluminum: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
  Multilayer: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  HDPE: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  PP: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  Unknown: { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border' },
};

const sizeClasses = { sm: 'px-2 py-0.5 text-xs', md: 'px-3 py-1 text-sm', lg: 'px-4 py-1.5 text-base' };

const MaterialBadge: React.FC<MaterialBadgeProps> = ({ material, showConfidence = false, confidence, isPrimary = false, size = 'md' }) => {
  const colors = materialColors[material] || materialColors.Unknown;
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full font-medium border', colors.bg, colors.text, colors.border, sizeClasses[size], isPrimary && 'ring-2 ring-primary/30')}>
      {isPrimary && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      <span>{material}</span>
      {showConfidence && confidence && <span className="opacity-70">({Math.round(confidence)}%)</span>}
    </span>
  );
};

export default MaterialBadge;