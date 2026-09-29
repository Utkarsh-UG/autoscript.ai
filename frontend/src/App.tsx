import { useEffect, useState } from 'react'
import axios from 'axios'

type HealthResponse = {
  status: string
  service: string
  timestamp: string
}

type ConnectionState = 'loading' | 'connected' | 'disconnected'

const navigationItems = ['Dashboard', 'Generate Script', 'Run Test', 'Projects', 'Reports', 'History', 'Settings', 'Help']

function App() {
  const [connectionState, setConnectionState] = useState<ConnectionState>('loading')
  const [health, setHealth] = useState<HealthResponse | null>(null)

  useEffect(() => {
    axios
      .get<HealthResponse>('/api/health')
      .then(({ data }) => {
        setHealth(data)
        setConnectionState('connected')
      })
      .catch(() => {
        setConnectionState('disconnected')
      })
  }, [])

  const connectionLabel = {
    loading: 'Checking backend...',
    connected: 'Backend connected',
    disconnected: 'Backend unavailable',
  }[connectionState]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">A</span>
          <span>AutoScript AI</span>
        </div>
        <p className="tagline">Generate. Execute. Analyze.</p>
        <nav aria-label="Main navigation">
          {navigationItems.map((item) => (
            <button className={item === 'Dashboard' ? 'nav-item active' : 'nav-item'} key={item}>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <p className="eyebrow">Workspace overview</p>
            <h1>Dashboard</h1>
            <p className="header-copy">Create reliable browser tests with AI-guided automation.</p>
          </div>
          <div className={`connection-pill ${connectionState}`}>
            <span className="status-dot" />
            {connectionLabel}
          </div>
        </header>

        <section className="metrics-grid" aria-label="Automation metrics">
          <MetricCard label="Scripts Generated" value="0" />
          <MetricCard label="Tests Executed" value="0" />
          <MetricCard label="Pass Rate" value="—" />
          <MetricCard label="Failed Tests" value="0" />
        </section>

        <section className="content-grid">
          <div className="panel welcome-panel">
            <p className="eyebrow">Get started</p>
            <h2>Turn a scenario into a test</h2>
            <p>Describe what a user should do on your website, and AutoScript AI will help generate and execute the automation.</p>
            <button className="primary-button">Generate your first script</button>
          </div>
          <div className="panel status-panel">
            <p className="eyebrow">System status</p>
            <h2>Platform services</h2>
            <div className="service-row">
              <span>Backend API</span>
              <strong className={connectionState}>{connectionState === 'connected' ? 'Operational' : connectionState === 'loading' ? 'Checking' : 'Unavailable'}</strong>
            </div>
            {health && <p className="timestamp">Last checked {new Date(health.timestamp).toLocaleTimeString()}</p>}
          </div>
        </section>
      </main>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export default App
