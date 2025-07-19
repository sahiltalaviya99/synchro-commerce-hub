interface StatusBadgeProps {
  status: 'pending' | 'syncing' | 'success' | 'failed';
  children: React.ReactNode;
}

const StatusBadge = ({ status, children }: StatusBadgeProps) => {
  return (
    <span className={`status-badge status-${status}`}>
      {children}
    </span>
  );
};

export default StatusBadge;