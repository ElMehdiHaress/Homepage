import { useState, useMemo, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';
import profileImage from './assets/recent-me.jpeg';
import brownianSlateSeed10 from './assets/brownian-slate-seed10.png';
import { photoCount } from './photos';

interface ResearchProject {
  title: string;
  institution: string;
  period: string;
  type: string;
  url?: string;
}

interface GitProject {
  title: string;
  description: string;
  type: string;
  url: string;
  secondUrl?: string;
}

interface PersonalProject {
  title: string;
  description: string;
  status?: string;
  type: string;
  url: string;
}

type SectionKey = 'academic' | 'research' | 'personal' | 'all';

const researchProjects: ResearchProject[] = [
  {
    title: "Managing tutoring classes. Debriefing math tutors",
    institution: "CentraleSupélec",
    period: "2023-2024",
    type: "Management"
  },
  {
    title: "Member of the organising committee of the FRSSD26. Fractional, rough and singular stochastic dynamics",
    institution: "",
    period: "2026",
    type: "Organization",
    url: "https://conferences.leeds.ac.uk/frssd2026/"
  },
  {
    title: "Member of the organising committee of the CJC-MA. Le Congrès des Jeunes Chercheurs en Mathématiques et Applications",
    institution: "",
    period: "2023",
    type: "Organization",
    url: "https://cjcma2023.sciencesconf.org"
  }
];

const gitProjects: GitProject[] = [
  {
    title: "Fbm ergodic estimation: matching the density at final time to a target density",
    description: "Fractional Brownian motion ergodic estimation",
    type: "Research Code",
    url: "https://github.com/ElMehdiHaress/ergodicfBm"
  },
  {
    title: "A short guide to estimating the parameters (drift, hurst and diffusion parameter) in a fractional additive stochastic differential equation",
    description: "Parameter estimation for fractional SDEs",
    type: "Research Code",
    url: "https://github.com/ElMehdiHaress/estimation-for-SDEs"
  },
  {
    title: "Beyond-CVaR and Risk-averse-feedback",
    description: "Risk management and feedback algorithms",
    type: "Research Code",
    url: "https://github.com/ElMehdiHaress/Beyond-CVaR",
    secondUrl: "https://github.com/ElMehdiHaress/Risk-averse-feedback"
  },
  {
    title: "Gradient descents using Malliavin calculus",
    description: "Mathematical optimization using Malliavin calculus",
    type: "Research Code",
    url: "https://github.com/ElMehdiHaress/MalliavinRegression"
  }
];

const personalProjects: PersonalProject[] = [
  {
    title: "Board game in progress. Maze of might",
    description: "Game development project",
    status: "In Progress",
    type: "Game Development",
    url: "https://mazeofmight.com"
  },
  {
    title: "Beauty salon website design and management. Hana Bella",
    description: "Web design and management",
    type: "Web Development",
    url: "https://hanabellaspa.pro"
  },
  {
    title: "Art and music",
    description: "Lo-fi music + sketches",
    type: "Creative",
    url: "https://www.youtube.com/@sonosketchy"
  }
];

type Tone = 'accent' | 'muted' | 'amber';
interface Tag {
  label: string;
  tone: Tone;
}
interface Card {
  key: string;
  emoji: string;
  title: string;
  subtitle?: string;
  description?: string;
  tags: Tag[];
  accent: string;
  accentSoft: string;
  href?: string;
  secondHref?: string;
  onClick?: () => void;
  cta?: string;
}

const Projects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<SectionKey>('all');

  const handleBackToHome = () => navigate('/');

  const sectionTabs = [
    { key: 'all' as SectionKey, label: 'All', emoji: '✨', accent: '#141820' },
    { key: 'academic' as SectionKey, label: 'Academic', emoji: '🎓', accent: '#3880b9' },
    { key: 'research' as SectionKey, label: 'Research', emoji: '🔬', accent: '#2e5c8a' },
    { key: 'personal' as SectionKey, label: 'Personal', emoji: '🎨', accent: '#4fa3a3' },
  ];

  const filteredAcademic = useMemo(() => {
    if (!searchTerm) return researchProjects;
    const q = searchTerm.toLowerCase();
    return researchProjects.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.institution.toLowerCase().includes(q) ||
      p.period.includes(searchTerm) ||
      p.type.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const filteredResearch = useMemo(() => {
    if (!searchTerm) return gitProjects;
    const q = searchTerm.toLowerCase();
    return gitProjects.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const filteredPersonal = useMemo(() => {
    if (!searchTerm) return personalProjects;
    const q = searchTerm.toLowerCase();
    return personalProjects.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.status && p.status.toLowerCase().includes(q)) ||
      p.type.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  // One unified, playful card list across every project type
  const cards = useMemo(() => {
    const list: Card[] = [];
    const showAcademic = selectedSection === 'academic' || selectedSection === 'all';
    const showResearch = selectedSection === 'research' || selectedSection === 'all';
    const showPersonal = selectedSection === 'personal' || selectedSection === 'all';

    if (showAcademic) {
      filteredAcademic.forEach((p, i) =>
        list.push({
          key: `academic-${i}`,
          emoji: p.type === 'Organization' ? '🗂️' : '🧑‍🏫',
          title: p.title,
          subtitle: p.institution || undefined,
          tags: [
            { label: p.period, tone: 'muted' },
            { label: p.type, tone: 'accent' },
          ],
          accent: '#3880b9',
          accentSoft: 'rgba(56, 128, 185, 0.12)',
          href: p.url,
        })
      );
    }

    if (showResearch) {
      filteredResearch.forEach((p, i) =>
        list.push({
          key: `research-${i}`,
          emoji: '💻',
          title: p.title,
          description: p.description,
          tags: [{ label: p.type, tone: 'accent' }],
          accent: '#2e5c8a',
          accentSoft: 'rgba(46, 92, 138, 0.12)',
          href: p.url,
          secondHref: p.secondUrl,
        })
      );
    }

    if (showPersonal) {
      const personalTheme: Record<string, { emoji: string; accent: string; accentSoft: string }> = {
        'Game Development': { emoji: '🎲', accent: '#e0a458', accentSoft: 'rgba(224, 160, 88, 0.18)' },
        'Web Development': { emoji: '🌸', accent: '#c97b9a', accentSoft: 'rgba(201, 123, 154, 0.18)' },
        'Creative': { emoji: '🎵', accent: '#4fa3a3', accentSoft: 'rgba(79, 163, 163, 0.18)' },
      };
      filteredPersonal.forEach((p, i) => {
        const theme = personalTheme[p.type] ?? {
          emoji: '✨',
          accent: '#5c6370',
          accentSoft: 'rgba(92, 99, 112, 0.14)',
        };
        list.push({
          key: `personal-${i}`,
          emoji: theme.emoji,
          title: p.title,
          description: p.description,
          tags: [
            ...(p.status ? [{ label: p.status, tone: 'amber' as const }] : []),
            { label: p.type, tone: 'accent' as const },
          ],
          accent: theme.accent,
          accentSoft: theme.accentSoft,
          href: p.url,
        });
      });

      const photoMatches =
        !searchTerm || 'photography creative photos camera'.includes(searchTerm.toLowerCase());
      if (photoCount > 0 && photoMatches) {
        list.push({
          key: 'photography',
          emoji: '📷',
          title: 'Photography',
          description: 'A roll of frames from the field, long exposures, light, and quiet moments.',
          tags: [{ label: 'Creative', tone: 'accent' }],
          accent: '#3880b9',
          accentSoft: 'rgba(56, 128, 185, 0.12)',
          onClick: () => navigate('/photography'),
          cta: `View gallery (${photoCount}) →`,
        });
      }
    }

    return list;
  }, [selectedSection, filteredAcademic, filteredResearch, filteredPersonal, searchTerm, navigate]);

  const tagStyle = (tone: Tone, accent: string, accentSoft: string) => {
    if (tone === 'amber') return { color: '#b9762f', background: 'rgba(224, 160, 88, 0.18)' };
    if (tone === 'muted') return { color: '#5c6370', background: 'rgba(92, 99, 112, 0.12)' };
    return { color: accent, background: accentSoft };
  };

  const renderCardInner = (card: Card) => (
    <>
      <div className="pc-emoji" style={{ background: card.accentSoft }}>{card.emoji}</div>
      <h3 className="pc-title">{card.title}</h3>
      {card.subtitle && (
        <p className="pc-subtitle" style={{ color: card.accent }}>{card.subtitle}</p>
      )}
      {card.description && <p className="pc-desc">{card.description}</p>}
      <div className="pc-tags">
        {card.tags.map((t, ti) => {
          const s = tagStyle(t.tone, card.accent, card.accentSoft);
          return (
            <span key={ti} className="pc-tag" style={{ color: s.color, background: s.background }}>
              {t.label}
            </span>
          );
        })}
        {card.cta && (
          <span className="pc-cta" style={{ color: card.accent }}>{card.cta}</span>
        )}
      </div>
    </>
  );

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#f8f9fb',
      backgroundImage: `linear-gradient(rgba(248, 249, 251, 0.88), rgba(248, 249, 251, 0.88)), url(${brownianSlateSeed10})`,
      backgroundSize: '1200px auto',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      position: 'relative',
      margin: 0,
      padding: '40px 20px',
      color: '#141820'
    }}>
      {/* Persistent Menu Bar */}
      <MenuBar />

      {/* Banner Section */}
      <div
        className="page-banner"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#2e5c8a',
          borderTop: '2px solid #3880b9',
          borderBottom: '2px solid #3880b9',
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(20px, 3vw, 40px) clamp(20px, 5vw, 80px)',
          paddingTop: 'clamp(30px, 4vw, 50px)',
          zIndex: 99,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
        }}
      >
        <img
          src={profileImage}
          alt="El Mehdi Haress"
          style={{
            width: 'clamp(100px, 15vw, 150px)',
            height: 'clamp(100px, 15vw, 150px)',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid #ffffff',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
        />

        <div style={{
          position: 'absolute',
          left: '50%',
          top: 'calc(50% + 15px)',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1
            className="banner-name"
            style={{
              color: '#ffffff',
              fontSize: 'clamp(24px, 5vw, 48px)',
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
              textTransform: 'uppercase',
              letterSpacing: 'clamp(2px, 0.5vw, 4px)',
              margin: 0,
              textAlign: 'center',
              whiteSpace: 'nowrap'
            }}
          >
            Projects
          </h1>
        </div>
      </div>

      {/* Back to Home Button */}
      <button
        className="back-button"
        onClick={handleBackToHome}
        style={{
          position: 'fixed',
          top: '30px',
          left: '30px',
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.3)',
          borderRadius: '12px',
          padding: '10px 20px',
          color: '#1f2937',
          fontSize: '14px',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        ← Back to Home
      </button>

      {/* Main Content */}
      <div
        className="projects-container"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          paddingTop: '40px'
        }}
      >
        <p style={{
          textAlign: 'center',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: '#5c6370',
          maxWidth: '640px',
          margin: '0 auto 36px auto',
          lineHeight: 1.6
        }}>
          A mix of research, code, and things I build for fun. Pick a flavour, or browse them all.
        </p>

        {/* Playful filter chips */}
        <div className="pc-chips">
          {sectionTabs.map((tab) => {
            const active = selectedSection === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedSection(tab.key)}
                className="pc-chip"
                style={{
                  borderColor: active ? tab.accent : 'rgba(20, 24, 32, 0.14)',
                  background: active ? tab.accent : 'rgba(255, 255, 255, 0.75)',
                  color: active ? '#ffffff' : '#5c6370',
                }}
              >
                <span className="pc-chip-emoji">{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 14px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '460px' }}>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '13px 18px 13px 46px',
                fontSize: 'clamp(14px, 2vw, 16px)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '2px solid rgba(20, 24, 32, 0.1)',
                borderRadius: '999px',
                color: '#141820',
                outline: 'none',
                transition: 'all 0.25s ease'
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(56, 128, 185, 0.6)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(20, 24, 32, 0.1)'; }}
            />
            <div style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '17px'
            }}>
              🔍
            </div>
          </div>
        </div>

        {/* Count */}
        <p style={{ textAlign: 'center', color: '#5c6370', fontSize: '0.95rem', marginBottom: '34px' }}>
          {cards.length} {cards.length === 1 ? 'project' : 'projects'}
        </p>

        {/* Playful project grid */}
        <div
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '28px'
          }}
        >
          {cards.map((card, i) => {
            const tilt = i % 3 === 0 ? -1.4 : i % 3 === 1 ? 1.2 : -0.5;
            const styleVars = {
              '--tilt': `${tilt}deg`,
              '--pc-accent': card.accent,
              '--pc-accent-soft': card.accentSoft,
            } as unknown as CSSProperties;

            if (card.href) {
              return (
                <a
                  key={card.key}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="playful-card"
                  style={styleVars}
                >
                  {card.secondHref && (
                    <button
                      className="pc-second"
                      aria-label="Second repository"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(card.secondHref, '_blank', 'noopener');
                      }}
                    >
                      🔗
                    </button>
                  )}
                  {renderCardInner(card)}
                </a>
              );
            }

            return (
              <div
                key={card.key}
                className="playful-card"
                style={styleVars}
                onClick={card.onClick}
              >
                {renderCardInner(card)}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {cards.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 40px',
            color: '#9ca3af',
            fontSize: 'clamp(16px, 2.5vw, 18px)'
          }}>
            {searchTerm
              ? `No projects found matching "${searchTerm}"`
              : 'No projects in this section'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
