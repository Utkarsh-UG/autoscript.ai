import { useEffect, useState, type ReactNode } from 'react'
import {
  Activity,
  BarChart3,
  Bell,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileBarChart,
  FlaskConical,
  HelpCircle,
  LayoutDashboard,
  Menu,
  Moon,
  Play,
  Plus,
  Search,
  Settings,
  Sparkles,
  Sun,
  TestTube2,
  X,
  Zap,
} from 'lucide-react'
import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import { Input } from './components/ui/Input'
import { AIStreamingText } from './components/ai/AIStreamingText'
import { fetchHealth } from './services/health'
import type { HealthResponse } from './services/health'

type ConnectionState = 'loading' | 'connected' | 'disconnected'
type ThemeMode = 'light' | 'dark'
type NavItem = { label: string; icon: typeof LayoutDashboard }

const THEME_STORAGE_KEY = 'autoscript-ai-theme'

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Generate Test', icon: Sparkles },
  { label: 'Run Tests', icon: Play },
  { label: 'Projects', icon: BriefcaseBusiness },
  { label: 'Test Cases', icon: ClipboardList },
  { label: 'Reports', icon: FileBarChart },
  { label: 'History', icon: Activity },
]

const utilityItems: NavItem[] = [
  { label: 'AI Assistant', icon: Bot },
  { label: 'Settings', icon: Settings },
  { label: 'Help', icon: HelpCircle },
]

function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
    return saved === 'dark' ? 'dark' : 'light'
  })
  const [collapsed, setCollapsed] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [activePage, setActivePage] = useState('Dashboard')
  const [connectionState, setConnectionState] = useState<ConnectionState>('loading')
  const [health, setHealth] = useState<HealthResponse | null>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    let active = true
    fetchHealth()
      .then((data) => {
        if (!active) return
        setHealth(data)
        setConnectionState('connected')
      })
      .catch(() => {
        if (active) setConnectionState('disconnected')
      })
    return () => {
      active = false
    }
  }, [])

  const selectPage = (label: string) => {
    setActivePage(label)
    setMobileNavOpen(false)
  }

  return (
    <div className="application-shell">
      <button
        className={`mobile-overlay ${mobileNavOpen ? 'is-visible' : ''}`}
        aria-label="Close navigation"
        onClick={() => setMobileNavOpen(false)}
      />
      <aside className={`sidebar ${collapsed ? 'is-collapsed' : ''} ${mobileNavOpen ? 'is-mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-mark">A</div>
          <div className="brand-copy">
            <strong>AutoScript AI</strong>
            <span>Generate. Execute. Analyze.</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <span className="nav-section-label">Workspace</span>
          {navItems.map((item) => (
            <NavigationItem
              key={item.label}
              item={item}
              active={activePage === item.label}
              collapsed={collapsed}
              onClick={() => selectPage(item.label)}
            />
          ))}
          <span className="nav-section-label">Workspace tools</span>
          {utilityItems.map((item) => (
            <NavigationItem
              key={item.label}
              item={item}
              active={activePage === item.label}
              collapsed={collapsed}
              onClick={() => item.label === 'AI Assistant' ? setAssistantOpen(true) : selectPage(item.label)}
            />
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="plan-card">
            <div className="plan-icon"><Zap size={16} /></div>
            <div className="brand-copy">
              <strong>Workspace plan</strong>
              <span>Pro features ready</span>
            </div>
          </div>
          <button
            className="collapse-button"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            data-tooltip={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed((value) => !value)}
          >
            {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
            {!collapsed && <span>Collapse sidebar</span>}
          </button>
        </div>
      </aside>

      <div className="application-main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu-button" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}>
              <Menu size={19} />
            </button>
            <div>
              <span className="breadcrumb">Workspace /</span>
              <strong className="page-title">{activePage}</strong>
            </div>
          </div>
          <div className="topbar-center">
            <div className="search-box">
              <Search size={17} />
              <input aria-label="Search workspace" placeholder="Search workspace..." />
              <kbd>⌘ K</kbd>
            </div>
          </div>
          <div className="topbar-actions">
            <button className="topbar-ai-button" onClick={() => setAssistantOpen(true)}>
              <Bot size={16} />
              <span>Ask AI</span>
            </button>
            <button
              className={`icon-button theme-toggle ${theme}`}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              data-tooltip={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              onClick={() => setTheme((value) => value === 'light' ? 'dark' : 'light')}
            >
              <span className="theme-icon sun-icon"><Sun size={18} /></span>
              <span className="theme-icon moon-icon"><Moon size={18} /></span>
            </button>
            <button className="icon-button notification-button" aria-label="Notifications">
              <Bell size={18} />
              <span className="notification-dot" />
            </button>
            <button className="profile-button" aria-label="Open profile">
              <span>AS</span>
              <span className="profile-name">Alex Smith</span>
            </button>
          </div>
        </header>

        <main className="main-content">
          <Dashboard
            connectionState={connectionState}
            health={health}
            onGenerate={() => selectPage('Generate Test')}
            onOpenAssistant={() => setAssistantOpen(true)}
          />
        </main>
      </div>

      <AssistantPanel open={assistantOpen} onClose={() => setAssistantOpen(false)} />
    </div>
  )
}

function NavigationItem({ item, active, collapsed, onClick }: { item: NavItem; active: boolean; collapsed: boolean; onClick: () => void }) {
  const Icon = item.icon
  return (
    <button
      className={`navigation-item ${active ? 'is-active' : ''}`}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      data-tooltip={collapsed ? item.label : undefined}
    >
      <Icon size={18} strokeWidth={1.8} />
      <span>{item.label}</span>
    </button>
  )
}

function Dashboard({ connectionState, health, onGenerate, onOpenAssistant }: {
  connectionState: ConnectionState
  health: HealthResponse | null
  onGenerate: () => void
  onOpenAssistant: () => void
}) {
  const backendStatus = connectionState === 'connected' ? 'Operational' : connectionState === 'loading' ? 'Checking' : 'Unavailable'
  return (
    <div className="dashboard-page">
      <section className="dashboard-heading">
        <div>
          <span className="eyebrow">Wednesday, September 30, 2026</span>
          <h1>Good morning, Alex</h1>
          <p>Here&apos;s what&apos;s happening with your tests today.</p>
        </div>
        <button className="connection-badge" onClick={onOpenAssistant}>
          <span className={`status-dot ${connectionState}`} />
          {connectionState === 'connected' ? 'All systems operational' : `Backend ${backendStatus.toLowerCase()}`}
        </button>
      </section>

      <section className="dashboard-hero">
        <div>
          <span className="hero-icon"><Sparkles size={19} /></span>
          <span className="eyebrow">AI-powered automation</span>
          <h2>Generate a new test</h2>
          <p>Turn your testing ideas into reliable browser automation in seconds.</p>
          <div className="hero-actions">
            <Button variant="primary" onClick={onGenerate}><Plus size={17} /> Generate Test</Button>
            <Button variant="secondary"><Play size={16} /> Run Existing Test</Button>
          </div>
        </div>
        <div className="hero-decoration" aria-hidden="true">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="hero-grid-lines" />
        </div>
      </section>

      <section className="stats-grid" aria-label="Automation statistics">
        <MetricCard icon={<TestTube2 size={18} />} label="Tests Generated" value="248" change="+12% this month" />
        <MetricCard icon={<Play size={18} />} label="Tests Executed" value="1,284" change="+8% this month" />
        <MetricCard icon={<BarChart3 size={18} />} label="Pass Rate" value="96.4%" change="+2.1% this month" />
        <MetricCard icon={<FlaskConical size={18} />} label="Failed Tests" value="42" change="-5% this month" negative />
      </section>

      <section className="dashboard-grid">
        <Card className="scenario-card">
          <div className="card-header-row">
            <div>
              <span className="eyebrow">Start building</span>
              <h2>Scenario Builder</h2>
            </div>
            <Button variant="ghost">Advanced</Button>
          </div>
          <div className="field-stack">
            <label className="ui-input-field">
              <span className="ui-input-label">What do you want to test?</span>
              <textarea
                className="ui-textarea"
                placeholder="Describe your test scenario in natural language..."
                defaultValue="Login to the application, search for a laptop, add it to the cart, remove it, and verify that the cart is empty."
              />
              <span className="character-count">143 / 2,000</span>
            </label>
            <div className="two-column-fields">
              <Input label="Application URL (optional)" placeholder="https://example.com" />
              <Input label="Project" defaultValue="E-Commerce QA" />
            </div>
          </div>
          <div className="cta-row">
            <Button variant="primary" onClick={onGenerate}><Sparkles size={16} /> Generate Test</Button>
            <span className="helper-text">No code required to get started</span>
          </div>
        </Card>

        <Card className="quick-card">
          <div className="card-header-row">
            <div>
              <span className="eyebrow">Shortcuts</span>
              <h2>Quick actions</h2>
            </div>
          </div>
          <div className="quick-list">
            <QuickAction icon={<BriefcaseBusiness size={17} />} label="Create Project" />
            <QuickAction icon={<Play size={17} />} label="Run Existing Test" />
            <QuickAction icon={<FileBarChart size={17} />} label="Review Report" />
          </div>
          <div className="backend-summary">
            <span className={`status-dot ${connectionState}`} />
            <div>
              <strong>Backend API</strong>
              <span>{backendStatus} {health ? `• checked ${new Date(health.timestamp).toLocaleTimeString()}` : ''}</span>
            </div>
            <CheckCircle2 className={connectionState === 'connected' ? 'summary-check' : 'summary-check muted'} size={18} />
          </div>
        </Card>
      </section>
    </div>
  )
}

function MetricCard({ icon, label, value, change, negative = false }: { icon: ReactNode; label: string; value: string; change: string; negative?: boolean }) {
  return (
    <Card className="metric-card">
      <div className="metric-topline"><span className="metric-icon">{icon}</span><span className="metric-label">{label}</span></div>
      <strong className="metric-value">{value}</strong>
      <span className={`metric-change ${negative ? 'negative' : ''}`}>{negative ? '↓' : '↑'} {change}</span>
    </Card>
  )
}

function QuickAction({ icon, label }: { icon: ReactNode; label: string }) {
  return <button className="quick-action"><span className="quick-action-icon">{icon}</span><span>{label}</span><ChevronRight size={16} /></button>
}

function AssistantPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [message, setMessage] = useState('')
  return (
    <aside className={`assistant-panel ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="assistant-header">
        <div><span className="assistant-avatar"><Bot size={17} /></span><div><strong>AI Assistant</strong><span>Ready to help</span></div></div>
        <button className="icon-button" aria-label="Close AI assistant" onClick={onClose}><X size={18} /></button>
      </div>
      <div className="assistant-messages">
        <div className="assistant-empty"><span className="assistant-empty-icon"><Sparkles size={21} /></span><strong>How can I help?</strong><p>Ask me to refine a test scenario, add steps, or explain a report.</p></div>
        <div className="message-bubble ai-message"><AIStreamingText text="Try asking: “Add a verification step after login.”" /></div>
      </div>
      <form className="assistant-input" onSubmit={(event) => { event.preventDefault(); setMessage('') }}>
        <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask AI..." aria-label="Ask AI" />
        <button type="submit" aria-label="Send message"><ChevronRight size={18} /></button>
      </form>
    </aside>
  )
}

export default App
