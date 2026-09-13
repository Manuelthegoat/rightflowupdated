import { useState, useEffect } from "react";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("rejects-popup-seen");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsOpen(true), 800); // slight delay feels less jarring
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem("rejects-popup-seen", "true");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://app.kit.com/forms/9897486/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email_address: email }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="newsletter-overlay" onClick={closePopup}>
      <div className="newsletter-modal" onClick={(e) => e.stopPropagation()}>
        <button className="newsletter-close" onClick={closePopup} aria-label="Close">
          &times;
        </button>

        <div className="newsletter-image" />

        <div className="newsletter-content">
          <h2>Join the REJECTS</h2>
          <p>Join the Rejects. Get early access to music, videos, merch, and everything first.</p>

          {status === "success" ? (
            <p className="newsletter-success">
              Success! Now check your email to confirm your subscription.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                required
                placeholder="Email Address"
                aria-label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Enter the Jungle"}
              </button>
              {status === "error" && (
                <p className="newsletter-error">Something went wrong — try again.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
