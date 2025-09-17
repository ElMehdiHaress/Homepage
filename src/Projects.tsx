import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const researchProjects = [
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

  const personalProjects = [
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
      status: "Completed",
      type: "Web Development",
      url: "https://hanabellaspa.pro"
    }
  ];

  const handleBackToHome = () => {
    navigate('/');
  };

  // Filter research projects based on search term
  const filteredResearchProjects = researchProjects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.period.includes(searchTerm) ||
    project.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter personal projects based on search term
  const filteredPersonalProjects = personalProjects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#000000',
      position: 'relative',
      margin: 0,
      padding: '40px 20px',
      color: 'white'
    }}>
      {/* Back to Home Button */}
      <button
        className="back-button"
        onClick={handleBackToHome}
        style={{
          position: 'fixed',
          top: '30px',
          left: '30px',
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '12px',
          padding: '10px 20px',
          color: 'white',
          fontSize: '14px',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        ← Back to Home
      </button>

      {/* Main Content */}
      <div 
        className="publications-container"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          paddingTop: '80px'
        }}
      >
        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '40px',
          color: 'white'
        }}>
          Projects
        </h1>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '50px'
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
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '25px',
                color: 'white',
                outline: 'none',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.5)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
            />
            {/* Search Icon */}
            <div style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '18px'
            }}>
              🔍
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'flex-start'
        }} className="talks-grid">
          
          {/* Left Column - Research Projects */}
          <div style={{ flex: '1', minWidth: '0' }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
              fontWeight: 'bold',
              marginBottom: '30px',
              color: 'white',
              textAlign: 'center'
            }}>
              Research projects
            </h2>
            
            {filteredResearchProjects.length > 0 ? (
              filteredResearchProjects.map((project, index) => {
                const ProjectWrapper = project.url ? 'a' : 'div';
                const wrapperProps = project.url ? {
                  href: project.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  style: { textDecoration: 'none', color: 'inherit', display: 'block' }
                } : {};

                return (
                  <ProjectWrapper key={index} {...wrapperProps}>
                    <div
                      className="publication-item"
                      style={{
                        marginBottom: '25px',
                        padding: '25px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease',
                        cursor: project.url ? 'pointer' : 'default'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = project.url ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        if (project.url) {
                          e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.3)';
                        }
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.transform = 'translateY(0px)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    >
                <h3 style={{
                  fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#e5e7eb',
                  lineHeight: '1.3'
                }}>
                  {project.title} {project.url && '🔗'}
                </h3>
                {project.institution && (
                  <p style={{
                    fontSize: 'clamp(0.9rem, 1.9vw, 1rem)',
                    color: '#60a5fa',
                    marginBottom: '8px',
                    fontStyle: 'italic'
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
                    fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                    color: '#6b7280',
                    fontWeight: '500',
                    margin: 0
                  }}>
                    {project.period}
                  </p>
                  <span style={{
                    fontSize: 'clamp(0.75rem, 1.4vw, 0.85rem)',
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
                  </ProjectWrapper>
                );
              })
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '30px',
                color: '#9ca3af',
                fontSize: 'clamp(13px, 1.8vw, 15px)'
              }}>
                No research projects found matching "{searchTerm}"
              </div>
            )}
          </div>

          {/* Right Column - Personal Projects */}
          <div style={{ flex: '1', minWidth: '0' }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
              fontWeight: 'bold',
              marginBottom: '30px',
              color: 'white',
              textAlign: 'center'
            }}>
              Personal projects
            </h2>
            
            {filteredPersonalProjects.length > 0 ? (
              filteredPersonalProjects.map((project, index) => {
                const ProjectWrapper = project.url ? 'a' : 'div';
                const wrapperProps = project.url ? {
                  href: project.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  style: { textDecoration: 'none', color: 'inherit', display: 'block' }
                } : {};

                return (
                  <ProjectWrapper key={index} {...wrapperProps}>
                    <div
                      className="publication-item"
                      style={{
                        marginBottom: '25px',
                        padding: '25px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        transition: 'all 0.3s ease',
                        cursor: project.url ? 'pointer' : 'default'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = project.url ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.06)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        if (project.url) {
                          e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.3)';
                        }
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.transform = 'translateY(0px)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      }}
                    >
                <h3 style={{
                  fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
                  fontWeight: '600',
                  marginBottom: '10px',
                  color: '#e5e7eb',
                  lineHeight: '1.3'
                }}>
                  {project.title} {project.url && '🔗'}
                </h3>
                <p style={{
                  fontSize: 'clamp(0.9rem, 1.9vw, 1rem)',
                  color: '#9ca3af',
                  marginBottom: '12px'
                }}>
                  {project.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <span style={{
                    fontSize: 'clamp(0.75rem, 1.4vw, 0.85rem)',
                    color: project.status === 'In Progress' ? '#f59e0b' : '#34d399',
                    backgroundColor: project.status === 'In Progress' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(52, 211, 153, 0.1)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontWeight: '500'
                  }}>
                    {project.status}
                  </span>
                  <span style={{
                    fontSize: 'clamp(0.75rem, 1.4vw, 0.85rem)',
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
                  </ProjectWrapper>
                );
              })
            ) : searchTerm && (
              <div style={{
                textAlign: 'center',
                padding: '30px',
                color: '#9ca3af',
                fontSize: 'clamp(13px, 1.8vw, 15px)'
              }}>
                No personal projects found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
