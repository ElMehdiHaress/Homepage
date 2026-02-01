import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';
import profileImage from './assets/recent-me.jpeg';

type SectionKey = 'singular' | 'numerical' | 'inference' | 'all';

interface Publication {
  title: string;
  journal: string;
  authors: string;
  year: string;
  section: SectionKey;
  isPreprint?: boolean;
  url?: string;
}

const Publications = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<SectionKey>('all');
  
  const allPublications: Publication[] = [
    // Section 1: Singular and Dissipative Stochastic Dynamics
    {
      title: "Uniform pathwise stability of singular additive SDEs driven by fractional Brownian motion",
      journal: "arXiv:2511.05262",
      authors: "joint work with Konstantinos Dareiotis and Khoa Lê",
      year: "2025",
      section: 'singular',
      isPreprint: true,
      url: "https://arxiv.org/pdf/2511.05262"
    },
    {
      title: "Numerical approximation and long-time behaviour of some singular stochastic (partial) differential equations (Chapter 6)",
      journal: "HAL thèses",
      authors: "PhD Thesis",
      year: "2024",
      section: 'singular',
      isPreprint: false,
      url: "https://theses.hal.science/tel-05056625/"
    },
    // Section 2: Numerical Approximation Techniques
    {
      title: "Numerical approximation of the stochastic heat equation with a distributional reaction term",
      journal: "arXiv:2405.08201 (Submitted)",
      authors: "joint work with Ludovic Goudenège and Alexandre Richard",
      year: "2024",
      section: 'numerical',
      isPreprint: true,
      url: "https://arxiv.org/pdf/2405.08201"
    },
    {
      title: "Numerical approximation of stochastic differential equations with distributional drift",
      journal: "Stochastic Processes and Applications",
      authors: "joint work with Ludovic Goudenège and Alexandre Richard",
      year: "2025",
      section: 'numerical',
      isPreprint: false,
      url: "https://www.sciencedirect.com/science/article/abs/pii/S0304414924002412"
    },
    // Section 3: Robust Inference and Learning
    {
      title: "Estimation of several parameters in discretely-observed Stochastic Differential Equations with additive fractional noise",
      journal: "Statistical Inference for Stochastic Processes",
      authors: "joint work with Alexandre Richard",
      year: "2025",
      section: 'inference',
      isPreprint: false,
      url: "https://link.springer.com/article/10.1007/s11203-024-09320-7"
    },
    {
      title: "Long time Hurst regularity of fractional SDEs and their ergodic means",
      journal: "Journal of Theoretical Probability",
      authors: "joint work with Alexandre Richard",
      year: "2025",
      section: 'inference',
      isPreprint: false,
      url: "https://link.springer.com/article/10.1007/s10959-024-01389-3"
    },
    {
      title: "Spectral risk-based learning using unbounded losses",
      journal: "International Conference on Artificial Intelligence and Statistics, 1871-1886",
      authors: "joint work with Matthew Holland",
      year: "2022",
      section: 'inference',
      isPreprint: false,
      url: "https://proceedings.mlr.press/v151/holland22a/holland22a.pdf"
    },
    {
      title: "Estimation of all parameters in the fractional Ornstein–Uhlenbeck model under discrete observations",
      journal: "Statistical Inference for Stochastic Processes 24, 327-351",
      authors: "joint work with Yaozhong Hu",
      year: "2021",
      section: 'inference',
      isPreprint: false,
      url: "https://link.springer.com/article/10.1007/s11203-020-09235-z"
    },
    {
      title: "Learning with risk-averse feedback under potentially heavy tails",
      journal: "International Conference on Artificial Intelligence and Statistics, 892-900",
      authors: "joint work with Matthew Holland",
      year: "2021",
      section: 'inference',
      isPreprint: false,
      url: "https://proceedings.mlr.press/v130/holland21b/holland21b.pdf"
    }
  ];

  const sections = [
    {
      key: 'singular' as SectionKey,
      title: 'Singular and Dissipative Stochastic Dynamics',
      icon: '⚡',
      gradient: 'linear-gradient(135deg, rgba(90, 103, 216, 0.75) 0%, rgba(85, 60, 154, 0.75) 100%)',
      description: 'A unified framework for understanding the long-time behaviour of singular and dissipative stochastic (partial) differential equations'
    },
    {
      key: 'numerical' as SectionKey,
      title: 'Numerical Approximation Techniques for Singular Stochastic Dynamics',
      icon: '🔬',
      gradient: 'linear-gradient(135deg, rgba(192, 38, 211, 0.75) 0%, rgba(162, 28, 175, 0.75) 100%)',
      description: 'Computational methods for solving singular stochastic (partial) differential equations'
    },
    {
      key: 'inference' as SectionKey,
      title: 'Robust Inference and Learning in Dissipative Stochastic Systems',
      icon: '🧠',
      gradient: 'linear-gradient(135deg, rgba(37, 99, 235, 0.75) 0%, rgba(30, 64, 175, 0.75) 100%)',
      description: 'Parameter estimation and learning algorithms for stochastic processes'
    }
  ];

  const handleBackToHome = () => {
    navigate('/');
  };

  // Filter publications based on search term and selected section
  const filteredPublications = allPublications.filter(pub => {
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.year.includes(searchTerm);
    
    const matchesSection = selectedSection === 'all' || pub.section === selectedSection;
    
    return matchesSearch && matchesSection;
  });

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      position: 'relative',
      margin: 0,
      padding: '40px 20px',
      color: '#1f2937'
    }}>
      {/* Persistent Menu Bar */}
      <MenuBar />
      
      {/* Banner Section */}
      <div 
        className="page-banner"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#1e3a8a',
          borderTop: '2px solid #3b82f6',
          borderBottom: '2px solid #3b82f6',
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
            border: '3px solid #ffffff',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
        />
        
        {/* Title in the middle - absolutely centered */}
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
            Publications
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
        className="publications-container"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingTop: '40px'
        }}
      >

        <p style={{
          textAlign: 'center',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: '#6b7280',
          marginBottom: '40px',
          maxWidth: '700px',
          margin: '0 auto 40px auto'
        }}>
          My research is organised around the three following topics.
        </p>

        {/* Research Sections */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          {sections.map((section) => {
            const isSelected = selectedSection === section.key;
            
            return (
              <div
                key={section.key}
                onClick={() => setSelectedSection(section.key)}
                style={{
                  background: section.gradient,
                  borderRadius: '20px',
                  padding: '35px',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isSelected ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
                  boxShadow: isSelected 
                    ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 4px rgba(255, 255, 255, 0.3)' 
                    : '0 10px 30px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.01)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.12)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                  }
                }}
              >
                {/* Decorative background pattern */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                  opacity: 0.3,
                  pointerEvents: 'none'
                }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '15px',
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))'
                  }}>
                    {section.icon}
                  </div>
                  
                  <h2 style={{
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                    color: '#ffffff',
                    lineHeight: '1.3',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}>
                    {section.title}
                  </h2>
                  
                  <p style={{
                    fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: '1.5'
                  }}>
                    {section.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px',
          gap: '15px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '500px'
          }}>
            <input
              type="text"
              placeholder="Search publications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '15px 20px',
                paddingLeft: '50px',
                fontSize: 'clamp(14px, 2vw, 16px)',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '25px',
                color: '#1f2937',
                outline: 'none',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.5)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
              }}
            />
            <div style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(0, 0, 0, 0.6)',
              fontSize: '18px'
            }}>
              🔍
            </div>
          </div>
          
          {/* Show All Button */}
          <button
            onClick={() => setSelectedSection('all')}
            style={{
              padding: '15px 25px',
              fontSize: 'clamp(14px, 2vw, 16px)',
              backgroundColor: selectedSection === 'all' ? '#1f2937' : 'rgba(0, 0, 0, 0.05)',
              color: selectedSection === 'all' ? '#ffffff' : '#1f2937',
              border: selectedSection === 'all' ? 'none' : '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '500'
            }}
            onMouseOver={(e) => {
              if (selectedSection !== 'all') {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseOut={(e) => {
              if (selectedSection !== 'all') {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
              }
            }}
          >
            Show All
          </button>
        </div>

        {/* Section Title (when a specific section is selected) */}
        {selectedSection !== 'all' && (
          <div style={{
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.3rem)',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '10px'
            }}>
              {sections.find(s => s.key === selectedSection)?.title}
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.1rem)',
              color: '#6b7280'
            }}>
              {filteredPublications.length} {filteredPublications.length === 1 ? 'publication' : 'publications'}
            </p>
          </div>
        )}

        {/* Publications List */}
        <div>
          {filteredPublications.length > 0 ? (
            filteredPublications.map((pub, index) => {
              const section = sections.find(s => s.key === pub.section);
              const PublicationWrapper = pub.url ? 'a' : 'div';
              const wrapperProps = pub.url ? {
                href: pub.url,
                target: "_blank",
                rel: "noopener noreferrer",
                style: { textDecoration: 'none', color: 'inherit', display: 'block' }
              } : { style: { display: 'block' } };
              
              return (
                <PublicationWrapper key={index} {...wrapperProps}>
                  <div
                    className="publication-item"
                    style={{
                      marginBottom: '30px',
                      padding: '30px',
                      backgroundColor: 'rgba(255, 255, 255, 0.6)',
                      borderRadius: '16px',
                      border: '2px solid rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: pub.url ? 'pointer' : 'default'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
                      if (pub.url) {
                        e.currentTarget.style.borderColor = section?.gradient.split(' ')[0] || 'rgba(96, 165, 250, 0.3)';
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                    }}
                  >
                  {/* Section indicator bar */}
                  {section && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '5px',
                      background: section.gradient,
                      borderRadius: '16px 0 0 16px'
                    }} />
                  )}
                  
                  <div style={{ marginLeft: '15px' }}>
                    {/* Preprint badge */}
                    {pub.isPreprint && (
                      <div style={{
                        display: 'inline-block',
                        backgroundColor: '#fbbf24',
                        color: '#1f2937',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        marginBottom: '12px'
                      }}>
                        Preprint
                      </div>
                    )}
                    
                    <h3 style={{
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                      fontWeight: '600',
                      marginBottom: '12px',
                      color: '#1f2937',
                      lineHeight: '1.4',
                      paddingRight: '10px'
                    }}>
                      {pub.title} {pub.url && '🔗'}
                    </h3>
                    
                    <p style={{
                      fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                      color: pub.isPreprint ? '#f59e0b' : '#60a5fa',
                      marginBottom: '10px',
                      fontStyle: 'italic',
                      fontWeight: '500'
                    }}>
                      {pub.journal}
                    </p>
                    
                    <p style={{
                      fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
                      color: '#6b7280',
                      marginBottom: '6px'
                    }}>
                      {pub.authors}
                    </p>
                    
                    <p style={{
                      fontSize: 'clamp(0.85rem, 1.6vw, 0.95rem)',
                      color: '#9ca3af',
                      fontWeight: '600'
                    }}>
                      {pub.year}
                    </p>
                  </div>
                </div>
                </PublicationWrapper>
              );
            })
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 40px',
              color: '#9ca3af',
              fontSize: 'clamp(16px, 2.5vw, 18px)'
            }}>
              {searchTerm 
                ? `No publications found matching "${searchTerm}"`
                : 'No publications in this section'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Publications;
