import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';

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

const Projects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<SectionKey>('all');
  
  const sections = [
    {
      key: 'academic' as SectionKey,
      title: 'Academic',
      icon: '🎓',
      gradient: 'linear-gradient(135deg, rgba(90, 103, 216, 0.75) 0%, rgba(85, 60, 154, 0.75) 100%)',
      description: 'Management and organizational roles in academia'
    },
    {
      key: 'research' as SectionKey,
      title: 'Research',
      icon: '🔬',
      gradient: 'linear-gradient(135deg, rgba(192, 38, 211, 0.75) 0%, rgba(162, 28, 175, 0.75) 100%)',
      description: 'Research code repositories and computational projects'
    },
    {
      key: 'personal' as SectionKey,
      title: 'Personal',
      icon: '💼',
      gradient: 'linear-gradient(135deg, rgba(37, 99, 235, 0.75) 0%, rgba(30, 64, 175, 0.75) 100%)',
      description: 'Creative and personal development projects'
    }
  ];

  const handleBackToHome = () => {
    navigate('/');
  };

  // Filter projects based on selected section and search term
  const filteredAcademic = useMemo(() => {
    let filtered = researchProjects;
    
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.period.includes(searchTerm) ||
        project.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchTerm]);

  const filteredResearch = useMemo(() => {
    let filtered = gitProjects;
    
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchTerm]);

  const filteredPersonal = useMemo(() => {
    let filtered = personalProjects;
    
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.status && project.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchTerm]);

  // Determine which projects to display
  const getDisplayedProjects = () => {
    if (selectedSection === 'academic') return filteredAcademic;
    if (selectedSection === 'research') return filteredResearch;
    if (selectedSection === 'personal') return filteredPersonal;
    return [...filteredAcademic, ...filteredResearch, ...filteredPersonal];
  };

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
          maxWidth: '1200px',
          margin: '0 auto',
          paddingTop: '80px'
        }}
      >
        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '20px',
          color: '#1f2937'
        }}>
          Projects
        </h1>

        <p style={{
          textAlign: 'center',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: '#6b7280',
          marginBottom: '50px',
          maxWidth: '700px',
          margin: '0 auto 50px auto'
        }}>
          Explore my work across academic, research, and personal projects
        </p>

        {/* Project Sections */}
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
              placeholder="Search projects..."
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
              {getDisplayedProjects().length} {getDisplayedProjects().length === 1 ? 'project' : 'projects'}
            </p>
          </div>
        )}

        {/* Projects List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {/* Academic Projects */}
          {(selectedSection === 'academic' || selectedSection === 'all') && filteredAcademic.map((project, index) => {
            const section = sections.find(s => s.key === 'academic');
            const ProjectWrapper = project.url ? 'a' : 'div';
            const wrapperProps = project.url ? {
              href: project.url,
              target: "_blank",
              rel: "noopener noreferrer",
              style: { textDecoration: 'none', color: 'inherit', display: 'block' }
            } : { style: { display: 'block' } };

            return (
              <ProjectWrapper key={`academic-${index}`} {...wrapperProps}>
                <div
                  className="project-item"
                  style={{
                    padding: '30px',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '16px',
                    border: '2px solid rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
                    if (section) {
                      e.currentTarget.style.borderColor = section.gradient.split(' ')[0] || 'rgba(102, 126, 234, 0.3)';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                  }}
                >
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
                    <h3 style={{
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                      fontWeight: '600',
                      marginBottom: '12px',
                      color: '#1f2937',
                      lineHeight: '1.4'
                    }}>
                      {project.title} {project.url && '🔗'}
                    </h3>
                    {project.institution && (
                      <p style={{
                        fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                        color: '#60a5fa',
                        marginBottom: '10px',
                        fontStyle: 'italic',
                        fontWeight: '500'
                      }}>
                        {project.institution}
                      </p>
                    )}
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
                        {project.period}
                      </p>
                      <span style={{
                        fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                        color: '#34d399',
                        backgroundColor: 'rgba(52, 211, 153, 0.1)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontWeight: '500'
                      }}>
                        {project.type}
                      </span>
                    </div>
                  </div>
                </div>
              </ProjectWrapper>
            );
          })}

          {/* Research Projects */}
          {(selectedSection === 'research' || selectedSection === 'all') && filteredResearch.map((project, index) => {
            const section = sections.find(s => s.key === 'research');
            
            return (
              <a
                key={`research-${index}`}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block'
                }}
              >
                <div
                  className="project-item"
                  style={{
                    padding: '30px',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '16px',
                    border: '2px solid rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
                    if (section) {
                      e.currentTarget.style.borderColor = section.gradient.split(' ')[0] || 'rgba(240, 147, 251, 0.3)';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                  }}
                >
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
                    <h3 style={{
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                      fontWeight: '600',
                      marginBottom: '12px',
                      color: '#1f2937',
                      lineHeight: '1.4'
                    }}>
                      {project.title} 🔗
                      {project.secondUrl && (
                        <a
                          href={project.secondUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            marginLeft: '8px',
                            color: '#34d399',
                            textDecoration: 'none'
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          🔗
                        </a>
                      )}
                    </h3>
                    <p style={{
                      fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                      color: '#9ca3af',
                      marginBottom: '12px',
                      lineHeight: '1.5'
                    }}>
                      {project.description}
                    </p>
                    <span style={{
                      fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                      color: '#8b5cf6',
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontWeight: '500'
                    }}>
                      {project.type}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}

          {/* Personal Projects */}
          {(selectedSection === 'personal' || selectedSection === 'all') && filteredPersonal.map((project, index) => {
            const section = sections.find(s => s.key === 'personal');
            
            return (
              <a
                key={`personal-${index}`}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block'
                }}
              >
                <div
                  className="project-item"
                  style={{
                    padding: '30px',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '16px',
                    border: '2px solid rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
                    if (section) {
                      e.currentTarget.style.borderColor = section.gradient.split(' ')[0] || 'rgba(79, 172, 254, 0.3)';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                  }}
                >
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
                    <h3 style={{
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                      fontWeight: '600',
                      marginBottom: '12px',
                      color: '#1f2937',
                      lineHeight: '1.4'
                    }}>
                      {project.title} 🔗
                    </h3>
                    <p style={{
                      fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                      color: '#9ca3af',
                      marginBottom: '12px',
                      lineHeight: '1.5'
                    }}>
                      {project.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: project.status ? 'space-between' : 'flex-end',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}>
                      {project.status && (
                        <span style={{
                          fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                          color: project.status === 'In Progress' ? '#f59e0b' : '#34d399',
                          backgroundColor: project.status === 'In Progress' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(52, 211, 153, 0.1)',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontWeight: '500'
                        }}>
                          {project.status}
                        </span>
                      )}
                      <span style={{
                        fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                        color: '#60a5fa',
                        backgroundColor: 'rgba(96, 165, 250, 0.1)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontWeight: '500'
                      }}>
                        {project.type}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Empty State */}
        {getDisplayedProjects().length === 0 && (
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
