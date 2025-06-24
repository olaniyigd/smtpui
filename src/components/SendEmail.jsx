import React, { useState } from 'react';
import './SendEmail.css'; // Import custom CSS

const SendEmailForm = () => {
  const [formData, setFormData] = useState({ to: '', subject: '', message: '' });
  const [pdfFile, setPdfFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    const data = new FormData();
    data.append('to', formData.to);
    data.append('subject', formData.subject);
    data.append('message', formData.message);
    if (pdfFile) {
      data.append('pdf', pdfFile);
    }

    try {
      const res = await fetch('https://smtp-2-z2yv.onrender.com/send-email', {
        method: 'POST',
        body: data // Don't set Content-Type when using FormData
      });

      const result = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: result.message });
        setFormData({ to: '', subject: '', message: '' });
        setPdfFile(null);
      } else {
        setStatus({ type: 'danger', message: result.error });
      }
    } catch (err) {
      setStatus({ type: 'danger', message: 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h2 className="form-title">Send Email</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="to">To</label>
          <input type="email" id="to" value={formData.to} onChange={handleChange} required />

          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" value={formData.subject} onChange={handleChange} required />

          <label htmlFor="message">Message</label>
          <textarea id="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>

          <label htmlFor="pdf">Attach PDF (optional)</label>
          <input type="file" id="pdf" accept="application/pdf" onChange={handleFileChange} />

          {pdfFile && (
            <div className="file-preview">
              <strong>Selected File:</strong> {pdfFile.name}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>

          {status && (
            <div className={`status ${status.type}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SendEmailForm;
