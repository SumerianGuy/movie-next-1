import { useState, useEffect, useRef } from "react";

const PopupModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div ref={modalRef} style={styles.modal}>
        <button onClick={onClose} style={styles.closeBtn}>
          ×
        </button>

        {children}
      </div>
    </div>
  );
};

const CryptoDonationPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const walletAddress =
    "0x454eD57a7a8eB8fDdF7459C71003cA9D57711773";

  const copyAddress = async () => {
    await navigator.clipboard.writeText(walletAddress);
    alert("Wallet copied!");
  };

  return (
    <div>
      {/* Trigger button */}
      <button style={styles.donateBtn} onClick={() => setIsOpen(true)}>
        <img src="/assets/heart.svg" alt="donate" style={styles.heart} />
      </button>

      <PopupModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 style={styles.title}>Deposit ETH</h2>

        <p style={styles.text}>
          Please keep this site alive by donating ❤️
        </p>

        <div style={styles.walletBox}>{walletAddress}</div>

        <button style={styles.copyBtn} onClick={copyAddress}>
          Copy Address
        </button>

        {/* QR image with guaranteed space */}
        <img
          src="/assets/svgs/eth-qr.svg"
          alt="QR"
          style={styles.qr}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </PopupModal>
    </div>
  );
};

export default CryptoDonationPopup;

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  modal: {
    width: "360px",
    minHeight: "420px", // 🔥 prevents collapse completely
    background: "#121212",
    color: "white",
    borderRadius: "16px",
    padding: "24px",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "14px",

    position: "relative",

    // 🔥 DEBUG (remove later if you want)
    border: "1px solid rgba(255,255,255,0.1)",
  },

  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    padding: "4px 10px",
  },

  donateBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },

  heart: {
    width: "50px",
    height: "50px",
    display: "block",
  },

  title: {
    margin: 0,
  },

  text: {
    fontSize: "14px",
    color: "#ccc",
    textAlign: "center",
  },

  walletBox: {
    background: "#1f1f1f",
    padding: "12px",
    borderRadius: "10px",
    userSelect: "text",
    fontSize: "12px",
    wordBreak: "break-all",
    width: "100%",
  },

  copyBtn: {
    marginTop: "8px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  qr: {
    width: "220px",
    height: "220px", // 🔥 critical: prevents collapse
    objectFit: "contain",
    marginTop: "10px",
    background: "white",
    padding: "8px",
    borderRadius: "12px",
  },
};