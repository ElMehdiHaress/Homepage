import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Publications = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const publications = [
    {
      title: "Estimation of several parameters in discretely-observed Stochastic Differential Equations with additive fractional noise",
      journal: "Statistical Inference for Stochastic Processes",
      authors: "joint work with Alexandre Richard",
      year: "2025"
    },
    {
      title: "Long time Hurst regularity of fractional SDEs and their ergodic means",
      journal: "Journal of Theoretical Probability",
      authors: "joint work with Alexandre Richard",
      year: "2025"
    },
    {
      title: "Numerical approximation of stochastic differential equations with distributional drift",
      journal: "Stochastic Processes and Applications",
      authors: "joint work with Ludovic Goudenège and Alexandre Richard",
      year: "2025"
    },
    {
      title: "Spectral risk-based learning using unbounded losses",
      journal: "International Conference on Artificial Intelligence and Statistics, 1871-1886",
      authors: "joint work with Matthew Holland",
      year: "2022"
    },
    {
      title: "Estimation of all parameters in the fractional Ornstein–Uhlenbeck model under discrete observations",
      journal: "Statistical Inference for Stochastic Processes 24, 327-351",
      authors: "joint work with Yaozhong Hu",
      year: "2021"
    },
    {
      title: "Learning with risk-averse feedback under potentially heavy tails",
      journal: "International Conference on Artificial Intelligence and Statistics, 892-900",
      authors: "joint work with Matthew Holland",
      year: "2021"
    }
  ];

  const preprints = [
    {
      title: "Numerical approximation of the stochastic heat equation with a distributional reaction term",
      journal: "arXiv:2405.08201 (Submitted)",
      authors: "joint work with Ludovic Goudenège and Alexandre Richard",
      year: "2024"
    }
  ];

  const handleBackToHome = () => {
    navigate('/');
  };

  // Filter publications based on search term
  const filteredPublications = publications.filter(pub =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.year.includes(searchTerm)
  );

  // Filter preprints based on search term
  const filteredPreprints = preprints.filter(preprint =>
    preprint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    preprint.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    preprint.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    preprint.year.includes(searchTerm)
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
          Publications
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
              placeholder="Search publications..."
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

        {/* Publications Section */}
        <div style={{ marginBottom: '60px' }}>
          {filteredPublications.length > 0 ? (
            filteredPublications.map((pub, index) => (
            <div
              key={index}
              className="publication-item"
              style={{
                marginBottom: '40px',
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
                {pub.title}
              </h3>
              <p style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                color: '#60a5fa',
                marginBottom: '8px',
                fontStyle: 'italic'
              }}>
                {pub.journal}
              </p>
              <p style={{
                fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
                color: '#9ca3af',
                marginBottom: '4px'
              }}>
                {pub.authors}
              </p>
              <p style={{
                fontSize: 'clamp(0.85rem, 1.6vw, 0.95rem)',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                {pub.year}
              </p>
            </div>
          ))
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#9ca3af',
              fontSize: 'clamp(14px, 2vw, 16px)'
            }}>
              No publications found matching "{searchTerm}"
            </div>
          )}
        </div>

        {/* Preprints Section */}
        <div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 'bold',
            marginBottom: '40px',
            color: 'white'
          }}>
            Preprints
          </h2>
          
          {filteredPreprints.length > 0 ? (
            filteredPreprints.map((preprint, index) => (
            <div
              key={index}
              className="publication-item"
              style={{
                marginBottom: '40px',
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
                {preprint.title}
              </h3>
              <p style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                color: '#fbbf24',
                marginBottom: '8px',
                fontStyle: 'italic'
              }}>
                {preprint.journal}
              </p>
              <p style={{
                fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
                color: '#9ca3af',
                marginBottom: '4px'
              }}>
                {preprint.authors}
              </p>
              <p style={{
                fontSize: 'clamp(0.85rem, 1.6vw, 0.95rem)',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                {preprint.year}
              </p>
            </div>
          ))
          ) : searchTerm && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#9ca3af',
              fontSize: 'clamp(14px, 2vw, 16px)'
            }}>
              No preprints found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Publications;
