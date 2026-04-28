import profileImage from './assets/recent-me.jpeg';
import MenuBar from './MenuBar';
import { FileText, GraduationCap } from 'lucide-react';
import brownianSlateSeed1 from './assets/brownian-slate-seed1.png';

const Homepage = () => {
  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#f8f9fb',
      backgroundImage: `linear-gradient(rgba(248, 249, 251, 0.86), rgba(248, 249, 251, 0.86)), url(${brownianSlateSeed1})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      margin: 0,
      padding: '40px 20px',
      cursor: 'default'
    }}>
      {/* Persistent Menu Bar */}
      <MenuBar />
      
      {/* Banner Section */}
      <div 
        className="page-banner"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#3880b9',
          borderTop: '2px solid #2e5c8a',
          borderBottom: '2px solid #2e5c8a',
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(20px, 3vw, 40px) clamp(20px, 5vw, 80px)',
          paddingTop: 'clamp(30px, 4vw, 50px)',
          zIndex: 99,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Profile Image on the left */}
        <img 
          src={profileImage} 
          alt="El Mehdi Haress" 
          style={{
            width: 'clamp(100px, 15vw, 150px)',
            height: 'clamp(100px, 15vw, 150px)',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid #d4d7dd',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
        />
        
        {/* Name in the middle - absolutely centered */}
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
            El Mehdi <span style={{ fontWeight: '700' }}>Haress</span>
          </h1>
        </div>
      </div>
      
      {/* Profile Section - Center with Text */}
      <div 
        className="profile-section"
        style={{
          position: 'relative',
          left: 'auto',
          top: 'auto',
          transform: 'none',
          margin: '0 auto',
          zIndex: 100,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          maxWidth: '1200px',
          width: '90%',
          padding: '40px 20px'
        }}
      >
        {/* Two Column Layout */}
        <div 
          className="homepage-content-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(30px, 5vw, 60px)',
            width: '100%',
            color: '#1f2937', 
            fontSize: 'clamp(14px, 2.5vw, 18px)', 
            lineHeight: '1.8'
          }}
        >
          {/* Left Column: Positions and Contact */}
          <div style={{ minWidth: 0 }}>
            {/* Positions Section */}
            <div style={{ marginBottom: 'clamp(24px, 4vw, 32px)' }}>
            <h2 style={{ 
              fontSize: 'clamp(18px, 3vw, 22px)', 
              fontWeight: 'bold', 
              marginBottom: 'clamp(12px, 2vw, 16px)',
              color: '#1f2937'
            }}>
              Positions
            </h2>
            <p style={{ marginBottom: 'clamp(12px, 2vw, 16px)', fontSize: 'clamp(14px, 2.2vw, 16px)' }}>
              2025+: Research fellow in Stochastic Analysis at University of Leeds supervised by{' '}
              <a 
                href="https://eps.leeds.ac.uk/maths/staff/6172/dr-konstantinos-dareiotis"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#60a5fa',
                  textDecoration: 'underline',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => (e.target as HTMLElement).style.color = '#93c5fd'}
                onMouseOut={(e) => (e.target as HTMLElement).style.color = '#60a5fa'}
              >
                Konstantinos Dareiotis
              </a>
              {' '}and{' '}
              <a 
                href="https://eps.leeds.ac.uk/faculty-engineering-physical-sciences/staff/12207/khoa-l"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#60a5fa',
                  textDecoration: 'underline',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => (e.target as HTMLElement).style.color = '#93c5fd'}
                onMouseOut={(e) => (e.target as HTMLElement).style.color = '#60a5fa'}
              >
                Khoa Lê
              </a>
            </p>
            <p style={{ marginBottom: '0', fontSize: 'clamp(14px, 2.2vw, 16px)' }}>
              2021-2024: PhD at Paris-Saclay University, supervised by{' '}
              <a 
                href="https://w3.ens-rennes.fr/math/people/ludovic.goudenege/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#60a5fa',
                  textDecoration: 'underline',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => (e.target as HTMLElement).style.color = '#93c5fd'}
                onMouseOut={(e) => (e.target as HTMLElement).style.color = '#60a5fa'}
              >
                Ludovic Goudenège
              </a>
              {' '}and{' '}
              <a 
                href="https://arichard.perso.math.cnrs.fr"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#60a5fa',
                  textDecoration: 'underline',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => (e.target as HTMLElement).style.color = '#93c5fd'}
                onMouseOut={(e) => (e.target as HTMLElement).style.color = '#60a5fa'}
              >
                Alexandre Richard
              </a>
            </p>
          </div>

            {/* Contact Section */}
            <div>
              <h2 style={{ 
                fontSize: 'clamp(18px, 3vw, 22px)', 
                fontWeight: 'bold', 
                marginBottom: 'clamp(12px, 2vw, 16px)',
                color: '#1f2937'
              }}>
                Contact
              </h2>
              <p style={{ marginBottom: '0', fontSize: 'clamp(14px, 2.2vw, 16px)' }}>
                <a 
                  href="mailto:e.haress@leeds.ac.uk"
                  style={{
                    color: '#60a5fa',
                    textDecoration: 'underline',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => (e.target as HTMLElement).style.color = '#93c5fd'}
                  onMouseOut={(e) => (e.target as HTMLElement).style.color = '#60a5fa'}
                >
                  e.haress@leeds.ac.uk
                </a>
              </p>
            </div>
          </div>

          {/* Right Column: Research Interests and Collaborators */}
          <div style={{ minWidth: 0 }}>
            {/* Research Interests Section */}
            <div style={{ marginBottom: 'clamp(24px, 4vw, 32px)' }}>
              <h2 style={{ 
                fontSize: 'clamp(18px, 3vw, 22px)', 
                fontWeight: 'bold', 
                marginBottom: 'clamp(12px, 2vw, 16px)',
                color: '#1f2937'
              }}>
                Research Interests
              </h2>
              <p style={{ marginBottom: '0', fontSize: 'clamp(14px, 2.2vw, 16px)', color: '#1f2937' }}>
                Singular and dissipative stochastic dynamics with memory: fractional Brownian motion, SDEs and SPDEs, long-time regularity, invariant measures, inverse and learning problems.
              </p>
            </div>

            {/* Collaborators Section */}
            <div style={{ marginBottom: 'clamp(24px, 4vw, 32px)' }}>
            <h2 style={{ 
              fontSize: 'clamp(18px, 3vw, 22px)', 
              fontWeight: 'bold', 
              marginBottom: 'clamp(12px, 2vw, 16px)',
              color: '#1f2937'
            }}>
              Collaborators
            </h2>
            <div style={{ fontSize: 'clamp(14px, 2.2vw, 16px)', color: '#1f2937' }}>
              <p style={{ marginBottom: 'clamp(8px, 1.5vw, 12px)' }}>
                <a 
                  href="https://scholar.google.com/citations?user=fGuEdkYAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#60a5fa',
                    textDecoration: 'underline',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => (e.target as HTMLElement).style.color = '#93c5fd'}
                  onMouseOut={(e) => (e.target as HTMLElement).style.color = '#60a5fa'}
                >
                  Konstantinos Dareiotis
                </a>
                {' '}(University of Leeds)
              </p>
              <p style={{ marginBottom: 'clamp(8px, 1.5vw, 12px)' }}>
                <a 
                  href="https://goudenege.perso.math.cnrs.fr/output/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#60a5fa',
                    textDecoration: 'underline',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => (e.target as HTMLElement).style.color = '#93c5fd'}
                  onMouseOut={(e) => (e.target as HTMLElement).style.color = '#60a5fa'}
                >
                  Ludovic Goudenège
                </a>
                {' '}(Université Évry)
              </p>
              <p style={{ marginBottom: 'clamp(8px, 1.5vw, 12px)' }}>
                <a 
                  href="https://feedbackward.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#60a5fa',
                    textDecoration: 'underline',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => (e.target as HTMLElement).style.color = '#93c5fd'}
                  onMouseOut={(e) => (e.target as HTMLElement).style.color = '#60a5fa'}
                >
                  Matthew Holland
                </a>
                {' '}(Osaka University)
              </p>
              <p style={{ marginBottom: 'clamp(8px, 1.5vw, 12px)' }}>
                <a 
                  href="https://sites.ualberta.ca/~yaozhong/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#60a5fa',
                    textDecoration: 'underline',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => (e.target as HTMLElement).style.color = '#93c5fd'}
                  onMouseOut={(e) => (e.target as HTMLElement).style.color = '#60a5fa'}
                >
                  Yaozhong Hu
                </a>
                {' '}(University of Alberta)
              </p>
              <p style={{ marginBottom: 'clamp(8px, 1.5vw, 12px)' }}>
                <a 
                  href="https://scholar.google.com/citations?user=q8MQahcAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#60a5fa',
                    textDecoration: 'underline',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => (e.target as HTMLElement).style.color = '#93c5fd'}
                  onMouseOut={(e) => (e.target as HTMLElement).style.color = '#60a5fa'}
                >
                  Khoa Lê
                </a>
                {' '}(University of Leeds)
              </p>
              <p style={{ marginBottom: '0' }}>
                <a 
                  href="https://arichard.perso.math.cnrs.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#60a5fa',
                    textDecoration: 'underline',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => (e.target as HTMLElement).style.color = '#93c5fd'}
                  onMouseOut={(e) => (e.target as HTMLElement).style.color = '#60a5fa'}
                >
                  Alexandre Richard
                </a>
                {' '}(CNRS, Paris-Saclay University)
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Social/Academic Links - Bottom Center */}
      <div 
        className="social-links"
        style={{
          position: 'fixed',
          left: '50%',
          bottom: '60px',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          gap: '12px'
        }}
      >
        {/* Google Scholar Link */}
        <a
          href="https://scholar.google.com/citations?user=D13FK0EAAAAJ&hl=fr&oi=ao"
          target="_blank"
          rel="noopener noreferrer"
          title="Google Scholar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '9px 12px',
            backgroundColor: 'rgba(248, 249, 251, 0.98)',
            border: '1px solid #d4d7dd',
            borderRadius: '10px',
            boxShadow: '0 8px 20px rgba(20, 24, 32, 0.12)',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
            color: '#5c6370',
            fontSize: '14px',
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 10px 24px rgba(20, 24, 32, 0.18)';
            e.currentTarget.style.backgroundColor = '#d4d7dd';
            e.currentTarget.style.color = '#2e5c8a';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(20, 24, 32, 0.12)';
            e.currentTarget.style.backgroundColor = 'rgba(248, 249, 251, 0.98)';
            e.currentTarget.style.color = '#5c6370';
          }}
        >
          <GraduationCap size={16} />
          <span>Scholar</span>
        </a>

        {/* CV Link */}
        <a
          href="https://drive.google.com/file/d/1lfo0vQPSHdNnTJf5lrOIEhLiBfHytdv8/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          title="CV"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '9px 12px',
            backgroundColor: 'rgba(248, 249, 251, 0.98)',
            border: '1px solid #d4d7dd',
            borderRadius: '10px',
            boxShadow: '0 8px 20px rgba(20, 24, 32, 0.12)',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
            color: '#5c6370',
            fontSize: '14px',
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 10px 24px rgba(20, 24, 32, 0.18)';
            e.currentTarget.style.backgroundColor = '#d4d7dd';
            e.currentTarget.style.color = '#2e5c8a';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(20, 24, 32, 0.12)';
            e.currentTarget.style.backgroundColor = 'rgba(248, 249, 251, 0.98)';
            e.currentTarget.style.color = '#5c6370';
          }}
        >
          <FileText size={16} />
          <span>CV</span>
        </a>

        {/* GitHub Link */}
        <a
          href="https://github.com/ElMehdiHaress"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '9px 12px',
            backgroundColor: 'rgba(248, 249, 251, 0.98)',
            border: '1px solid #d4d7dd',
            borderRadius: '10px',
            boxShadow: '0 8px 20px rgba(20, 24, 32, 0.12)',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
            color: '#5c6370',
            fontSize: '14px',
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 10px 24px rgba(20, 24, 32, 0.18)';
            e.currentTarget.style.backgroundColor = '#d4d7dd';
            e.currentTarget.style.color = '#2e5c8a';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(20, 24, 32, 0.12)';
            e.currentTarget.style.backgroundColor = 'rgba(248, 249, 251, 0.98)';
            e.currentTarget.style.color = '#5c6370';
          }}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" 
              fill="currentColor"
            />
          </svg>
          <span>GitHub</span>
        </a>
      </div>

    </div>
  );
};

export default Homepage;