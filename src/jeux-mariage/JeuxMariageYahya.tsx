import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ChevronDown, ChevronUp, RotateCcw, Search } from 'lucide-react'
import {
  CLASSEZ_CRITERES,
  ENCHERES_DUELS,
  ENCHERES_SECOURS,
  GAMES,
  KILLER_MISSIONS,
  MIME_GROUPS,
  MIME_PHRASES,
  QUI_DUELS,
  QUI_SECOURS,
  type GameId,
  type ScoreGameId,
  type TeamId,
} from './data'
import './jeux-mariage.css'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Outfit:wght@400;500;600;700&display=swap'
const STORAGE_KEY = 'jeux-mariage-yahya-v1'
const PANEL_KEY = 'jeux-mariage-yahya-panel'
const SCORE_GAMES: ScoreGameId[] = ['mimes', 'classez', 'qui', 'encheres', 'killer']
const TIMER_PRESETS = [15, 30, 60, 90]

type Scores = Record<TeamId, Record<ScoreGameId, number>>
type HistoryItem = { team: TeamId; game: ScoreGameId; delta: number }

const emptyScores = (): Scores => ({
  yahya: { mimes: 0, classez: 0, qui: 0, encheres: 0, killer: 0 },
  floriane: { mimes: 0, classez: 0, qui: 0, encheres: 0, killer: 0 },
})

type Persisted = {
  scores: Scores
  used: string[]
  history: HistoryItem[]
}

function loadState(): Persisted {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { scores: emptyScores(), used: [], history: [] }
    const parsed = JSON.parse(raw) as Persisted
    return {
      scores: parsed.scores ?? emptyScores(),
      used: parsed.used ?? [],
      history: parsed.history ?? [],
    }
  } catch {
    return { scores: emptyScores(), used: [], history: [] }
  }
}

function total(scores: Scores, team: TeamId) {
  return SCORE_GAMES.reduce((sum, game) => sum + (scores[team][game] || 0), 0)
}

let audioCtx: AudioContext | null = null
let audioOut: AudioNode | null = null

function getAudioCtx() {
  const Ctor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  if (!audioCtx) {
    audioCtx = new Ctor()
    const compressor = audioCtx.createDynamicsCompressor()
    compressor.threshold.value = -18
    compressor.knee.value = 6
    compressor.ratio.value = 6
    compressor.attack.value = 0.003
    compressor.release.value = 0.12
    const master = audioCtx.createGain()
    master.gain.value = 1
    compressor.connect(master)
    master.connect(audioCtx.destination)
    audioOut = compressor
  }
  if (audioCtx.state === 'suspended') void audioCtx.resume()
  return audioCtx
}

function blast(
  freqs: number[],
  startAt: number,
  duration: number,
  volume = 0.7,
) {
  const ctx = getAudioCtx()
  if (!ctx || !audioOut) return
  const start = ctx.currentTime + startAt
  const mix = ctx.createGain()
  mix.connect(audioOut)

  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = i === 0 ? 'square' : 'triangle'
    osc.frequency.value = freq
    const vol = i === 0 ? volume : volume * 0.45
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(vol, start + 0.006)
    gain.gain.setValueAtTime(vol, start + Math.max(0.02, duration - 0.05))
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
    osc.connect(gain)
    gain.connect(mix)
    osc.start(start)
    osc.stop(start + duration + 0.02)
  })
}

function playTimerStart() {
  // Two bright referee-style blasts — cuts through a noisy room / phone speaker
  blast([988, 1976], 0, 0.16, 0.72)
  blast([1319, 2637], 0.2, 0.28, 0.82)
}

function playTimerTick(secondsLeft: number) {
  const urgent = secondsLeft <= 2
  const freq = urgent ? 1760 : secondsLeft <= 3 ? 1480 : 1175
  blast([freq, freq * 2], 0, urgent ? 0.16 : 0.12, urgent ? 0.85 : 0.7)
}

function playTimerEnd() {
  // Three honks then a long alarm — impossible to miss
  blast([1047, 2093], 0, 0.16, 0.85)
  blast([1047, 2093], 0.22, 0.16, 0.85)
  blast([784, 1568], 0.44, 0.18, 0.88)
  blast([880, 1319, 1760], 0.72, 0.7, 0.9)
  try {
    navigator.vibrate?.([250, 80, 250, 80, 450])
  } catch {
    /* ignore */
  }
}

function formatTime(seconds: number) {
  const s = Math.max(0, Math.ceil(seconds))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

type SearchHit = { game: GameId; title: string; detail: string }

function buildSearchIndex(): SearchHit[] {
  const hits: SearchHit[] = []
  MIME_GROUPS.forEach((group) =>
    group.words.forEach((word) => hits.push({ game: 'mimes', title: word, detail: `Mimes · ${group.id}` })),
  )
  MIME_PHRASES.forEach((p) =>
    hits.push({
      game: 'mimes',
      title: `${p.sujet} — ${p.verbe} — ${p.complement}`,
      detail: 'Mimes · phrase finale',
    }),
  )
  CLASSEZ_CRITERES.maries.forEach((c) => hits.push({ game: 'classez', title: c, detail: 'Classez-les · mariés' }))
  CLASSEZ_CRITERES.droles.forEach((c) => hits.push({ game: 'classez', title: c, detail: 'Classez-les · drôle' }))
  QUI_DUELS.forEach((d) =>
    d.questions.forEach((q) => hits.push({ game: 'qui', title: q, detail: d.duel })),
  )
  QUI_SECOURS.forEach((q) => hits.push({ game: 'qui', title: q, detail: 'Qui des deux · secours' }))
  ENCHERES_DUELS.forEach((d) =>
    d.categories.forEach((c) => hits.push({ game: 'encheres', title: c.titre, detail: d.duel })),
  )
  ENCHERES_SECOURS.forEach((c) => hits.push({ game: 'encheres', title: c.titre, detail: 'Enchères · secours' }))
  KILLER_MISSIONS.forEach((m) =>
    hits.push({ game: 'killer', title: m.text, detail: `Killer · n°${m.n} · ${m.points} pt${m.points > 1 ? 's' : ''}` }),
  )
  return hits
}

const SEARCH_INDEX = buildSearchIndex()

function CheckRow({
  id,
  used,
  onToggle,
  children,
  points,
  pointsClass,
}: {
  id: string
  used: Set<string>
  onToggle: (id: string) => void
  children: ReactNode
  points?: string
  pointsClass?: string
}) {
  const on = used.has(id)
  return (
    <button type="button" className={`jm-check ${on ? 'is-used' : ''}`} onClick={() => onToggle(id)}>
      <span className="jm-box">{on ? '✓' : ''}</span>
      <div className="jm-check-text">{children}</div>
      {points ? <span className={`jm-pts ${pointsClass ?? ''}`}>{points}</span> : null}
    </button>
  )
}

export default function JeuxMariageYahya() {
  const initial = useRef(loadState())
  const [game, setGame] = useState<GameId>(() => {
    const hash = window.location.hash.replace('#', '') as GameId
    return GAMES.some((g) => g.id === hash) ? hash : 'soiree'
  })
  const [creditTo, setCreditTo] = useState<ScoreGameId>(() => {
    const hash = window.location.hash.replace('#', '')
    return SCORE_GAMES.includes(hash as ScoreGameId) ? (hash as ScoreGameId) : 'mimes'
  })
  const [scores, setScores] = useState<Scores>(initial.current.scores)
  const [used, setUsed] = useState<Set<string>>(() => new Set(initial.current.used))
  const [history, setHistory] = useState<HistoryItem[]>(initial.current.history)
  const [query, setQuery] = useState('')
  const [timer, setTimer] = useState(30)
  const [timerLeft, setTimerLeft] = useState(30)
  const [running, setRunning] = useState(false)
  const [flash, setFlash] = useState(false)
  const [panelOpen, setPanelOpen] = useState(() => {
    if (typeof window === 'undefined') return true
    if (window.innerWidth > 760) return true
    const saved = localStorage.getItem(PANEL_KEY)
    return saved === 'open'
  })
  const endAt = useRef<number | null>(null)
  const lastTickSec = useRef<number | null>(null)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONT_HREF
    document.head.appendChild(link)

    const prevTitle = document.title
    document.title = 'Maître du jeu — Yahya & Floriane'
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow'
    document.head.appendChild(robots)

    return () => {
      document.title = prevTitle
      link.remove()
      robots.remove()
    }
  }, [])

  useEffect(() => {
    const payload: Persisted = {
      scores,
      used: [...used],
      history: history.slice(-40),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }, [scores, used, history])

  useEffect(() => {
    if (window.innerWidth <= 760) {
      localStorage.setItem(PANEL_KEY, panelOpen ? 'open' : 'folded')
    }
  }, [panelOpen])

  useEffect(() => {
    if (!running) return
    const tick = () => {
      if (endAt.current == null) return
      const left = (endAt.current - Date.now()) / 1000
      if (left <= 0) {
        setTimerLeft(0)
        setRunning(false)
        endAt.current = null
        setFlash(true)
        playTimerEnd()
        window.setTimeout(() => setFlash(false), 700)
        return
      }
      const sec = Math.ceil(left)
      if (sec <= 5 && sec >= 1 && lastTickSec.current !== sec) {
        lastTickSec.current = sec
        playTimerTick(sec)
      }
      setTimerLeft(left)
    }
    tick()
    const id = window.setInterval(tick, 100)
    return () => window.clearInterval(id)
  }, [running])

  const setTab = (id: GameId) => {
    setGame(id)
    if (id !== 'soiree') setCreditTo(id)
    setQuery('')
    const path = `${window.location.pathname}${id === 'soiree' ? '' : `#${id}`}`
    window.history.replaceState(null, '', path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addPoints = (team: TeamId, delta: number) => {
    const current = scores[team][creditTo] || 0
    const next = Math.max(0, current + delta)
    const applied = next - current
    if (applied === 0) return
    setScores((prev) => ({
      ...prev,
      [team]: { ...prev[team], [creditTo]: Math.max(0, (prev[team][creditTo] || 0) + delta) },
    }))
    setHistory((prev) => [...prev, { team, game: creditTo, delta: applied }])
  }

  const undo = () => {
    const last = history[history.length - 1]
    if (!last) return
    setScores((prev) => ({
      ...prev,
      [last.team]: {
        ...prev[last.team],
        [last.game]: Math.max(0, (prev[last.team][last.game] || 0) - last.delta),
      },
    }))
    setHistory((prev) => prev.slice(0, -1))
  }

  const resetScores = () => {
    if (!window.confirm('Remettre tous les scores à zéro ?')) return
    setScores(emptyScores())
    setHistory([])
  }

  const toggleUsed = useCallback((id: string) => {
    setUsed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const resetUsed = () => {
    if (!window.confirm('Décocher toutes les listes (mots, questions, missions) ?')) return
    setUsed(new Set())
  }

  const startTimer = (seconds?: number) => {
    const value = seconds ?? timer
    if (seconds) setTimer(seconds)
    setTimerLeft(value)
    endAt.current = Date.now() + value * 1000
    lastTickSec.current = null
    getAudioCtx()
    playTimerStart()
    setRunning(true)
  }

  const toggleTimer = () => {
    if (running) {
      setRunning(false)
      endAt.current = null
      return
    }
    startTimer(timerLeft > 0 ? timerLeft : timer)
  }

  const resetTimer = () => {
    setRunning(false)
    endAt.current = null
    lastTickSec.current = null
    setTimerLeft(timer)
  }

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []
    return SEARCH_INDEX.filter(
      (hit) => hit.title.toLowerCase().includes(q) || hit.detail.toLowerCase().includes(q),
    ).slice(0, 18)
  }, [query])

  const killerFilter = query.trim().toLowerCase()
  const killerList =
    game === 'killer' && killerFilter.length >= 2
      ? KILLER_MISSIONS.filter(
          (m) => m.text.toLowerCase().includes(killerFilter) || String(m.n) === killerFilter,
        )
      : KILLER_MISSIONS

  return (
    <div className="jeux-mariage">
      {flash ? <div className="jm-flash" /> : null}

      <header className={`jm-header ${panelOpen ? 'is-open' : 'is-folded'}`}>
        <div className="jm-header-inner">
          <div className="jm-foldable">
            <div className="jm-kicker">
              <div>
                <p>Maître du jeu</p>
                <h1>Yahya &amp; Floriane</h1>
              </div>
              <p>Team Yahya vs Team Floriane</p>
            </div>

            <div className="jm-scores">
              {(['yahya', 'floriane'] as TeamId[]).map((team) => (
                <div key={team} className={`jm-team is-${team}`}>
                  <div className="jm-team-name">Team {team === 'yahya' ? 'Yahya' : 'Floriane'}</div>
                  <div className="jm-team-row">
                    <div className="jm-team-score">{total(scores, team)}</div>
                    <div className="jm-pm">
                      {[-3, -1, 1, 3].map((n) => (
                        <button key={n} type="button" onClick={() => addPoints(team, n)}>
                          {n > 0 ? `+${n}` : n}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="jm-tools">
              <span className="jm-credit-label">Points →</span>
              <div className="jm-credit" aria-label="Jeu crédité">
                {SCORE_GAMES.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className={`jm-chip ${creditTo === id ? 'is-on' : ''}`}
                    onClick={() => setCreditTo(id)}
                  >
                    {GAMES.find((g) => g.id === id)?.short}
                  </button>
                ))}
              </div>
              <button type="button" className="jm-undo" onClick={undo} disabled={history.length === 0}>
                Annuler
              </button>
              <button type="button" className="jm-ghost" onClick={resetScores}>
                Reset
              </button>
            </div>

            <div className="jm-tools">
              <div className="jm-timer">
                <div className="jm-timer-presets">
                  {TIMER_PRESETS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={timer === s ? 'is-on' : ''}
                      onClick={() => startTimer(s)}
                    >
                      {s}s
                    </button>
                  ))}
                </div>
                <div className={`jm-time ${running && timerLeft <= 5 ? 'is-hot' : ''}`}>
                  {formatTime(timerLeft)}
                </div>
                <button type="button" className="jm-timer-go" onClick={toggleTimer} aria-label={running ? 'Pause' : 'Lancer'}>
                  {running ? '❚❚' : '▶'}
                </button>
                <button type="button" className="jm-timer-reset" onClick={resetTimer} aria-label="Reset chrono">
                  <RotateCcw size={15} />
                </button>
              </div>

              <div className="jm-search">
                <Search size={16} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setQuery('')
                  }}
                  placeholder="Chercher un mot, une question, une mission…"
                />
                {hits.length > 0 && game !== 'killer' ? (
                  <div className="jm-search-results">
                    {hits.map((hit, i) => (
                      <button
                        key={`${hit.game}-${i}`}
                        type="button"
                        className="jm-search-hit"
                        onClick={() => setTab(hit.game)}
                      >
                        <b>{hit.title}</b>
                        <span>{hit.detail}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="jm-dock">
            <button
              type="button"
              className="jm-fold-toggle"
              onClick={() => setPanelOpen((open) => !open)}
              aria-expanded={panelOpen}
              aria-label={panelOpen ? 'Masquer les scores' : 'Afficher les scores'}
            >
              <span className="jm-mini-yahya">Y {total(scores, 'yahya')}</span>
              <span className="jm-mini-sep">·</span>
              <span className="jm-mini-floriane">F {total(scores, 'floriane')}</span>
              {running ? (
                <span className={`jm-mini-time ${timerLeft <= 5 ? 'is-hot' : ''}`}>{formatTime(timerLeft)}</span>
              ) : null}
              <span className="jm-fold-cta">{panelOpen ? 'Masquer' : 'Points'}</span>
              {panelOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <nav className="jm-nav">
              {GAMES.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className={game === g.id ? 'is-on' : ''}
                  onClick={() => setTab(g.id)}
                >
                  {g.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="jm-page">
        {game === 'soiree' && <Soiree scores={scores} onResetUsed={resetUsed} />}
        {game === 'mimes' && <Mimes used={used} onToggle={toggleUsed} />}
        {game === 'classez' && <Classez used={used} onToggle={toggleUsed} />}
        {game === 'qui' && <Qui used={used} onToggle={toggleUsed} />}
        {game === 'encheres' && <Encheres used={used} onToggle={toggleUsed} />}
        {game === 'killer' && (
          <Killer used={used} onToggle={toggleUsed} missions={killerList} filtered={killerList.length !== KILLER_MISSIONS.length} />
        )}
      </main>
    </div>
  )
}

function Soiree({ scores, onResetUsed }: { scores: Scores; onResetUsed: () => void }) {
  return (
    <>
      <p className="jm-lead">
        Deux camps, toute la soirée : Team Yahya contre Team Floriane. Chaque équipe a 3 mini-groupes
        (M1–M3 / F1–F3). Quatre jeux se jouent à tour de rôle ; le Killer tourne en parallèle dès le début.
      </p>
      <div className="jm-grid cols-2">
        <article className="jm-card">
          <h2>Ordre de la soirée</h2>
          <ol className="jm-steps">
            <li>Distribuer les papiers Killer avant tout.</li>
            <li>Mimes — manches A puis B.</li>
            <li>Classez-les — 3 duels (6 classements).</li>
            <li>Qui des deux — 3 duels, ~5 questions chacun.</li>
            <li>Enchères — 3 duels, 4 catégories chacun.</li>
            <li>Couper le Killer à l’heure annoncée, puis score final.</li>
          </ol>
        </article>
        <article className="jm-card">
          <h2>Ton rôle</h2>
          <ol className="jm-steps">
            <li>Appeler les mini-groupes, chronométrer, valider.</li>
            <li>Ajouter les points ici (crédités au jeu coché en haut).</li>
            <li>Cocher les listes déjà utilisées pour ne pas te répéter.</li>
            <li>Valider chaque kill : regarder le papier, confirmer avec la victime.</li>
          </ol>
          <p className="jm-note">Les scores et les coches restent si tu recharges la page.</p>
          <button type="button" className="jm-chip-light" style={{ marginTop: 12 }} onClick={onResetUsed}>
            Décocher les listes
          </button>
        </article>
      </div>

      <p className="jm-section-label">Détail des scores</p>
      <article className="jm-card">
        <div className="jm-score-table">
          <div className="jm-score-head">
            <span />
            <span>Yahya</span>
            <span>Floriane</span>
          </div>
          {SCORE_GAMES.map((id) => (
            <div key={id}>
              <span>{GAMES.find((g) => g.id === id)?.label}</span>
              <span>{scores.yahya[id]}</span>
              <span>{scores.floriane[id]}</span>
            </div>
          ))}
          <div className="is-total">
            <span>Total</span>
            <span>{total(scores, 'yahya')}</span>
            <span>{total(scores, 'floriane')}</span>
          </div>
        </div>
      </article>
    </>
  )
}

function Mimes({ used, onToggle }: { used: Set<string>; onToggle: (id: string) => void }) {
  return (
    <>
      <p className="jm-lead">
        Yahya mime pour sa team, Floriane pour la sienne. Deux manches : mimes classiques, puis une
        phrase cassée en trois morceaux.
      </p>
      <div className="jm-split">
        <article className="jm-card">
          <h2>Manche A — 30 s / mot</h2>
          <div className="jm-meta">
            <span className="jm-tag">+1 mot trouvé</span>
            <span className="jm-tag">vol +3</span>
            <span className="jm-tag">max 7 / mini-groupe</span>
            <span className="jm-tag navy">max 21 / team</span>
          </div>
          <ol className="jm-steps">
            <li>Un mini-groupe à la fois, 4 mots.</li>
            <li>L’adversaire a <b>un seul vol</b> sur les 4 mots : crier « VOL ! ».</li>
            <li>Vol réussi : +3. Vol raté : plus de vol, le groupe continue jusqu’au chrono.</li>
          </ol>
        </article>
        <article className="jm-card">
          <h2>Manche B — phrase</h2>
          <div className="jm-meta">
            <span className="jm-tag">+1 / mot retrouvé</span>
            <span className="jm-tag">+2 phrase</span>
            <span className="jm-tag">ou +1 idée partielle</span>
            <span className="jm-tag rose">max 5 / team</span>
          </div>
          <ol className="jm-steps">
            <li>Sujet et complément : dessin dans le dos, file indienne, silence.</li>
            <li>Verbe : chuchoté une seule fois, sans répétition.</li>
            <li>Les 3 derniers miment au leader. 60 s pour retrouver la phrase.</li>
            <li>Ils miment ce qu’ils ont compris, pas le mot original.</li>
          </ol>
        </article>
      </div>

      <p className="jm-section-label">Listes — Manche A · coche ce qui est joué</p>
      <div className="jm-grid cols-2">
        {MIME_GROUPS.map((group) => (
          <article key={group.id} className="jm-card">
            <div className="jm-group-title">{group.id}{group.id === 'G7' || group.id === 'G8' ? ' · secours' : ''}</div>
            {group.words.map((word, i) => (
              <CheckRow key={word} id={`mime-${group.id}-${i}`} used={used} onToggle={onToggle}>
                {word}
              </CheckRow>
            ))}
          </article>
        ))}
      </div>

      <p className="jm-section-label">Phrases — Manche B</p>
      <article className="jm-card">
        {MIME_PHRASES.map((p, i) => (
          <CheckRow key={p.sujet} id={`phrase-${i}`} used={used} onToggle={onToggle}>
            <span className="jm-phrase">
              <b>{p.sujet}</b>
              <i>—</i>
              <b>{p.verbe}</b>
              <i>—</i>
              <b>{p.complement}</b>
            </span>
          </CheckRow>
        ))}
      </article>
    </>
  )
}

function Classez({ used, onToggle }: { used: Set<string>; onToggle: (id: string) => void }) {
  return (
    <>
      <p className="jm-lead">
        Un mini-groupe se met devant. L’autre a 90 s pour le ranger selon un critère. Puis on inverse.
        Toi tu n’as pas besoin des réponses : ils les révèlent eux-mêmes.
      </p>
      <article className="jm-card">
        <div className="jm-meta">
          <span className="jm-tag">90 s</span>
          <span className="jm-tag">+1 / bonne place</span>
          <span className="jm-tag">+2 si parfait</span>
          <span className="jm-tag navy">max 7 (5 pers.) / 8 (6 pers.)</span>
        </div>
        <ol className="jm-steps">
          <li>Duels : M1↔F1, M2↔F2, M3↔F3.</li>
          <li>Questions OK, mais <b>jamais la donnée directe</b>. Tu valides ou tu refuses avant la réponse.</li>
          <li>STOP → classement figé → ils se replacent dans le vrai ordre → tu comptes les positions exactes.</li>
          <li>Ex aequo : les deux ordres passent.</li>
        </ol>
        <p className="jm-note">
          Ex. « Combien de pays ? » = refusé. « Tu as déjà vécu à l’étranger ? » = accepté.
        </p>
      </article>

      <p className="jm-section-label">Critères liés aux mariés</p>
      <article className="jm-card">
        {CLASSEZ_CRITERES.maries.map((c, i) => (
          <CheckRow key={c} id={`classez-m-${i}`} used={used} onToggle={onToggle}>
            {c}
          </CheckRow>
        ))}
      </article>

      <p className="jm-section-label">Critères plus drôles</p>
      <article className="jm-card">
        {CLASSEZ_CRITERES.droles.map((c, i) => (
          <CheckRow key={c} id={`classez-d-${i}`} used={used} onToggle={onToggle}>
            {c}
          </CheckRow>
        ))}
      </article>
    </>
  )
}

function Qui({ used, onToggle }: { used: Set<string>; onToggle: (id: string) => void }) {
  return (
    <>
      <p className="jm-lead">
        Les mini-groupes tentent de deviner la réponse sur laquelle Yahya et Floriane seront d’accord.
        Panneaux : YAHYA / FLORIANE.
      </p>
      <article className="jm-card">
        <div className="jm-meta">
          <span className="jm-tag">15 s de discussion</span>
          <span className="jm-tag">+1 si couple d’accord et bon vote</span>
          <span className="jm-tag rose">désaccord couple = 0 partout</span>
        </div>
        <ol className="jm-steps">
          <li>Tu poses la question. Groupes et mariés choisissent sans se parler.</li>
          <li>« Votes verrouillés » → les deux mini-groupes révèlent.</li>
          <li>Puis « 3, 2, 1 » : Yahya et Floriane révèlent ensemble.</li>
          <li>S’ils ne sont pas d’accord : aucun point, une blague, question suivante. Pas de débat.</li>
        </ol>
      </article>

      {QUI_DUELS.map((d, di) => (
        <article key={d.duel} className="jm-card" style={{ marginTop: 12 }}>
          <h3>{d.duel}</h3>
          {d.questions.map((q, i) => (
            <CheckRow key={q} id={`qui-${di}-${i}`} used={used} onToggle={onToggle}>
              {q}
            </CheckRow>
          ))}
        </article>
      ))}

      <p className="jm-section-label">Secours</p>
      <article className="jm-card">
        {QUI_SECOURS.map((q, i) => (
          <CheckRow key={q} id={`qui-s-${i}`} used={used} onToggle={onToggle}>
            {q}
          </CheckRow>
        ))}
      </article>
    </>
  )
}

function Encheres({ used, onToggle }: { used: Set<string>; onToggle: (id: string) => void }) {
  return (
    <>
      <p className="jm-lead">
        Une catégorie, on enchérrit sur le nombre de réponses. L’autre dit « OK, vas-y » : 60 s pour
        prouver. Atteindre le nombre suffit, pas besoin d’aller plus loin.
      </p>
      <article className="jm-card">
        <div className="jm-meta">
          <span className="jm-tag">60 s</span>
          <span className="jm-tag">+1 au gagnant de l’enchère</span>
          <span className="jm-tag navy">4 catégories / duel</span>
        </div>
        <ol className="jm-steps">
          <li>On alterne qui ouvre (M, F, M, F).</li>
          <li>Surenchère ou « OK, vas-y ».</li>
          <li>Réussite : le groupe qui a promis marque. Échec : l’autre marque.</li>
          <li>Pousser l’adversaire trop haut est une stratégie.</li>
        </ol>
      </article>

      {ENCHERES_DUELS.map((d, di) => (
        <article key={d.duel} className="jm-card" style={{ marginTop: 12 }}>
          <h3>{d.duel}</h3>
          {d.categories.map((c, i) => (
            <CheckRow key={c.titre} id={`enc-${di}-${i}`} used={used} onToggle={onToggle}>
              <b>{c.titre}</b>
              <div style={{ fontWeight: 400, color: 'var(--jm-muted)', marginTop: 2 }}>{c.question}</div>
            </CheckRow>
          ))}
        </article>
      ))}

      <p className="jm-section-label">Secours</p>
      <article className="jm-card">
        {ENCHERES_SECOURS.map((c, i) => (
          <CheckRow key={c.titre} id={`enc-s-${i}`} used={used} onToggle={onToggle}>
            <b>{c.titre}</b>
            <div style={{ fontWeight: 400, color: 'var(--jm-muted)', marginTop: 2 }}>{c.question}</div>
          </CheckRow>
        ))}
      </article>
    </>
  )
}

function Killer({
  used,
  onToggle,
  missions,
  filtered,
}: {
  used: Set<string>
  onToggle: (id: string) => void
  missions: typeof KILLER_MISSIONS
  filtered: boolean
}) {
  return (
    <>
      <p className="jm-lead">
        Toute la soirée, en fond. Pas de cible imposée : on tue n’importe qui encore vivant, plutôt
        l’autre camp. La mission doit arriver naturellement — « dis ça pour le jeu » ne compte pas.
      </p>
      <article className="jm-card">
        <div className="jm-meta">
          <span className="jm-tag">1 / 2 / 3 pts selon le papier</span>
          <span className="jm-tag navy">points → équipe du killer</span>
        </div>
        <ol className="jm-steps">
          <li>Kill annoncé → les deux viennent te voir.</li>
          <li>Tu lis la mission, tu confirmes avec la victime, tu ajoutes les points.</li>
          <li>La victime donne son papier au killer. Elle ne joue plus.</li>
          <li>Interdit de montrer son papier ou de spoiler les missions vues.</li>
        </ol>
        <p className="jm-note">
          {filtered ? `${missions.length} mission${missions.length > 1 ? 's' : ''} trouvée${missions.length > 1 ? 's' : ''}.` : '18 faciles · 22 moyennes · 10 difficiles (dont 2 photo). Coche après validation.'}
        </p>
      </article>

      {([1, 2, 3] as const).map((pts) => {
        const list = missions.filter((m) => m.points === pts)
        if (list.length === 0) return null
        return (
          <article key={pts} className="jm-card" style={{ marginTop: 12 }}>
            <div className="jm-group-title">
              {pts} point{pts > 1 ? 's' : ''} · {list.length} mission{list.length > 1 ? 's' : ''}
            </div>
            {list.map((m) => (
              <CheckRow
                key={m.n}
                id={`kill-${m.n}`}
                used={used}
                onToggle={onToggle}
                points={m.photo ? 'photo' : undefined}
                pointsClass="p3"
              >
                <b>n°{m.n}.</b> {m.text}
              </CheckRow>
            ))}
          </article>
        )
      })}
    </>
  )
}
