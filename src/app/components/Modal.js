"use client";

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        {children}
        <button className="btn btn-secondary mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
