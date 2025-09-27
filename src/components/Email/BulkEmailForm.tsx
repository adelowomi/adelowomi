"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAdminEvents } from "@/hooks/useAdmin";
import LoadingSpinner from "../ui/LoadingSpinner";
import RichTextEditor from "../ui/RichTextEditor";

interface Recipient {
  email: string;
  name: string;
  type: 'attendee' | 'volunteer' | 'both';
  registeredAt: Date;
}

interface RecipientsData {
  event: {
    id: string;
    title: string;
  };
  recipients: {
    attendees: number;
    volunteers: number;
    total: number;
    list: Recipient[];
  };
}

const BulkEmailForm: React.FC = () => {
  const { events, loading: eventsLoading } = useAdminEvents();
  const searchParams = useSearchParams();
  const preSelectedEventId = searchParams.get("eventId");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [recipientType, setRecipientType] = useState<"attendees" | "volunteers" | "both">("both");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recipientsData, setRecipientsData] = useState<RecipientsData | null>(null);
  const [loadingRecipients, setLoadingRecipients] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Set pre-selected event when component mounts
  useEffect(() => {
    if (preSelectedEventId && events && events.length > 0) {
      const eventExists = events.find(event => event.id === preSelectedEventId);
      if (eventExists) {
        setSelectedEventId(preSelectedEventId);
      }
    }
  }, [preSelectedEventId, events]);

  // Load recipients when event is selected
  useEffect(() => {
    if (selectedEventId) {
      loadRecipients();
    } else {
      setRecipientsData(null);
    }
  }, [selectedEventId]);

  const loadRecipients = async () => {
    if (!selectedEventId) return;

    setLoadingRecipients(true);
    try {
      const response = await fetch(`/api/emails/recipients/${selectedEventId}`);
      if (response.ok) {
        const data = await response.json();
        setRecipientsData(data);
      } else {
        console.error('Failed to load recipients');
      }
    } catch (error) {
      console.error('Error loading recipients:', error);
    } finally {
      setLoadingRecipients(false);
    }
  };

  const getRecipientCount = () => {
    if (!recipientsData) return 0;

    switch (recipientType) {
      case 'attendees':
        return recipientsData.recipients.attendees;
      case 'volunteers':
        return recipientsData.recipients.volunteers;
      case 'both':
        return recipientsData.recipients.total;
      default:
        return 0;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEventId || !subject || !message) {
      alert('Please fill in all required fields');
      return;
    }

    const recipientCount = getRecipientCount();
    if (recipientCount === 0) {
      alert('No recipients found for the selected criteria');
      return;
    }

    const confirmed = confirm(
      `Are you sure you want to send this email to ${recipientCount} recipient(s)?`
    );

    if (!confirmed) return;

    setSending(true);
    setResult(null);

    try {
      const response = await fetch('/api/emails/send-bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: selectedEventId,
          recipientType,
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
        setSubject("");
        setMessage("");
      } else {
        setResult({
          success: false,
          error: data.error || 'Failed to send emails'
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

  if (eventsLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Selection */}
        <div>
          <label className="block mb-2 text-sm font-medium text-primary">
            Select Event *
          </label>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#732383] focus:border-transparent"
            required
          >
            <option value="">Choose an event...</option>
            {events?.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title} - {new Date(event.date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        {/* Recipients Info */}
        {selectedEventId && (
          <div className="p-4 bg-gray-800 rounded-lg">
            {loadingRecipients ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : recipientsData ? (
              <div>
                <h3 className="mb-3 text-lg font-medium text-primary">
                  Recipients for "{recipientsData.event.title}"
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-400">
                      {recipientsData.recipients.attendees}
                    </div>
                    <div className="text-sm text-gray-400">Attendees</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">
                      {recipientsData.recipients.volunteers}
                    </div>
                    <div className="text-sm text-gray-400">Volunteers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">
                      {recipientsData.recipients.total}
                    </div>
                    <div className="text-sm text-gray-400">Total Unique</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center text-gray-400">
                No recipient data available
              </div>
            )}
          </div>
        )}

        {/* Recipient Type Selection */}
        <div>
          <label className="block mb-2 text-sm font-medium text-primary">
            Send To *
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="recipientType"
                value="attendees"
                checked={recipientType === "attendees"}
                onChange={(e) => setRecipientType(e.target.value as any)}
                className="mr-2 text-[#732383] focus:ring-[#732383]"
              />
              <span className="text-white">
                Attendees only ({recipientsData?.recipients.attendees || 0})
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="recipientType"
                value="volunteers"
                checked={recipientType === "volunteers"}
                onChange={(e) => setRecipientType(e.target.value as any)}
                className="mr-2 text-[#732383] focus:ring-[#732383]"
              />
              <span className="text-white">
                Volunteers only ({recipientsData?.recipients.volunteers || 0})
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="recipientType"
                value="both"
                checked={recipientType === "both"}
                onChange={(e) => setRecipientType(e.target.value as any)}
                className="mr-2 text-[#732383] focus:ring-[#732383]"
              />
              <span className="text-white">
                Both attendees and volunteers ({recipientsData?.recipients.total || 0})
              </span>
            </label>
          </div>
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
            disabled={sending || !selectedEventId || getRecipientCount() === 0}
            className="px-6 py-2 bg-[#732383] hover:bg-[#732383]/80 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {sending && <LoadingSpinner />}
            {sending ? 'Sending...' : `Send to ${getRecipientCount()} recipient(s)`}
          </button>
        </div>
      </form>

      {/* Result Display */}
      {result && (
        <div className={`p-4 rounded-lg ${result.success ? 'bg-green-900/20 border border-green-500' : 'bg-red-900/20 border border-red-500'}`}>
          {result.success ? (
            <div>
              <h3 className="mb-2 text-lg font-medium text-green-400">
                ✅ Emails Sent Successfully!
              </h3>
              <div className="space-y-1 text-sm text-gray-300">
                <p>Total Recipients: {result.totalRecipients}</p>
                <p>Successful Batches: {result.successfulBatches}</p>
                {result.failedBatches > 0 && (
                  <p className="text-yellow-400">Failed Batches: {result.failedBatches}</p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="mb-2 text-lg font-medium text-red-400">
                ❌ Failed to Send Emails
              </h3>
              <p className="text-sm text-gray-300">{result.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BulkEmailForm;
