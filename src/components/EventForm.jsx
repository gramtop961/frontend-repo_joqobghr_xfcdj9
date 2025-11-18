import React, { useState } from 'react'

const initialState = {
  title: '',
  description: '',
  date: '',
  location: '',
  organizer: '',
  capacity: ''
}

export default function EventForm({ onCreated }) {
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const payload = {
        ...form,
        capacity: form.capacity ? Number(form.capacity) : null,
        date: new Date(form.date).toISOString(),
      }
      const res = await fetch(`${baseUrl}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      const data = await res.json()
      setForm(initialState)
      onCreated && onCreated(data.id)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4 md:p-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Title</label>
          <input name="title" value={form.title} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Date & Time</label>
          <input type="datetime-local" name="date" value={form.date} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Location</label>
          <input name="location" value={form.location} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Organizer</label>
          <input name="organizer" value={form.organizer} onChange={handleChange} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Capacity</label>
          <input type="number" name="capacity" value={form.capacity} onChange={handleChange} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="3" className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      {error && <p className="text-red-300 text-sm">{error}</p>}
      <button disabled={loading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold px-4 py-2 rounded">
        {loading ? 'Creating...' : 'Create Event'}
      </button>
    </form>
  )
}
