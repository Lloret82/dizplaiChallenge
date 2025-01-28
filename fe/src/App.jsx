import React, { useEffect, useState } from 'react';
import PollSelector from './components/PollSelector';
import Poll from './components/Poll';
import PollResults from './components/PollResults';
import CreatePollModal from './components/CreatePollModal';

function App() {
  // ========== State ==========
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [resultsData, setResultsData] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // ========== Fetch Polls on Mount ==========
  useEffect(() => {
    fetchPolls();
  }, []);

  // Get all polls from API
  const fetchPolls = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/polls');
      const data = await res.json();
      setPolls(data);
      if (data.length > 0) {
        loadPoll(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching polls:', error);
    }
  };

  const loadPoll = async (pollId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/polls/${pollId}`);
      const pollData = await res.json();
      setSelectedPoll(pollData);
      setResultsData(null);
      setSelectedOptionId(null);
    } catch (error) {
      console.error('Error fetching poll:', error);
    }
  };

  const castVote = async () => {
    if (!selectedPoll || !selectedOptionId) return;
    try {
      await fetch(`http://localhost:4000/api/polls/${selectedPoll.id}/votes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId: selectedOptionId }),
      });
      loadResults(selectedPoll.id);
    } catch (error) {
      console.error('Error casting vote:', error);
    }
  };

  const loadResults = async (pollId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/polls/${pollId}/votes`);
      const data = await res.json();
      setResultsData(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handlePollCreated = () => {
    setShowCreateModal(false);
    fetchPolls();
  };

  // ========== Main Layout ==========

  return (
    <div className="min-h-screen flex flex-col bg-[url('/bg.jpg')] bg-no-repeat bg-cover bg-center" >
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-white text-purple-800 font-semibold py-2 px-4 rounded shadow hover:bg-gray-200"
        >
          Create New Poll
        </button>

        {polls.length > 0 ? (
          <PollSelector
            polls={polls}
            selectedPollId={selectedPoll ? selectedPoll.id : ''}
            onSelectPoll={loadPoll}
          />
        ) : (
          <span className="text-white">No Polls Found</span>
        )}
      </div>

      {/* Conditional Renders */}
      {resultsData ? (
        <PollResults
          resultsData={resultsData}
          onBackToPoll={() => setResultsData(null)}
          onBackToList={() => {
            setSelectedPoll(null);
            setResultsData(null);
          }}
        />
      ) : selectedPoll ? (
        <Poll
          poll={selectedPoll}
          selectedOptionId={selectedOptionId}
          setSelectedOptionId={setSelectedOptionId}
          onSubmitVote={castVote}
          onBack={() => {
            setSelectedPoll(null);
          }}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-xl">No poll selected</p>
        </div>
      )}

      <CreatePollModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPollCreated={handlePollCreated}
      />
    </div>
  );
}

export default App;