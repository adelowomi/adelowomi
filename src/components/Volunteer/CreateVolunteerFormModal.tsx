"use client";

import React, { useState, useEffect } from "react";
import { QuestionType } from "@prisma/client";

interface Event {
  id: string;
  title: string;
}

interface Question {
  question: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
}

interface CreateVolunteerFormModalProps {
  onClose: () => void;
  onFormCreated: () => void;
}

const CreateVolunteerFormModal: React.FC<CreateVolunteerFormModalProps> = ({
  onClose,
  onFormCreated,
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [formData, setFormData] = useState({
    eventId: "",
    title: "",
    description: "",
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setEventsLoading(true);
      const response = await fetch("/api/admin/events");
      if (response.ok) {
        const result = await response.json();
        console.log("Events API response:", result);
        // The API returns { success: true, data: events, ... }
        const eventsData = result.data || [];
        console.log("Extracted events:", eventsData);
        setEvents(Array.isArray(eventsData) ? eventsData : []);
      } else {
        console.error("Failed to fetch events:", response.status);
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        type: QuestionType.TEXT,
        required: false,
        options: [],
      },
    ]);
  };

  const updateQuestion = (
    index: number,
    field: keyof Question,
    value: string | QuestionType | boolean | string[]
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    if (!updatedQuestions[questionIndex].options) {
      updatedQuestions[questionIndex].options = [];
    }
    updatedQuestions[questionIndex].options!.push("");
    setQuestions(updatedQuestions);
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options![optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = updatedQuestions[
      questionIndex
    ].options!.filter((_, i) => i !== optionIndex);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/volunteer-forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          questions: questions.map((q, index) => ({ ...q, order: index })),
        }),
      });

      if (response.ok) {
        onFormCreated();
      }
    } catch (error) {
      console.error("Error creating volunteer form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            Create Volunteer Form
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Event *
              </label>
              <select
                value={formData.eventId}
                onChange={(e) =>
                  setFormData({ ...formData, eventId: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-secondary"
                required
              >
                <option value="">
                  {eventsLoading ? "Loading events..." : "Select an event"}
                </option>
                {!eventsLoading &&
                  events.length > 0 &&
                  events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title}
                    </option>
                  ))}
                {!eventsLoading && events.length === 0 && (
                  <option disabled>No events available</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Form Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-secondary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-secondary"
              rows={3}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Questions</h3>
              <button
                type="button"
                onClick={addQuestion}
                className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Add Question
              </button>
            </div>

            <div className="space-y-4">
              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-white font-medium">
                      Question {questionIndex + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeQuestion(questionIndex)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Question Text *
                      </label>
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) =>
                          updateQuestion(
                            questionIndex,
                            "question",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-secondary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Question Type *
                      </label>
                      <select
                        value={question.type}
                        onChange={(e) =>
                          updateQuestion(
                            questionIndex,
                            "type",
                            e.target.value as QuestionType
                          )
                        }
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-secondary"
                      >
                        <option value={QuestionType.TEXT}>Text</option>
                        <option value={QuestionType.TEXTAREA}>Textarea</option>
                        <option value={QuestionType.EMAIL}>Email</option>
                        <option value={QuestionType.PHONE}>Phone</option>
                        <option value={QuestionType.MULTIPLE_CHOICE}>
                          Multiple Choice
                        </option>
                        <option value={QuestionType.CHECKBOX}>Checkbox</option>
                        <option value={QuestionType.DATE}>Date</option>
                        <option value={QuestionType.TIME}>Time</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={question.required}
                        onChange={(e) =>
                          updateQuestion(
                            questionIndex,
                            "required",
                            e.target.checked
                          )
                        }
                        className="mr-2"
                      />
                      <span className="text-gray-300">Required</span>
                    </label>
                  </div>

                  {question.type === QuestionType.MULTIPLE_CHOICE && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Options
                        </label>
                        <button
                          type="button"
                          onClick={() => addOption(questionIndex)}
                          className="text-secondary hover:text-secondary/80 text-sm"
                        >
                          Add Option
                        </button>
                      </div>
                      <div className="space-y-2">
                        {question.options?.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                updateOption(
                                  questionIndex,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-secondary"
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                removeOption(questionIndex, optionIndex)
                              }
                              className="text-red-400 hover:text-red-300 px-2"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Form"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVolunteerFormModal;
