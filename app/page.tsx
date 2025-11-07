import Link from 'next/link';
import { ArrowRight, CheckCircle2, Lock, Shield, Zap, RefreshCw, Code, Globe, FileText } from 'lucide-react';
import { SiteHeader } from '@/components/layout/site-header';
import { Button } from '@/components/ui/button';
import { CreateSiteForm } from '@/components/editor/create-site-form';

const highlights = [
  {
    title: 'Your password never leaves your device',
    description: 'We encrypt everything in your browser before it touches the internet. We literally cannot read your notes, even if we wanted to.',
    icon: Lock
  },
  {
    title: 'No sign-up required',
    description: 'No email. No account. No tracking cookies. Just pick a URL and start typing. That\'s it.',
    icon: Zap
  },
  {
    title: 'Free forever',
    description: 'No ads. No premium tiers. No BS. Just works. We believe privacy should be free for everyone.',
    icon: Shield
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-16">
        <section className="text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
            <span className="inline-flex h-2 w-2 rounded-full bg-primary-400" />
            The safest notepad on the internet
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Encrypted notes.<br />Nobody can read them.<br />Not even us.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Pick any URL like protected-text.com/<span className="text-white font-semibold">anything</span>, set a password, and you're done.
            Your notes are encrypted in your browser before they leave your computer.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-base text-white/60">
            Simple. Fast. Free. No ads. Secure - and you can verify the code yourself.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <CreateSiteForm />
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-left shadow-lg shadow-black/30">
              <h3 className="text-sm uppercase tracking-widest text-white/50">Why this works</h3>
              <ul className="mt-4 space-y-4 text-sm text-white/80">
                {highlights.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <item.icon className="mt-0.5 h-5 w-5 text-primary-400" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-white/60">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-semibold text-white">What is Protected Text?</h2>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              It's a <span className="font-semibold text-white">free online notepad with end-to-end encryption</span>.
              Write notes, to-do lists, code snippets, ideas - whatever you want.
              Everything is encrypted with military-grade encryption (AES-256-GCM) in your browser before it hits our servers.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              Here's the key part: You can access your notes from <span className="font-semibold text-white">any URL you choose</span>.
              Want to use <span className="font-mono text-primary-300">protected-text.com/groceries</span>? Done.
              <span className="font-mono text-primary-300">protected-text.com/secret-project</span>? Sure.
              <span className="font-mono text-primary-300">protected-text.com/anything-you-want</span>? Go for it.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              If nobody's using that URL yet, it's yours. Set a password and start typing.
              Come back later from any device, same URL, same password, and your notes are there.
              Simple as that.
            </p>
            <div className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-primary-500/30 bg-primary-500/10 px-6 py-3">
              <Shield className="h-5 w-5 text-primary-300" />
              <p className="text-sm font-medium text-white">
                This is what we call <span className="text-primary-300">"Trustless Security"</span>
              </p>
            </div>
            <p className="mt-4 text-center text-sm italic text-white/60">
              You don't have to trust us. You don't have to trust anyone.
              Your password never leaves your device, so only you can decrypt your notes.
            </p>
          </div>
        </section>

        <section id="security" className="rounded-3xl border border-white/10 bg-slate-950/60 p-8 shadow-2xl shadow-black/40">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-semibold text-white">Why is it safe?</h2>
              <p className="mt-2 text-white/70">Look, security is pretty simple if you do it right:</p>
              <ul className="mt-6 space-y-4 text-white/80">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                  <div>
                    <p className="font-medium text-white">Your password never leaves your computer</p>
                    <p className="text-sm text-white/60">We never see it. Not during login. Not ever. It stays on your device and encrypts everything there.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                  <div>
                    <p className="font-medium text-white">Only encrypted text goes over the internet</p>
                    <p className="text-sm text-white/60">Even if someone intercepts it, they get gibberish. That's the point.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                  <div>
                    <p className="font-medium text-white">No accounts, no sessions, no tracking</p>
                    <p className="text-sm text-white/60">We don't have user accounts. No cookies. No analytics. We don't even know who you are.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                  <div>
                    <p className="font-medium text-white">No ads means no tracking</p>
                    <p className="text-sm text-white/60">Ads track you. We hate that. So no ads. Ever.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                  <div>
                    <p className="font-medium text-white">Open source code</p>
                    <p className="text-sm text-white/60">Don't trust us? Good. Check the code yourself. It's all there. We use standard, battle-tested encryption libraries.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                  <div>
                    <p className="font-medium text-white">Your site URL is your username</p>
                    <p className="text-sm text-white/60">Nobody can access your notes without knowing both the exact URL you chose and your password. Two layers of security.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <h3 className="font-semibold text-white">Technical details (for nerds)</h3>
              <div className="mt-4 grid gap-4 text-sm text-white/70 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <Code className="mt-0.5 h-4 w-4 text-primary-400" />
                  <div>
                    <p className="font-medium text-white">AES-256-GCM encryption</p>
                    <p className="text-xs text-white/60">Military-grade. Industry standard.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Code className="mt-0.5 h-4 w-4 text-primary-400" />
                  <div>
                    <p className="font-medium text-white">PBKDF2 key derivation</p>
                    <p className="text-xs text-white/60">310,000 iterations. OWASP recommended.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Code className="mt-0.5 h-4 w-4 text-primary-400" />
                  <div>
                    <p className="font-medium text-white">Random salt & IV</p>
                    <p className="text-xs text-white/60">Generated per-save for extra security.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Code className="mt-0.5 h-4 w-4 text-primary-400" />
                  <div>
                    <p className="font-medium text-white">Client-side JavaScript</p>
                    <p className="text-xs text-white/60">All encryption happens in your browser.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-primary-400" />
                <h3 className="text-xl font-semibold text-white">Conflict Protection</h3>
              </div>
              <p className="mt-3 text-white/80">
                Use the same URL on your laptop, phone, and tablet at the same time? No problem.
                We detect when multiple devices are editing and prevent you from losing changes.
                Auto-save runs every 2 seconds, and we keep the last 10 versions so you can roll back if needed.
              </p>
              <p className="mt-3 text-white/80">
                If two devices save at the same time, we'll show you both versions and let you pick which one to keep.
                No silent data loss. Ever.
              </p>
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-slate-950/60 p-8 md:w-64">
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-primary-400" />
                <p className="mt-3 text-sm font-medium text-white">Version History</p>
                <p className="mt-1 text-xs text-white/60">Last 10 saves available</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white">Features</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Everything you need. Nothing you don't. No premium tiers.
            </p>
            <div className="mt-8 grid gap-4 text-sm text-white/70 sm:grid-cols-3">
              {[
                'AES-256-GCM encryption',
                'No registration needed',
                'Auto-save (every 2 seconds)',
                'Version history (last 10)',
                'Markdown preview',
                'Dark & light themes',
                'Keyboard shortcuts',
                'In-note search (Ctrl+F)',
                'Import from files',
                'Change password anytime',
                'Delete notes permanently',
                'Export/backup encrypted',
                'Works on all devices',
                'Works offline',
                'Open source code',
                'No ads, no tracking'
              ].map((item) => (
                <div key={item} className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">How to use it</h2>
            <div className="mx-auto mt-6 max-w-3xl space-y-6 text-left">
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">1</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Pick a URL</h3>
                    <p className="mt-1 text-sm text-white/70">
                      Type any URL you want in the box above, like <span className="font-mono text-primary-300">protected-text.com/myproject</span>.
                      If nobody's using it, it's yours. First come, first served.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">2</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Set a password</h3>
                    <p className="mt-1 text-sm text-white/70">
                      Choose a strong password. We never see it. It never leaves your browser.
                      If you forget it, your notes are gone forever. Write it down somewhere safe.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">3</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Start typing</h3>
                    <p className="mt-1 text-sm text-white/70">
                      That's it. Your notes auto-save every 2 seconds.
                      Come back later from any device, same URL, same password, and everything's there.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <h2 className="text-2xl font-semibold text-white">FAQ</h2>
          <div className="mt-6 space-y-6 text-white/70">
            <article>
              <h3 className="text-lg font-medium text-white">Q: I forgot my password. Can you help?</h3>
              <p className="mt-2">
                <span className="font-medium text-white">A:</span> No. Sorry. Your password never reaches our servers, so we literally cannot help you.
                We only store encrypted gibberish. Once the password is lost, the notes are gone forever.
                This is the price of real security - write your password down somewhere safe.
              </p>
            </article>
            <article>
              <h3 className="text-lg font-medium text-white">Q: What is "Trustless Security"?</h3>
              <p className="mt-2">
                <span className="font-medium text-white">A:</span> It means you don't have to trust us with anything.
                Your password never leaves your device. All encryption happens in your browser.
                We only store encrypted data that we cannot decrypt. Even if we wanted to read your notes, we can't.
                Even if someone hacks our servers, they get encrypted gibberish.
              </p>
            </article>
            <article>
              <h3 className="text-lg font-medium text-white">Q: How do I backup my notes?</h3>
              <p className="mt-2">
                <span className="font-medium text-white">A:</span> Easy. Open your site and hit Ctrl+S (or Cmd+S on Mac) before entering your password - while the password dialog is still showing.
                This saves the page with your encrypted notes. Later, open that HTML file and enter your password to decrypt.
                You can also use the Export button in the editor to download your encrypted notes.
              </p>
            </article>
            <article>
              <h3 className="text-lg font-medium text-white">Q: Can I share a note publicly?</h3>
              <p className="mt-2">
                <span className="font-medium text-white">A:</span> Yes. Add your password to the URL like this:
                <span className="font-mono text-primary-300"> protected-text.com/yoursite?yourpassword</span>.
                Anyone with that link can read your notes. But be careful - anyone means anyone.
                Don't use this for sensitive stuff.
              </p>
            </article>
            <article>
              <h3 className="text-lg font-medium text-white">Q: Is this really free?</h3>
              <p className="mt-2">
                <span className="font-medium text-white">A:</span> Yes. No ads. No tracking. No premium tiers. No catch.
                We believe privacy is a basic right, not a luxury. If we ever need to monetize, we'll add optional pro features,
                but the core service stays free forever.
              </p>
            </article>
            <article>
              <h3 className="text-lg font-medium text-white">Q: Can someone else take my URL?</h3>
              <p className="mt-2">
                <span className="font-medium text-white">A:</span> If you haven't saved anything yet, technically yes.
                But once you save notes to a URL, that URL is locked to your password.
                Even if someone else tries to use the same URL, they can't read your notes without your password,
                and they can't overwrite them. First saver wins.
              </p>
            </article>
            <article>
              <h3 className="text-lg font-medium text-white">Q: What happens if I change my password?</h3>
              <p className="mt-2">
                <span className="font-medium text-white">A:</span> We decrypt with your old password and re-encrypt with your new one.
                All happens in your browser. The old password becomes useless after that.
                Make sure you remember the new one - we can't help if you forget.
              </p>
            </article>
            <article>
              <h3 className="text-lg font-medium text-white">Q: Where are the servers located?</h3>
              <p className="mt-2">
                <span className="font-medium text-white">A:</span> Our servers are hosted securely, but honestly, it doesn't matter much.
                Since everything is encrypted on your device before it reaches our servers, the server location is less critical than with traditional services.
                We only store encrypted data that nobody can read without your password.
              </p>
            </article>
            <article>
              <h3 className="text-lg font-medium text-white">Q: Can I use this for team collaboration?</h3>
              <p className="mt-2">
                <span className="font-medium text-white">A:</span> Sort of. Multiple people can use the same URL and password.
                But there's no user management or permission system. Everyone with the password has full access.
                If that works for you, go for it. If you need something more sophisticated, this probably isn't it.
              </p>
            </article>
            <article>
              <h3 className="text-lg font-medium text-white">Q: What about government requests for data?</h3>
              <p className="mt-2">
                <span className="font-medium text-white">A:</span> We can only give them encrypted data, which is useless without your password.
                We don't have your password. We don't have your email. We don't even know who you are.
                We can't decrypt your notes even if legally required to. That's the whole point of trustless security.
              </p>
            </article>
          </div>
        </section>

        <footer className="border-t border-white/5 py-8 text-center text-sm text-white/50">
          <p>Built with care in 2025</p>
          <p className="mt-2">
            Questions? <a href="mailto:hello@protected-text.com" className="text-primary-400 hover:text-primary-300">hello@protected-text.com</a>
          </p>
          <p className="mt-2">
            <a href="/pro" className="text-primary-400 hover:text-primary-300">Request Features & Vote on Roadmap</a>
          </p>
          <p className="mt-4 text-xs text-white/40">
            Protected Text is open source. Check the code on GitHub.
          </p>
        </footer>
      </main>
    </div>
  );
}
