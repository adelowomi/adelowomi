"use client";

import React, { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import RichTextEditor from "../ui/RichTextEditor";

interface EmailResult {
  success: boolean;
  data?: any;
  recipient?: string;
  error?: string;
}

const IndividualEmailForm: React.FC = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<EmailResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!to || !subject || !message) {
      alert('Please fill in all required fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      alert('Please enter a valid email address');
      return;
    }

    const confirmed = confirm(
      `Are you sure you want to send this email to ${to}?`
    );

    if (!confirmed) return;

    setSending(true);
    setResult(null);

    try {
      const response = await fetch('/api/emails/send-individual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          ...data
        });
        // Reset form
        setTo("");
        setSubject("");
        setMessage("");
      } else {
        setResult({
          success: false,
          error: data.error || 'Failed to send email'
        });
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Network error occurred'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipient Email */}
        <div>
          <label className="block mb-2 text-sm font-medium text-primary">
            Recipient Email *
          </label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#732383] focus:border-transparent"
            placeholder="Enter recipient email address..."
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block mb-2 text-sm font-medium text-primary">
            Subject *
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#732383] focus:border-transparent"
            placeholder="Enter email subject..."
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-2 text-sm font-medium text-primary">
            Message *
          </label>
          <RichTextEditor
            value={message}
            onChange={setMessage}
            placeholder="Enter your message..."
          />
          <p className="mt-1 text-sm text-gray-400">
            Use the rich text editor to format your message with bold, italic, lists, links, and more.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={sending || !to || !subject || !message}
            className="px-6 py-2 bg-[#732383] hover:bg-[#732383]/80 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {sending && <LoadingSpinner />}
            {sending ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </form>

      {/* Result Display */}
      {result && (
        <div className={`p-4 rounded-lg ${result.success ? 'bg-green-900/20 border border-green-500' : 'bg-red-900/20 border border-red-500'}`}>
          {result.success ? (
            <div>
              <h3 className="mb-2 text-lg font-medium text-green-400">
                ✅ Email Sent Successfully!
              </h3>
              <p className="text-sm text-gray-300">
                Email has been sent to {result.recipient}
              </p>
            </div>
          ) : (
            <div>
              <h3 className="mb-2 text-lg font-medium text-red-400">
                ❌ Failed to Send Email
              </h3>
              <p className="text-sm text-gray-300">{result.error}</p>
            </div>
          )}
        </div>
      )}

      {/* Quick Tips */}
      <div className="p-4 border border-blue-500 rounded-lg bg-blue-900/20">
        <h3 className="mb-2 text-lg font-medium text-blue-400">
          💡 Quick Tips
        </h3>
        <ul className="space-y-1 text-sm text-gray-300">
          <li>• Use clear and descriptive subject lines</li>
          <li>• Keep your message concise and professional</li>
          <li>• Double-check the recipient email address before sending</li>
          <li>• Use the rich text editor to format your message with bold, italic, lists, and links</li>
          <li>• Preview your formatting before sending to ensure it looks professional</li>
        </ul>
      </div>
    </div>
  );
};

export default IndividualEmailForm;
