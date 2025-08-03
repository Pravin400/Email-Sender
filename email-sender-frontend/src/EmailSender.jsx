// Frontend: React App for Sending Email Pranks with Max 50 Loop Limit
// This version includes transition effects and limits repeat to 1–50

import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function EmailPrankSender() {
  const [emails, setEmails] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [repeat, setRepeat] = useState(1);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  // Send data to backend via POST
  const handleSend = async () => {
    setResponse('');
    setError('');

    if (repeat < 1 || repeat > 50) {
      setError('Repeat limit must be between 1 and 50.');
      return;
    }

    try {
      const emailList = emails.split(',').map(e => e.trim());
      const payload = {
        recipients: emailList,
        subject,
        message,
        repeat: parseInt(repeat)
      };
      const res = await axios.post('http://localhost:8080/api/email/send', payload);
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to send emails.');
    }
  };

  return (
    <motion.div
      className="p-8 max-w-xl mx-auto bg-white rounded-2xl shadow-xl mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Email Prank Sender </h2>

      <div className="mb-4">
        <label className="block font-semibold">Recipient Emails (comma separated)</label>
        <input type="text" className="border p-2 w-full rounded" value={emails} onChange={e => setEmails(e.target.value)} />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Subject</label>
        <input type="text" className="border p-2 w-full rounded" value={subject} onChange={e => setSubject(e.target.value)} />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Message</label>
        <textarea className="border p-2 w-full rounded" value={message} onChange={e => setMessage(e.target.value)}></textarea>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Repeat Times (1 to 50)</label>
        <input type="number" className="border p-2 w-full rounded" value={repeat} min={1} max={50} onChange={e => setRepeat(e.target.value)} />
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full" onClick={handleSend}>
        Send Emails
      </button>

      <AnimatePresence>
        {response && (
          <motion.div
            className="mt-4 text-green-600 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {response}
          </motion.div>
        )}
        {error && (
          <motion.div
            className="mt-4 text-red-600 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}