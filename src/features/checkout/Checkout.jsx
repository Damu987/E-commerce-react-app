import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { calculateTotals } from "../../utils/cartUtils";
import Toast from "../../components/common/Toast";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const { totalItems, totalPrice, totalSavings } = calculateTotals(cartItems);

  const isFirstOrder = !localStorage.getItem("hasOrderedBefore");
  const DELIVERY_CHARGE = isFirstOrder ? 0 : 50;
  const finalTotal = totalPrice + DELIVERY_CHARGE;

  const [showToast, setShowToast] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Address state
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    city: "",
    pincode: "",
  });

  // UPI states
  const [upiId, setUpiId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isUpiVerified, setIsUpiVerified] = useState(false);

  // Card states
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [isCardVerifying, setIsCardVerifying] = useState(false);
  const [isCardVerified, setIsCardVerified] = useState(false);

  const [errors, setErrors] = useState({});

  const formatPrice = (price) =>
    `₹${Math.round(price).toLocaleString("en-IN")}`;

  // Mask card number
  const handleCardChange = (e) => {
    let { name, value } = e.target;

    if (name === "number") {
      value = value.replace(/\D/g, "").slice(0, 16);
      value = value.replace(/(.{4})/g, "$1 ").trim();
    }

    setCardData({ ...cardData, [name]: value });
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname) newErrors.fullname = "Required";
    if (!formData.address) newErrors.address = "Required";
    if (!formData.city) newErrors.city = "Required";

    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Invalid pincode";
    }

    if (paymentMethod === "upi") {
      if (!upiId.includes("@")) newErrors.upi = "Enter valid UPI ID";
      if (!isUpiVerified) newErrors.upi = "Please verify UPI";
    }

    if (paymentMethod === "card") {
      const cleanNumber = cardData.number.replace(/\s/g, "");

      if (cleanNumber.length !== 16) newErrors.number = "Invalid card number";
      if (!cardData.name) newErrors.name = "Required";
      if (!cardData.expiry) newErrors.expiry = "Required";
      if (cardData.cvv.length < 3) newErrors.cvv = "Invalid CVV";
      if (!isCardVerified) newErrors.card = "Please verify card";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // UPI verify
  const handleVerifyUPI = () => {
    if (!upiId.includes("@")) {
      setErrors({ upi: "Enter valid UPI ID" });
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setIsUpiVerified(true);
      alert("UPI Verified");
    }, 1500);
  };

  // Card verify
  const handleVerifyCard = () => {
    const cleanNumber = cardData.number.replace(/\s/g, "");

    if (cleanNumber.length !== 16) {
      setErrors({ number: "Card must be 16 digits" });
      return;
    }

    setIsCardVerifying(true);

    setTimeout(() => {
      setIsCardVerifying(false);
      setIsCardVerified(true);
      alert("Card Verified");
    }, 1500);
  };

  //ORDER CONFIRM (WITH LOADING)
  const confirmOrder = async () => {
    setPlacingOrder(true);

    await new Promise((res) => setTimeout(res, 1200)); // simulate API

    localStorage.setItem("hasOrderedBefore", "true");
    clearCart();
    setShowToast(true);
    setShowConfirm(false);

    setPlacingOrder(false);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* LEFT SIDE */}
        <div className="checkout-left">

          <h2>Shipping Address</h2>

          <input
            placeholder="Full Name"
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
            disabled={placingOrder}
          />
          {errors.fullname && <p className="error">{errors.fullname}</p>}

          <input
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            disabled={placingOrder}
          />
          {errors.address && <p className="error">{errors.address}</p>}

          <input
            placeholder="City"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
            disabled={placingOrder}
          />
          {errors.city && <p className="error">{errors.city}</p>}

          <input
            placeholder="Pincode"
            value={formData.pincode}
            onChange={(e) =>
              setFormData({ ...formData, pincode: e.target.value })
            }
            disabled={placingOrder}
          />
          {errors.pincode && <p className="error">{errors.pincode}</p>}

          {/* PAYMENT */}
          <h2>Payment Method</h2>

          <div className="payment-options">
            <label>
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={placingOrder}
              />
              Cash on Delivery
            </label>

            <label>
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={placingOrder}
              />
              UPI
            </label>

            <label>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={placingOrder}
              />
              Card
            </label>
          </div>

          {/* UPI */}
          {paymentMethod === "upi" && (
            <div className="upi-section">
              <input
                placeholder="example@upi"
                value={upiId}
                onChange={(e) => {
                  setUpiId(e.target.value);
                  setIsUpiVerified(false);
                }}
                disabled={placingOrder}
              />

              {errors.upi && <p className="error">{errors.upi}</p>}

              <button onClick={handleVerifyUPI} disabled={placingOrder}>
                {isVerifying
                  ? "Verifying..."
                  : isUpiVerified
                  ? "Verified"
                  : "Verify UPI"}
              </button>
            </div>
          )}

          {/* CARD */}
          {paymentMethod === "card" && (
            <div className="card-section">

              <input
                placeholder="Card Number"
                value={cardData.number}
                onChange={(e) =>
                  handleCardChange({ ...e, target: { ...e.target, name: "number" } })
                }
                disabled={placingOrder}
              />
              {errors.number && <p className="error">{errors.number}</p>}

              <input
                placeholder="Card Holder Name"
                onChange={(e) =>
                  handleCardChange({ ...e, target: { ...e.target, name: "name" } })
                }
                disabled={placingOrder}
              />
              {errors.name && <p className="error">{errors.name}</p>}

              <input
                placeholder="MM/YY"
                onChange={(e) =>
                  handleCardChange({ ...e, target: { ...e.target, name: "expiry" } })
                }
                disabled={placingOrder}
              />
              {errors.expiry && <p className="error">{errors.expiry}</p>}

              <input
                placeholder="CVV"
                onChange={(e) =>
                  handleCardChange({ ...e, target: { ...e.target, name: "cvv" } })
                }
                disabled={placingOrder}
              />
              {errors.cvv && <p className="error">{errors.cvv}</p>}

              <button onClick={handleVerifyCard} disabled={placingOrder}>
                {isCardVerifying
                  ? "Verifying..."
                  : isCardVerified
                  ? "Verified"
                  : "Verify Card"}
              </button>

              {errors.card && <p className="error">{errors.card}</p>}
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right">

          <h2>Order Summary</h2>

          <p>Items: {totalItems}</p>
          <p>Subtotal: {formatPrice(totalPrice)}</p>

          {totalSavings > 0 && (
            <p>You save: {formatPrice(totalSavings)}</p>
          )}

          <p>
            Delivery:{" "}
            {DELIVERY_CHARGE === 0 ? "Free" : formatPrice(DELIVERY_CHARGE)}
          </p>

          <p>
            Total: {formatPrice(finalTotal)}
          </p>

          <button
            disabled={placingOrder}
            onClick={() => validateForm() && setShowConfirm(true)}
          >
            {placingOrder ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
          <p>Confirm Order?</p>
          
          <div className="modal-actions">
          <button className="confirm-btn" onClick={confirmOrder} disabled={placingOrder}>
            {placingOrder ? "Placing Order..." : "Yes"}
          </button>

          <button onClick={() => setShowConfirm(false)} disabled={placingOrder}>
            No
          </button>
        </div>
       </div>
      </div>
      )}

      <Toast message="Order placed!" show={showToast} />
    </main>
  );
}