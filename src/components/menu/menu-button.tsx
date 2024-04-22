import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

type Props = {
  icon?: LucideIcon;
  onClick?: () => void;
  isSelected?: boolean;
  children?: React.ReactNode;
};

export const MenuButton = ({
  icon: Icon,
  onClick,
  isSelected,
  children,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'p-2 rounded-full bg-gray-200',
        isSelected && 'border-2 border-green-500 '
      )}
    >
      {Icon ? <Icon /> : children}
    </button>
  );
};
