interface PlatformBadgeProps {
  platform: 'shopify' | 'amazon' | 'myntra' | 'flipkart';
  children: React.ReactNode;
}

const PlatformBadge = ({ platform, children }: PlatformBadgeProps) => {
  return (
    <span className={`platform-badge platform-${platform}`}>
      {children}
    </span>
  );
};

export default PlatformBadge;