export const Input = (props: any) => (
  <input 
    {...props} 
    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all mb-4 text-sm"
  />
);

// Reusable Button Component
export const Button = ({ children, variant = 'primary', ...props }: any) => {
  const styles = variant === 'primary' 
    ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
    : "bg-white border border-slate-300 hover:bg-slate-50 text-slate-700";
  
  return (
    <button {...props} className={`${styles} px-6 py-2 rounded-lg font-medium transition-all active:scale-95 text-sm`}>
      {children}
    </button>
  );
};