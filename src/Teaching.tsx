import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';
import profileImage from './assets/recent-me.jpeg';

interface TeachingExperience {
  role: string;
  institution: string;
  period: string;
  type: string;
}

type InstitutionKey = 'leeds' | 'chaptal' | 'centralesupelec' | 'all';

const teachingExperience: TeachingExperience[] = [
  {
    role: "Stochastic Processes workshop group",
    institution: "University of Leeds",
    period: "2025-2026",
    type: "Workshop"
  },
  {
    role: "Oral examiner for preparatory class",
    institution: "Lycée Chaptal",
    period: "2022-2024",
    type: "Examiner"
  },
  {
    role: "Teaching assistant. Convergence, Integration and Probability",
    institution: "CentraleSupélec",
    period: "2022-2024",
    type: "Teaching Assistant"
  },
  {
    role: "Teaching assistant. Stochastic finance and risk modeling",
    institution: "CentraleSupélec",
    period: "2022-2023",
    type: "Teaching Assistant"
  },
  {
    role: "Teaching assistant. Partial differential equations",
    institution: "CentraleSupélec",
    period: "2021-2024",
    type: "Teaching Assistant"
  },
  {
    role: "Tutoring. First year math students",
    institution: "CentraleSupélec",
    period: "2017-2023",
    type: "Tutor"
  }
];

const Teaching = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState<InstitutionKey>('all');
  
  const institutions = [
    {
      key: 'leeds' as InstitutionKey,
      name: 'University of Leeds',
      icon: '🎓',
      gradient: 'linear-gradient(135deg, rgba(90, 103, 216, 0.75) 0%, rgba(85, 60, 154, 0.75) 100%)',
      description: 'Advanced workshops and seminars in stochastic processes'
    },
    {
      key: 'chaptal' as InstitutionKey,
      name: 'Lycée Chaptal',
      icon: '📚',
      gradient: 'linear-gradient(135deg, rgba(192, 38, 211, 0.75) 0%, rgba(162, 28, 175, 0.75) 100%)',
      description: 'Examination and assessment in preparatory classes'
    },
    {
      key: 'centralesupelec' as InstitutionKey,
      name: 'CentraleSupélec',
      icon: '🔬',
      gradient: 'linear-gradient(135deg, rgba(37, 99, 235, 0.75) 0%, rgba(30, 64, 175, 0.75) 100%)',
      description: 'Teaching assistant roles and tutoring across mathematics'
    }
  ];

  const handleBackToHome = () => {
    navigate('/');
  };

  // Map institution names to keys
  const getInstitutionKey = (institution: string): InstitutionKey => {
    if (institution.includes('Leeds')) return 'leeds';
    if (institution.includes('Chaptal')) return 'chaptal';
    if (institution.includes('CentraleSupélec')) return 'centralesupelec';
    return 'all';
  };

  // Filter teaching experience based on selected institution and search term
  const filteredTeaching = useMemo(() => {
    let filtered = teachingExperience;
    
    if (selectedInstitution !== 'all') {
      filtered = filtered.filter(exp => getInstitutionKey(exp.institution) === selectedInstitution);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(exp =>
        exp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.period.includes(searchTerm) ||
        exp.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedInstitution, searchTerm]);

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
            Teaching
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
        className="teaching-container"
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
          marginBottom: '50px',
          maxWidth: '700px',
          margin: '0 auto 50px auto'
        }}>
        </p>

        {/* Institution Sections */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          {institutions.map((institution) => {
            const isSelected = selectedInstitution === institution.key;
            
            return (
              <div
                key={institution.key}
                onClick={() => setSelectedInstitution(institution.key)}
                style={{
                  background: institution.gradient,
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
                    {institution.icon}
                  </div>
                  
                  <h2 style={{
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                    color: '#ffffff',
                    lineHeight: '1.3',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}>
                    {institution.name}
                  </h2>
                  
                  <p style={{
                    fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: '1.5'
                  }}>
                    {institution.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search Bar and Clear Selection */}
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
              placeholder="Search teaching experience..."
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
            onClick={() => setSelectedInstitution('all')}
            style={{
              padding: '15px 25px',
              fontSize: 'clamp(14px, 2vw, 16px)',
              backgroundColor: selectedInstitution === 'all' ? '#1f2937' : 'rgba(0, 0, 0, 0.05)',
              color: selectedInstitution === 'all' ? '#ffffff' : '#1f2937',
              border: selectedInstitution === 'all' ? 'none' : '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '500'
            }}
            onMouseOver={(e) => {
              if (selectedInstitution !== 'all') {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseOut={(e) => {
              if (selectedInstitution !== 'all') {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
              }
            }}
          >
            Show All
          </button>
        </div>

        {/* Selected Institution Title */}
        {selectedInstitution !== 'all' && (
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
              {institutions.find(i => i.key === selectedInstitution)?.name}
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.1rem)',
              color: '#6b7280'
            }}>
              {filteredTeaching.length} {filteredTeaching.length === 1 ? 'position' : 'positions'}
            </p>
          </div>
        )}

        {/* Teaching Experience Section */}
        <div>
          {filteredTeaching.length > 0 ? (
            filteredTeaching.map((exp, index) => {
              const institution = institutions.find(i => getInstitutionKey(exp.institution) === i.key);
              
              return (
                <div
                  key={index}
                  className="publication-item"
                  style={{
                    marginBottom: '30px',
                    padding: '30px',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '16px',
                    border: '2px solid rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
                    if (institution) {
                      e.currentTarget.style.borderColor = institution.gradient.split(' ')[0] || 'rgba(96, 165, 250, 0.3)';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                  }}
                >
                  {/* Institution indicator bar */}
                  {institution && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '5px',
                      background: institution.gradient,
                      borderRadius: '16px 0 0 16px'
                    }} />
                  )}
                  
                  <div style={{ marginLeft: '15px' }}>
                    <h3 style={{
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                      fontWeight: '600',
                      marginBottom: '12px',
                      color: '#1f2937',
                      lineHeight: '1.4',
                      paddingRight: '10px'
                    }}>
                      {exp.role}
                    </h3>
                    
                    <p style={{
                      fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                      color: '#60a5fa',
                      marginBottom: '10px',
                      fontStyle: 'italic',
                      fontWeight: '500'
                    }}>
                      {exp.institution}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}>
                      <p style={{
                        fontSize: 'clamp(0.85rem, 1.6vw, 0.95rem)',
                        color: '#6b7280',
                        fontWeight: '500',
                        margin: 0
                      }}>
                        {exp.period}
                      </p>
                      <span style={{
                        fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                        color: '#34d399',
                        backgroundColor: 'rgba(52, 211, 153, 0.1)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontWeight: '500'
                      }}>
                        {exp.type}
                      </span>
                    </div>
                  </div>
                </div>
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
                ? `No teaching experience found matching "${searchTerm}"`
                : 'No teaching experience in this institution'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teaching;
