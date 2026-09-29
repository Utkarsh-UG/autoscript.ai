import { useState, type ReactNode } from 'react'
import {
  Activity,
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  FileBarChart,
  Filter,
  Globe2,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  SlidersHorizontal,
  Sparkles,
  TerminalSquare,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { AutoScriptLogo } from '../components/brand/AutoScriptLogo'

type WorkspacePageProps = {
  onNavigate: (label: string) => void
}

const projects = [
  { name: 'E-Commerce Application', cases: 24, executions: 132, passRate: '91%', activity: '12 min ago' },
  { name: 'Banking Application', cases: 84, executions: 807, passRate: '84%', activity: 'Yesterday' },
  { name: 'Customer Portal', cases: 18, executions: 64, passRate: '98%', activity: 'Sep 28, 2026' },
]

const testCases = [
  ['Login with valid credentials', 'Playwright', 'Passed', 'Today'],
  ['Empty cart after removing item', 'Selenium', 'Draft', 'Yesterday'],
  ['Checkout validation flow', 'Playwright', 'Failed', 'Sep 28'],
]

const history = [
  ['Login with valid credentials', 'E-Commerce Application', 'Chromium', 'Passed', '42s', 'Today, 10:42 AM'],
  ['Checkout validation flow', 'E-Commerce Application', 'Firefox', 'Failed', '1m 18s', 'Yesterday, 4:08 PM'],
  ['Account recovery flow', 'Customer Portal', 'WebKit', 'Passed', '36s', 'Sep 28, 2:31 PM'],
]

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="workspace-heading">
      <div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
      {action}
    </div>
  )
}

function SelectField({ label, value }: { label: string; value: string }) {
  return <label className="select-field"><span>{label}</span><select defaultValue={value}><option>{value}</option><option>Playwright</option><option>Selenium</option><option>Chromium</option><option>Firefox</option></select><ChevronDown size={15} /></label>
}

function StatusBadge({ status }: { status: string }) {
  return <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
}

export function GeneratePage({ onNavigate }: WorkspacePageProps) {
  const [advanced, setAdvanced] = useState(false)
  const [scenario, setScenario] = useState('')
  return <div className="workspace-page">
    <PageHeading eyebrow="AI test authoring" title="Generate Test" description="Describe your test scenario and let AI create the automation for you." action={<Button variant="primary"><Sparkles size={16} /> Generate Test</Button>} />
    <Card className="generator-card">
      <div className="tab-row"><button className="tab is-active">Basic</button><button className="tab">Advanced</button></div>
      <label className="ui-input-field"><span className="ui-input-label">What do you want to test?</span><textarea className="ui-textarea generator-textarea" value={scenario} onChange={(event) => setScenario(event.target.value)} placeholder="Describe your test scenario in natural language..." /><span className="character-count">{scenario.length} / 2,000</span></label>
      <div className="generator-grid"><Input label="Application URL (optional)" placeholder="https://example.com" /><Input label="Test variables (optional)" placeholder={'BASE_URL = ${BASE_URL}'} /></div>
      <button className="advanced-toggle" onClick={() => setAdvanced((value) => !value)} aria-expanded={advanced}><SlidersHorizontal size={16} /> Advanced configuration <ChevronDown className={advanced ? 'rotated' : ''} size={15} /></button>
      <div className={`generator-advanced ${advanced ? 'is-open' : ''}`}>
        <SelectField label="Framework" value="Playwright" /><SelectField label="Language" value="TypeScript" /><SelectField label="Test framework" value="JUnit" /><SelectField label="Design pattern" value="Page Object Model" /><SelectField label="Browser" value="Chromium" /><SelectField label="Generate as" value="Single Test File" />
      </div>
      <div className="generator-footer"><span>AI generation is ready for tomorrow&apos;s integration.</span><Button variant="primary" onClick={() => onNavigate('Dashboard')}><Sparkles size={16} /> Generate Test</Button></div>
    </Card>
  </div>
}

export function RunTestsPage() {
  const steps = ['Starting browser', 'Navigating to application', 'Executing test steps', 'Capturing evidence', 'Generating report']
  return <div className="workspace-page"><PageHeading eyebrow="Browser automation" title="Run Tests" description="Configure and monitor a future browser test execution." action={<Button variant="primary"><Activity size={16} /> Run Test</Button>} /><div className="execution-grid"><Card className="settings-card"><SectionTitle icon={<SlidersHorizontal size={16} />} title="Execution settings" /><div className="generator-grid"><SelectField label="Select test" value="Login with valid credentials" /><SelectField label="Browser" value="Chromium" /><Input label="Iterations" defaultValue="1" /><Input label="Timeout" defaultValue="30 seconds" /></div><div className="toggle-list"><ToggleRow label="Headless mode" checked /><ToggleRow label="Screenshots" checked /><ToggleRow label="Record video" /><ToggleRow label="Capture trace" /></div></Card><Card className="progress-card"><SectionTitle icon={<Activity size={16} />} title="Execution progress" /><div className="execution-steps">{steps.map((step, index) => <div className={`execution-step ${index === 0 ? 'current' : ''}`} key={step}><span>{index === 0 ? <Activity size={15} /> : <Check size={15} />}</span><div><strong>{step}</strong><small>{index === 0 ? 'Ready for execution' : 'Waiting'}</small></div></div>)}</div></Card></div><Card className="logs-card"><SectionTitle icon={<TerminalSquare size={16} />} title="Live logs" /><pre>$ autoscript test runner{'\n'}Waiting for execution configuration...{'\n'}Execution engine will be connected in the next sprint.</pre></Card></div>
}

function ToggleRow({ label, checked = false }: { label: string; checked?: boolean }) {
  return <label className="toggle-row"><span>{label}</span><input type="checkbox" defaultChecked={checked} /><span className="toggle-track" /></label>
}

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return <div className="section-title"><span>{icon}</span><h2>{title}</h2></div>
}

export function ProjectsPage() {
  return <div className="workspace-page"><PageHeading eyebrow="Workspace management" title="Projects" description="Organize test cases and execution history by application." action={<Button variant="primary"><Plus size={16} /> New Project</Button>} /><div className="filter-bar"><div className="inline-search"><Search size={16} /><input placeholder="Search projects..." /></div><Button variant="ghost"><Filter size={15} /> Filter</Button></div><div className="project-grid">{projects.map((project) => <Card className="project-card" key={project.name}><div className="project-card-top"><span className="project-icon"><Globe2 size={18} /></span><button className="icon-button" aria-label={`More actions for ${project.name}`}><MoreHorizontal size={17} /></button></div><h2>{project.name}</h2><span className="project-activity">Updated {project.activity}</span><div className="project-stats"><span><strong>{project.cases}</strong> Test cases</span><span><strong>{project.executions}</strong> Executions</span><span><strong>{project.passRate}</strong> Pass rate</span></div><button className="text-link">Open project <ArrowRight size={15} /></button></Card>)}</div></div>
}

export function TestCasesPage() {
  return <div className="workspace-page"><PageHeading eyebrow="Quality library" title="Test Cases" description="Browse, organize, and prepare reusable test scenarios." action={<Button variant="primary"><Plus size={16} /> New Test Case</Button>} /><div className="filter-bar filter-grid"><SelectField label="Project" value="All projects" /><SelectField label="Framework" value="All frameworks" /><SelectField label="Status" value="All statuses" /><div className="inline-search"><Search size={16} /><input placeholder="Search test cases..." /></div></div><DataTable headers={['Test name', 'Framework', 'Status', 'Last run', 'Actions']} rows={testCases.map(([name, framework, status, lastRun]) => [<strong key={name}>{name}</strong>, framework, <StatusBadge key={status} status={status} />, lastRun, <button className="table-action" key="action">View <ExternalLink size={14} /></button>])} /></div>
}

export function ReportsPage() {
  return <div className="workspace-page"><PageHeading eyebrow="Execution insights" title="Test Execution Report" description="A polished report foundation for your future automation runs." action={<div className="heading-actions"><Button variant="ghost"><Share2 size={15} /> Share</Button><Button variant="primary"><Download size={15} /> Download</Button></div>} /><div className="report-summary">{[['Total steps', '12'], ['Passed', '11'], ['Failed', '1'], ['Pass rate', '91.7%'], ['Duration', '1m 42s'], ['Browser', 'Chromium']].map(([label, value]) => <Card className="report-metric" key={label}><span>{label}</span><strong>{value}</strong></Card>)}</div><Card className="report-card"><div className="tab-row"><button className="tab is-active">Test Steps</button><button className="tab">Screenshots</button><button className="tab">Logs</button><button className="tab">Video</button><button className="tab">Environment</button></div><DataTable headers={['Step', 'Status', 'Duration', 'Details']} rows={[['Open login page', <StatusBadge key="passed" status="Passed" />, '2.1s', 'Page loaded successfully'], ['Submit credentials', <StatusBadge key="passed2" status="Passed" />, '1.4s', 'Login form submitted'], ['Verify cart state', <StatusBadge key="failed" status="Failed" />, '3.6s', 'Expected empty cart']]} /></Card></div>
}

export function HistoryPage() {
  return <div className="workspace-page"><PageHeading eyebrow="Activity" title="History" description="Review recent test execution activity across your workspace." /><div className="filter-bar"><div className="inline-search"><Search size={16} /><input placeholder="Search execution history..." /></div><Button variant="ghost"><Filter size={15} /> Filters</Button></div><DataTable headers={['Test', 'Project', 'Browser', 'Status', 'Duration', 'Executed at']} rows={history.map((row) => [<strong key={row[0]}>{row[0]}</strong>, ...row.slice(1, 6).map((cell, index) => index === 2 ? <StatusBadge key={cell} status={cell} /> : cell)])} /></div>
}

export function SettingsPage() {
  return <div className="workspace-page"><PageHeading eyebrow="Workspace preferences" title="Settings" description="Tune your workspace experience for the way your team works." /><div className="settings-layout"><nav className="settings-nav"><button className="is-active">Appearance</button><button>Account</button><button>AI Providers</button><button>Execution Settings</button><button>Notifications</button></nav><Card className="settings-content"><SectionTitle icon={<SlidersHorizontal size={16} />} title="Appearance" /><p className="settings-copy">Choose how AutoScript AI should look across your workspace.</p><div className="appearance-options"><button className="appearance-option is-selected"><span className="appearance-preview light-preview" /><strong>Light</strong><small>Bright and focused</small></button><button className="appearance-option"><span className="appearance-preview dark-preview" /><strong>Dark</strong><small>Easy on the eyes</small></button><button className="appearance-option"><span className="appearance-preview system-preview" /><strong>System</strong><small>Follow device setting</small></button></div><SectionTitle icon={<Globe2 size={16} />} title="Execution defaults" /><div className="generator-grid"><SelectField label="Default browser" value="Chromium" /><Input label="Default timeout" defaultValue="30 seconds" /></div><div className="toggle-list"><ToggleRow label="Capture screenshots" checked /><ToggleRow label="Record video" /></div></Card></div></div>
}

export function HelpPage() {
  return <div className="workspace-page"><PageHeading eyebrow="Support center" title="Help" description="Find your way around AutoScript AI and prepare for your first automated test." /><div className="help-grid">{[['Getting Started', 'Learn the core workflow from scenario to report.', Sparkles], ['Documentation', 'Explore framework and execution guidance.', FileBarChart], ['FAQ', 'Answers to common workspace questions.', SlidersHorizontal], ['Support', 'Talk to the team when you need a hand.', Share2]].map(([title, description, Icon]) => <Card className="help-card" key={title as string}><span className="help-icon"><Icon size={19} /></span><h2>{title as string}</h2><p>{description as string}</p><button className="text-link">Explore <ArrowRight size={15} /></button></Card>)}</div></div>
}

function DataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return <div className="table-scroll"><table><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>
}

export function AuthPage({ mode }: { mode: 'login' | 'signup' | 'forgot' }) {
  const title = mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create your workspace' : 'Reset your password'
  const description = mode === 'login' ? 'Sign in to continue building better tests.' : mode === 'signup' ? 'Start turning testing ideas into automation.' : 'Enter your email and we’ll send recovery instructions.'
  return <div className="auth-page"><Card className="auth-card"><AutoScriptLogo variant="full" /><span className="eyebrow">Generate. Execute. Analyze.</span><h1>{title}</h1><p>{description}</p><Input label="Email" type="email" placeholder="you@company.com" />{mode !== 'forgot' ? <Input label="Password" type="password" placeholder="••••••••" /> : null}<Button variant="primary">{mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}</Button><span className="auth-footer">{mode === 'login' ? 'Don’t have an account? Sign up' : 'Already have an account? Sign in'}</span></Card></div>
}
