import React, { useState } from 'react'
import Hero from './components/Hero'
import EventForm from './components/EventForm'
import EventList from './components/EventList'
import RSVPForm from './components/RSVPForm'

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [lastCreatedId, setLastCreatedId] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)]" />
      <div className="relative max-w-5xl mx-auto px-4 py-10">
        <Hero />

        <div className="grid md:grid-cols-5 gap-6 mt-4">
          <div className="md:col-span-3 space-y-4">
            <EventForm onCreated={setLastCreatedId} />
            <EventList onSelect={setSelectedEvent} />
          </div>
          <div className="md:col-span-2">
            <RSVPForm event={selectedEvent} onSubmitted={() => alert('Thanks for your RSVP!')} />
            <div className="mt-4 text-center text-blue-200/70 text-sm">
              {lastCreatedId && (
                <p>Recently created event id: {lastCreatedId}</p>
              )}
              <p className="mt-2">
                Want to verify connections? <a href="/test" className="underline hover:text-white">Open the tester</a>
              </p>
            </div>
          </div>
        </div>

        <footer className="text-center text-blue-300/60 text-sm mt-10">
          Built with love for effortless event planning
        </footer>
      </div>
    </div>
  )
}

export default App
