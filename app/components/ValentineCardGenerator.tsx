"use client";

import { useState } from "react";
import CardPreview from "./CardPreview";

export default function ValentineCardGenerator() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    recipient: "",
    message: "",
  });

  const validate = () => {
    let newErrors = { recipient: "", message: "" };
    let isValid = true;

    if (!recipient.trim()) {
      newErrors.recipient = "Recipient name is required";
      isValid = false;
    }

    if (!message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleReset = () => {
    setRecipient("");
    setMessage("");
    setErrors({ recipient: "", message: "" });
  };

  const handlePreview = () => {
    validate();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">

      {/* Input Section */}
      <div className="space-y-4">

        {/* Recipient */}
        <div>
          <label className="block text-sm font-medium">
            Recipient Name
          </label>

          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            onBlur={validate}
            placeholder="Enter recipient name"
            className="w-full border rounded p-2"
          />

          {errors.recipient && (
            <p className="text-red-500 text-sm mt-1">
              {errors.recipient}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium">
            Personal Message
          </label>

          <textarea
            value={message}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setMessage(e.target.value);
              }
            }}
            onBlur={validate}
            placeholder="Write your message"
            className="w-full border rounded p-2"
          />

          {/* Error */}
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message}
            </p>
          )}

          {/* Character Counter */}
          <div className="text-sm text-gray-500 mt-1 text-right">
            {message.length} / 500 characters
          </div>
        </div>

      </div>

      {/* Buttons */}
      <button
        onClick={handleReset}
        className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 rounded"
      >
        Clear Form
      </button>

      {/* Preview only when valid */}
      {recipient.trim() && message.trim() && (
        <CardPreview
          recipient={recipient}
          message={message}
        />
      )}
    </div>
  );
}
