import {
  IconArrowRight,
  IconTrendingDown,
  IconTrendingUp,
} from '@tabler/icons-react';
export const getStatus = (value: string) => {
  switch (value) {
    case 'Ongoing':
    case 'pending':
    case 'Inactive':
    case 'REQUESTED':
    case 'Started':
    case 'Processing':
      return {
        icon: <IconArrowRight />,
        color: 'primary.2',
      };
    case 'Finished':
    case 'approved':
    case 'PRESENT':
    case 'APPROVED':
    case 'Delivered':
    case 'Paid':
      return {
        icon: <IconTrendingUp />,
        color: 'success.2',
      };
    case 'Declined':
    case 'rejected':
    case 'ABSENT':
    case 'EMERGENCY':
    case 'REJECTED':
    case 'Not Started':
    case 'Not Paid':
      return {
        icon: <IconTrendingDown />,
        color: 'error.2',
      };
    default:
      return {
        icon: <IconArrowRight />,
        color: 'primary.1',
      };
  }
};

export function formatFileSize(bytes?: number): string {
  if (bytes === undefined || bytes === null) return 'N/A';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}
