import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from './assets/recent-me.jpeg';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  wiggleX: number;
  wiggleY: number;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { id: 'publications', label: 'Publications', icon: '📄' },
  { id: 'talks', label: 'Talks and conferences', icon: '🗣️' },
  { id: 'teachings', label: 'Teachings', icon: '👨‍🏫' },
  { id: 'projects', label: 'Projects', icon: '👨🏻‍💻' }
];

const Homepage = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 400, y: 300 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMenuClick = (itemId: string) => {
    switch (itemId) {
      case 'publications':
        navigate('/publications');
        break;
      case 'talks':
        navigate('/talks');
        break;
      case 'teachings':
        navigate('/teaching');
        break;
      case 'projects':
        navigate('/projects');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Continuous trail effect
  useEffect(() => {
    let animationId: number;
    
    const animateTrail = () => {
      setTrail(prevTrail => {
        let newTrail = [...prevTrail];
        
        // Always add new trail point at current mouse position
        newTrail.push({
          x: mousePos.x,
          y: mousePos.y,
          age: 0,
          wiggleX: (Math.random() - 0.5) * 2,
          wiggleY: (Math.random() - 0.5) * 2
        });
        
        // Update existing trail points with giggly movement and aging
        newTrail = newTrail.map(point => ({
          ...point,
          age: point.age + 1,
          wiggleX: point.wiggleX + (Math.random() - 0.5) * 0.3,
          wiggleY: point.wiggleY + (Math.random() - 0.5) * 0.3
        })).filter(point => point.age < 30); // Shorter trail for smoother effect
        
        return newTrail;
      });
      
      animationId = requestAnimationFrame(animateTrail);
    };
    
    animateTrail();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [mousePos]);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#ffffff',
      position: 'relative',
      margin: 0,
      padding: 0,
      cursor: 'default'
    }}>
      {/* Profile Section - Center with Image and Text */}
      <div 
        className="profile-section"
        style={{
          position: 'fixed',
          left: '45%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(20px, 5vw, 40px)',
          maxWidth: '900px',
          padding: '0 20px'
        }}
      >
        {/* Profile Image */}
        <img 
          src={profileImage} 
          alt="Profile" 
          style={{
            width: 'clamp(120px, 15vw, 160px)',
            height: 'clamp(120px, 15vw, 160px)',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid white',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            flexShrink: 0
          }}
        />

        {/* Bio Text */}
        <div style={{ 
          color: '#1f2937', 
          fontSize: 'clamp(14px, 2.5vw, 18px)', 
          lineHeight: '1.8',
          minWidth: 0 // Allow text to shrink
        }}>
          <p style={{ marginBottom: 'clamp(16px, 3vw, 24px)', fontSize: 'clamp(16px, 3vw, 20px)' }}>
            I am a Research fellow in Stochastic Analysis at University of Leeds
            <br />
             supervised by{' '}
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
          
          <p style={{ marginBottom: 'clamp(16px, 3vw, 24px)' }}>
            PhD at Paris-Saclay University: supervised by{' '}
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
          
          <p style={{ marginBottom: 'clamp(16px, 3vw, 24px)', fontSize: 'clamp(14px, 2.2vw, 16px)', color: '#1f2937' }}>
            <strong>Research interests:</strong> fractional Brownian motion, SDEs and SPDEs with distributional drift, long-time regularity of SDEs, parametric estimation for SDEs, spectral-risk gradient descents
          </p>
          
          <p style={{ marginBottom: '0', fontSize: 'clamp(14px, 2.2vw, 16px)' }}>
            <strong>Contact:</strong>{' '}
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
          gap: '20px'
        }}
      >
        {/* Google Scholar Link */}
        <a
          href="https://scholar.google.com/citations?user=D13FK0EAAAAJ&hl=fr&oi=ao"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
          }}
        >
          {/* Google Scholar Icon (using emoji as fallback) */}
          <span style={{ fontSize: '24px' }}>🎓</span>
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
            width: '50px',
            height: '50px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
          }}
        >
          {/* GitHub Icon */}
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" 
              fill="#333"
            />
          </svg>
        </a>
      </div>

      
      {/* Continuous light trail */}
      {trail.map((point, index) => {
        const progress = point.age / 30; // 0 to 1 as it ages
        const opacity = Math.max(0, (1 - progress) * 0.6); // Fade from 0.6 to 0
        const size = Math.max(15, 60 - point.age * 1.5); // Shrink from 60px to 15px
        const wiggleAmount = Math.min(point.age * 0.15, 4); // Gentle wiggle increase
        
        return (
          <div
            key={`${point.x}-${point.y}-${index}`}
            style={{
              position: 'absolute',
              left: point.x - size/2 + point.wiggleX * wiggleAmount,
              top: point.y - size/2 + point.wiggleY * wiggleAmount,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(100,100,100,${opacity * 0.6}) 0%, rgba(120,120,120,${opacity * 0.4}) 40%, rgba(140,140,140,${opacity * 0.2}) 70%, transparent 100%)`,
              pointerEvents: 'none',
              zIndex: 10 + (30 - point.age), // Newer points on top
              filter: `blur(${progress * 1}px)` // Slight blur as it ages
            }}
          />
        );
      })}
      
      {/* Dock Menu Bar */}
      <div 
        className="dock-menu"
        style={{
          position: 'fixed',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '12px 20px',
          backgroundColor: '#f8fafc',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          zIndex: 1000
        }}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {menuItems.map((item) => {
          const isHovered = hoveredItem === item.id;
          const scale = isHovered ? 1.3 : 1; // Scale to 1.3 when hovered, 1 when not
          const translateY = isHovered ? 10 : 0; // Move down 10px when hovered
          
          return (
            <div
              key={item.id}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuClick(item.id)}
            >
              {/* Hover Label */}
              {hoveredItem === item.id && (
                <div
                  style={{
                    position: 'absolute',
                    top: '80px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    whiteSpace: 'nowrap',
                    zIndex: 1001,
                    animation: 'fadeIn 0.2s ease-out'
                  }}
                >
                  {item.label}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderBottom: '6px solid rgba(0, 0, 0, 0.8)'
                    }}
                  />
                </div>
              )}
              
              {/* Menu Icon */}
              <div
                className="dock-item"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  backgroundColor: '#4a4a4a',
                  border: '1px solid #666666',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  transform: `scale(${scale}) translateY(${translateY}px)`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}
              >
                {item.icon}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;