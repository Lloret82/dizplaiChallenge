import React, { useState } from 'react';

export default function CreatePollModal({
  isOpen,
  onClose,
  onPollCreated,
}) {
  // Local state for the poll form
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState(null);

  if (!isOpen) return null; 

  const handleAddOption = () => {
    if (options.length < 7) {
      setOptions([...options, '']);
    }
  };

  const handleOptionChange = (idx, val) => {
    const updated = [...options];
    updated[idx] = val;
    setOptions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('http://localhost:4000/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, options }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create poll');
      }

      if (onPollCreated) onPollCreated(data);
      setQuestion('');
      setOptions(['', '']);
      onClose(); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-purple-900/90 rounded-lg shadow-lg w-full max-w-md mx-auto p-8 relative text-white">
        <button
          className="absolute top-2 right-2 text-3xl text-white hover:text-gray-300"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">Create a New Poll</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold text-lg">Question:</label>
          <input
            className="border border-white/50 bg-purple-800 text-white p-2 w-full rounded mb-6"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
            required
          />

          <label className="block mb-2 font-semibold text-lg">Options (2 to 7):</label>
          {options.map((opt, idx) => (
            <input
              key={idx}
              className="border border-white/50 bg-purple-800 text-white p-2 w-full rounded mb-4"
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              placeholder={`Option ${idx + 1}`}
              required
            />
          ))}

          {options.length < 7 && (
            <button
              type="button"
              onClick={handleAddOption}
              className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-2 rounded w-full mb-4"
            >
              + Add Option
            </button>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-white text-purple-800 font-bold px-6 py-3 rounded hover:bg-gray-200"
            >
              Create Poll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
