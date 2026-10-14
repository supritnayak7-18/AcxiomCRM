import { useState } from 'react'
import Customers from './components/Customers'

const menu = [
  { name: 'Dashboard', icon: '⌂' },
  { name: 'Customers', icon: '♙' },
  { name: 'Leads', icon: '♧' },
  { name: 'Opportunities', icon: '◎' },
  { name: 'Follow-ups', icon: '▦' },
  { name: 'Reports', icon: '▤' },
  { name: 'Users', icon: '♙' },
]

const stats = [
  { title: 'Total Customers', value: '0', note: 'Customer records' },
  { title: 'Total Leads', value: '0', note: 'Potential customers' },
  { title: 'Opportunities', value: '0', note: 'Active sales deals' },
  { title: 'Follow-ups', value: '0', note: 'Scheduled activities' },
]

function App() {
  const [active, setActive] = useState('Dashboard')
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 md:flex">
      <aside className="flex w-full flex-col bg-slate-900 p-5 text-white md:min-h-screen md:w-60">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-2xl font-bold">
            A
          </div>
          <div>
            <h1 className="text-xl font-bold">AcxiomCRM</h1>
            <p className="text-xs text-slate-400">Business management</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-2 md:flex-col">
          {menu.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left ${
                active === item.name
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-bold">{active}</h2>
            <p className="text-sm text-slate-500">
              Manage your business in one place
            </p>
          </div>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search CRM..."
            className="w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm sm:w-64"
          />
        </header>

        <main className="mx-auto max-w-7xl p-5 md:p-8">
          {active === 'Dashboard' ? (
            <>
              <section className="rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-600 p-8 text-white">
                <p className="text-sm text-blue-100">YOUR BUSINESS OVERVIEW</p>
                <h2 className="mt-3 text-3xl font-bold">
                  Welcome to AcxiomCRM!
                </h2>
                <p className="mt-3 text-sm text-blue-100">
                  Manage customers, track leads and build stronger relationships.
                </p>
                <button
                  onClick={() => setActive('Customers')}
                  className="mt-5 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700"
                >
                  Manage Customers →
                </button>
              </section>

              <section className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.title}
                    className="rounded-2xl border bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm text-slate-500">{stat.title}</p>
                    <p className="mt-4 text-3xl font-bold">{stat.value}</p>
                    <p className="mt-2 text-xs text-slate-500">{stat.note}</p>
                  </div>
                ))}
              </section>

              <section className="mt-7 rounded-2xl border bg-white p-6">
                <h3 className="text-lg font-bold">Quick Actions</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {['Customers', 'Leads', 'Opportunities', 'Follow-ups'].map(
                    (name) => (
                      <button
                        key={name}
                        onClick={() => setActive(name)}
                        className="rounded-lg border px-4 py-3 hover:border-blue-500 hover:bg-blue-50"
                      >
                        {name} →
                      </button>
                    )
                  )}
                </div>
              </section>
            </>
          ) : active === 'Customers' ? (
            <Customers />
          ) : (
            <section className="rounded-2xl border bg-white p-8">
              <h2 className="text-xl font-bold">{active}</h2>
              <p className="mt-2 text-slate-500">
                This module will be implemented in the next steps.
              </p>
              <button
                onClick={() => setActive('Dashboard')}
                className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Back to Dashboard
              </button>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default App