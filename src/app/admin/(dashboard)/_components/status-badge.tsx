type StatusProps = {
  status: string;
};

export function StatusBadge({ status }: StatusProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-[#fef2f2]/20 text-[#d7a333]';
      case 'Rejected':
        return 'bg-[#fef2f2]/20 text-[#d75233]';
      case 'Hired':
        return 'bg-[#ecfdf5]/20 text-[#064e3b]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`inline-block px-2 py-1 rounded-md text-sm font-medium ${getStatusStyles()}`}
    >
      {status}
    </span>
  );
}
