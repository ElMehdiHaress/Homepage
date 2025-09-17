import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Teaching = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const teachingExperience = [
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

  const handleBackToHome = () => {
    navigate('/');
  };

  // Filter teaching experience based on search term
  const filteredTeaching = teachingExperience.filter(exp =>
    exp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.period.includes(searchTerm) ||
    exp.type.toLowerCase().includes(searchTerm.toLowerCase())
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
          maxWidth: '800px',
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
          Teaching
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
              placeholder="Search teaching experience..."
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

        {/* Teaching Experience Section */}
        <div>
          {filteredTeaching.length > 0 ? (
            filteredTeaching.map((exp, index) => (
            <div
              key={index}
              className="publication-item"
              style={{
                marginBottom: '30px',
                padding: '25px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateY(0px)';
              }}
            >
              <h3 style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#e5e7eb',
                lineHeight: '1.4'
              }}>
                {exp.role}
              </h3>
              <p style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                color: '#60a5fa',
                marginBottom: '8px',
                fontStyle: 'italic'
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
          ))
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#9ca3af',
              fontSize: 'clamp(14px, 2vw, 16px)'
            }}>
              No teaching experience found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teaching;
