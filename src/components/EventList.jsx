import React, { useEffect, useState } from 'react'

export default function EventList({ onSelect }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadEvents = async () => {
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/events`)
      if (!res.ok) throw new Error('Failed to load events')
      const data = await res.json()
      setEvents(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  if (loading) return <p className="text-blue-200">Loading events...</p>
  if (error) return <p className="text-red-300">{error}</p>

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {events.map((ev) => (
        <div key={ev.id} className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
          <h3 className="text-white font-semibold text-lg">{ev.title}</h3>
          <p className="text-blue-200/80 text-sm mt-1">{new Date(ev.date).toLocaleString()}</p>
          <p className="text-blue-200/80 text-sm">{ev.location}</p>
          {ev.capacity && <p className="text-blue-300 text-xs">Capacity: {ev.capacity}</p>}
          {ev.description && <p className="text-blue-200/80 mt-2 line-clamp-3">{ev.description}</p>}
          <button onClick={() => onSelect && onSelect(ev)} className="mt-3 text-sm text-white bg-blue-600 hover:bg-blue-500 rounded px-3 py-1">RSVP</button>
        </div>
      ))}
      {events.length === 0 && (
        <div className="text-blue-200/80">No events yet. Create the first one above.</div>
      )}
    </div>
  )
}
