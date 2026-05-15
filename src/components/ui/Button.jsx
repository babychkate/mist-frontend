const Button = ({ children, isLoading, ...props }) => {
  return (
    <button
      disabled={isLoading}
      className="w-full py-3 px-5 rounded-full text-white text-[14px] font-semibold transition-all disabled:opacity-50 cursor-pointer hover:-translate-y-px"
      style={{
        background: 'linear-gradient(135deg,#E8799A,#D63384)',
        boxShadow: '0 8px 24px rgba(214,51,132,0.28)',
        fontFamily: "'Onest', sans-serif",
      }}
      {...props}
    >
      {isLoading ? 'Завантаження...' : children}
    </button>
  );
};

export default Button;