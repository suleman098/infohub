const Navbutton = ({ onClick, ariaLabel, children }) => {
  return (
    <button
      className="btn btn-circle btn-outline text-black"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Navbutton;
