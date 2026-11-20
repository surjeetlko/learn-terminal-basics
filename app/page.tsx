'use client'

import { useState } from 'react'

type CommandLine = { command: string; output?: string; comment?: string }

function Terminal({ title, lines }: { title: string; lines: CommandLine[] }) {
  const [copied, setCopied] = useState(false)

  async function copyCommands() {
    try {
      await navigator.clipboard.writeText(lines.map((line) => line.command).join('\n'))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="guide-terminal">
      <div className="terminal-bar">
        <span className="terminal-dots" aria-hidden="true"><i /><i /><i /></span>
        <span>{title}</span>
        <button className="copy-button" type="button" onClick={copyCommands} aria-label={`Copy commands from ${title}`}>
          {copied ? 'Copied' : 'Copy commands'}
        </button>
      </div>
      <pre className="terminal-code" aria-label={`Terminal commands: ${title}`}>
        {lines.map((line, index) => (
          <span className="terminal-line" key={`${line.command}-${index}`}>
            <span className="terminal-prompt" aria-hidden="true">$</span>
            <code>{line.command}</code>
            {line.comment && <span className="terminal-comment"># {line.comment}</span>}
            {line.output && <span className="terminal-output">{line.output}</span>}
          </span>
        ))}
      </pre>
      <span className="sr-only" role="status" aria-live="polite">{copied ? 'Commands copied to clipboard.' : ''}</span>
    </div>
  )
}

function CommandCard({ command, description }: { command: string; description: string }) {
  return <article className="command-card"><code>{command}</code><p>{description}</p></article>
}

function Tip({ children }: { children: React.ReactNode }) {
  return <aside className="guide-tip">{children}</aside>
}

const sections = [
  ['first', '01 · First steps'],
  ['navigate', '02 · Get around'],
  ['files', '03 · Work with files'],
  ['commands', '04 · Command toolkit'],
  ['projects', '05 · Run a project'],
  ['habits', '06 · Good habits'],
  ['practice', '07 · Practice'],
] as const

export default function Page() {
  return (
    <main className="guide-page">
      <div className="guide-shell">
        <header className="guide-topbar">
          <a className="guide-brand" href="#top">FIELDNOTES <span>/ 001</span></a>
          <span>Developer essentials <b>·</b> 8 min read</span>
        </header>

        <section className="guide-hero" id="top">
          <div className="guide-eyebrow">A practical starter guide <span>·</span> By Surjeet Singh</div>
          <h1>Learn the Terminal Developers Use Every Day</h1>
          <p>The terminal is a direct conversation with your computer. Learn a small set of commands and you can navigate projects, run tools, and make everyday work faster.</p>
          <div className="guide-meta"><span>No experience needed</span><i>·</i><span>Commands you’ll actually use</span></div>
        </section>

        <div className="guide-layout">
          <nav className="guide-nav" aria-label="Lesson sections">
            <h2>On this page</h2>
            {sections.map(([id, title]) => <a href={`#${id}`} key={id}>{title}</a>)}
          </nav>

          <div className="guide-content">
            <section className="guide-section" id="first">
              <div className="guide-eyebrow">01 / Start here</div>
              <h2>Meet the prompt</h2>
              <p>Open Terminal (Mac), Windows Terminal or PowerShell (Windows), or your system’s terminal app. You’ll see a prompt waiting for a command. Type a command and press <kbd>Enter</kbd>.</p>
              <Terminal title="Your first commands" lines={[
                { command: 'pwd', output: '/Users/sam/projects' },
                { command: 'whoami', output: 'sam' },
              ]} />
              <Tip><strong>What just happened?</strong> <code>pwd</code> prints your current folder. The prompt symbol may be <code>$</code>, <code>%</code>, or something custom—that’s normal.</Tip>
            </section>

            <section className="guide-section" id="navigate">
              <div className="guide-eyebrow">02 / Find your way</div>
              <h2>Navigate folders</h2>
              <p>Think of folders as rooms. <code>cd</code> changes rooms, and <code>ls</code> (or <code>dir</code> on Windows) shows what’s inside.</p>
              <Terminal title="Moving through a project" lines={[
                { command: 'ls', output: 'Desktop  Documents  projects' },
                { command: 'cd projects' },
                { command: 'cd my-app' },
                { command: 'pwd', output: '/Users/sam/projects/my-app' },
                { command: 'cd ..', comment: 'go up one folder' },
                { command: 'cd ~', comment: 'go to your home folder' },
              ]} />
              <Tip><strong>Shortcut:</strong> Type the first few letters of a file or folder and press <kbd>Tab</kbd> to autocomplete. Use the up arrow to recall a previous command.</Tip>
            </section>

            <section className="guide-section" id="files">
              <div className="guide-eyebrow">03 / Everyday tasks</div>
              <h2>Work with files</h2>
              <p>These commands create and inspect files and folders. For deleting commands, pause and double-check the path first.</p>
              <div className="command-grid">
                <CommandCard command="mkdir notes" description="Create a folder named “notes”." />
                <CommandCard command="touch todo.txt" description="Create an empty file (Mac/Linux)." />
                <CommandCard command="cat todo.txt" description="Print a text file’s contents." />
                <CommandCard command="cp a.txt b.txt" description="Copy a file to a new name." />
                <CommandCard command="mv old.txt new.txt" description="Rename or move a file." />
                <CommandCard command="rm file.txt" description="Delete a file—usually no undo." />
              </div>
              <Tip><strong>Careful with <code>rm -rf</code>.</strong> It can permanently remove entire folders without asking. Never run a destructive command you don’t understand, especially with elevated permissions.</Tip>
            </section>

            <section className="guide-section" id="commands">
              <div className="guide-eyebrow">04 / Your command toolkit</div>
              <h2>More commands, more confidence</h2>
              <p>A quick reference for the things developers reach for all the time. Commands can vary slightly by operating system.</p>
              <h3>Inspect and find</h3>
              <div className="command-grid">
                <CommandCard command="ls -la" description="List everything, including hidden files (Mac/Linux)." />
                <CommandCard command={'find . -name "*.js"'} description="Find JavaScript files under the current folder." />
                <CommandCard command={'grep -n "TODO" app.js'} description="Search a file for a word and show line numbers." />
                <CommandCard command="which node" description="Show which executable will run (Mac/Linux)." />
              </div>
              <h3>Git essentials</h3>
              <Terminal title="Check your changes before saving" lines={[
                { command: 'git status', comment: 'see what changed' },
                { command: 'git diff', comment: 'inspect edits' },
                { command: 'git add app.js', comment: 'stage one file' },
                { command: 'git commit -m "Fix header spacing"' },
                { command: 'git log --oneline', comment: 'view recent commits' },
              ]} />
              <h3>Useful everyday patterns</h3>
              <div className="command-grid">
                <CommandCard command="command --help" description="Read options and usage for a command." />
                <CommandCard command="clear" description="Clear the terminal screen." />
                <CommandCard command={'echo "hello"'} description="Print text or inspect a simple value." />
                <CommandCard command="command && next" description="Run the next command only if the first succeeds." />
                <CommandCard command="command > output.txt" description="Write output to a file, replacing its contents." />
                <CommandCard command="command | another" description="Pass one command’s output into another." />
              </div>
              <Tip><strong>Be careful with pipes and redirects.</strong> They can change files or pass data to other programs. Check what each side does before running a command you found online.</Tip>
            </section>

            <section className="guide-section" id="projects">
              <div className="guide-eyebrow">05 / Build &amp; run</div>
              <h2>Run a project</h2>
              <p>Most developer tools are commands too. A project’s README usually explains which commands it expects.</p>
              <Terminal title="Typical JavaScript project" lines={[
                { command: 'cd my-app' },
                { command: 'npm install', comment: 'install project dependencies' },
                { command: 'npm run dev', comment: 'start local development' },
                { command: '', output: 'Ready — open the local address shown in your terminal.' },
                { command: 'Ctrl+C', comment: 'stop the running command' },
              ]} />
              <Tip><strong>Use the project’s instructions.</strong> Commands vary between projects. Check <code>README.md</code> and package scripts before installing or running anything.</Tip>
            </section>

            <section className="guide-section" id="habits">
              <div className="guide-eyebrow">06 / Stay in control</div>
              <h2>Small habits, big difference</h2>
              <div className="table-scroll"><table className="guide-table"><thead><tr><th>When you need…</th><th>Try</th><th>Remember</th></tr></thead><tbody>
                <tr><td>To see your location</td><td><code>pwd</code></td><td>Check before acting</td></tr>
                <tr><td>To list files</td><td><code>ls</code> / <code>dir</code></td><td>Names can be case-sensitive</td></tr>
                <tr><td>To find a command’s help</td><td><code>command --help</code></td><td>Read before using new tools</td></tr>
                <tr><td>To cancel a running command</td><td><code>Ctrl+C</code></td><td>Stops the foreground process</td></tr>
                <tr><td>To handle spaces in names</td><td><code>cd "My Folder"</code></td><td>Or use Tab completion</td></tr>
              </tbody></table></div>
              <Tip><strong>One command at a time.</strong> Avoid pasting commands from a source you don’t trust. A command can change or delete files, install software, or send data.</Tip>
            </section>

            <section className="guide-section" id="practice">
              <div className="guide-eyebrow">07 / Your turn</div>
              <h2>Two-minute practice</h2>
              <p>Try this in a safe folder such as your Desktop. These commands create a tiny practice space and don’t touch existing files.</p>
              <div className="practice-card">
                <h3>Make a tiny workspace</h3>
                <p>On Mac/Linux, enter each line and press Enter:</p>
                <ol>
                  <li><code>cd ~/Desktop</code> — open your Desktop</li>
                  <li><code>mkdir terminal-practice</code> — make a practice folder</li>
                  <li><code>cd terminal-practice</code> — move into it</li>
                  <li><code>pwd</code> — confirm where you are</li>
                  <li><code>touch hello.txt</code> — create your first file</li>
                  <li><code>ls</code> — see it in the list</li>
                </ol>
                <p>On Windows PowerShell, replace <code>touch hello.txt</code> with <code>New-Item hello.txt</code>.</p>
              </div>
              <p className="closing-copy">That’s the core loop: <strong>look around → move to the right place → run a command → check the result.</strong> Keep the help pages and project README close, and the terminal will feel familiar in no time.</p>
            </section>

            <footer className="guide-footer"><span>FIELDNOTES / TERMINAL</span><span>Learn by doing. Stay curious.</span></footer>
          </div>
        </div>
      </div>
    </main>
  )
}
