export default function Card({ className = "", children, ...props }) {
  return (
    <div className={`p-4 border rounded-lg shadow-md ${className}`} {...props}>
      {children}
    </div>
  );
}
