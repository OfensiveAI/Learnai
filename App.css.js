import React, { useState } from 'react';
import './App.css';

function App() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAskAI = async () => {
        setLoading(true);
        try {
            const res = await fetch('/ask-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });
            const data = await res.json();
            setResponse(data.response || 'Error retrieving response.');
        } catch (error) {
            setResponse('Error connecting to AI service.');
        }
        setLoading(false);
    };

    return (
        <div className="App">
            <h1 className="title">AI Learning App</h1>
            <textarea
                className="input-box"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask anything about AI..."
            />
            <button className="ask-button" onClick={handleAskAI} disabled={loading}>
                {loading ? 'Thinking...' : 'Ask AI'}
            </button>
            <div className="response-box">{response}</div>
        </div>
    );
}

export default App;
