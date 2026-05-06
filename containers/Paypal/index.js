import { useState, useEffect, useRef } from 'react';

// Popup Modal Component
const PopupModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  // Close modal if clicked outside of the modal content
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close the modal if clicked outside
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }
         .modal-content {
          background: white;
          position: absolute;
          top: 20%;
          right: 10%; /* Adjust as needed for better alignment */
          width: 300px; /* Small width for the modal */
          height: 400px; /* Small height for the modal */
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center; /* Center content horizontally */
          justify-content: center; /* Center content vertically */
          padding: 20px;
        }
        .close-button {
        position: absolute;
        color: black;
        border-radius: 12px;
        top: 10px;
        right: 10px;
        background: red;
        border: none;
        font-size: 2rem; /* Adjusted to fit better */
        cursor: pointer;
        padding: 5px 10px;
    }
      `}</style>
    </div>
  );
};

// Main PayPal Donation Component with Popup
const PayPalDonationPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (isPopupOpen) {
      const script = document.createElement('script');
      script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js';
      script.charset = 'UTF-8';
      script.onload = () => {
        PayPal.Donation.Button({
          env: 'production',
          hosted_button_id: 'XWMFXQQ27GPHL',
          image: {
            src: 'https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif',
            alt: 'Donate with PayPal button',
            title: 'PayPal - The safer, easier way to pay online!',
          },
        }).render('#donate-button');
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isPopupOpen]);

  const handlePayPalClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <button onClick={handlePayPalClick} className="donate-button">
        <img src="/heart.svg" alt="Donate" className="heart-icon" />
      </button>
  
      {/* Popup Modal */}
      <PopupModal isOpen={isPopupOpen} onClose={handleClosePopup}>
      <div className="modal-content">
        <div id="donate-button-container">
          <div id="donate-button"></div>
        </div>
        <p className="support-text">Support me if you can</p>
      </div>
    </PopupModal>
  
    <style jsx>{`
        .donate-button {
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            display: flex;
            justify-content: center; /* Center horizontally */
            align-items: center; /* Center vertically if needed */
            margin: 0 auto; /* Center the button itself within its container */
        }
        .heart-icon {
            width: 50px; /* Adjust size as needed */
            height: 50px; /* Adjust size as needed */
            border-radius: 50%; /* Make it circular if the image is heart-shaped */
            display: block;
            object-fit: cover; /* Ensure image covers the container */
        }
        .heart-icon:hover {
            opacity: 0.8; /* Add hover effect */
        }
        .support-text {
            margin-top: 20px; /* Adjust space above the text */
            width: auto;
            font-size: 16px; /* Adjust size as needed */
            font-weight: bold;

            color: #333; /* Adjust text color as needed */
        }
        `}</style>
    </div>
  );
  
};

export default PayPalDonationPopup;
