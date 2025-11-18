import React, { useState } from 'react'

export default function RSVPForm({ event, onSubmitted }) {
  const [form, setForm] = useState({ name: '', email: '', guests: 1, message: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: name === 'guests' ? Number(value) : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const payload = { ...form, event_id: event.id }
      const res = await fetch(`${baseUrl}/api/rsvps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || 'Failed to RSVP')
      }
      setForm({ name: '', email: '', guests: 1, message: '' })
      onSubmitted && onSubmitted()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!event) return null

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4 md:p-6">
      <h3 className="text-white font-semibold text-lg mb-3">RSVP for {event.title}</h3>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Your Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Guests</label>
          <input type="number" min="1" max="10" name="guests" value={form.guests} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Message (optional)</label>
          <textarea name="message" value={form.message} onChange={handleChange} rows="2" className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        {error && <p className="text-red-300 text-sm col-span-full">{error}</p>}
        <div className="col-span-full">
          <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold px-4 py-2 rounded">
            {loading ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </div>
      </form>
    </div>
  )
}
