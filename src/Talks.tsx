import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Talks = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const talks = [
    {
      title: "Long-time behavior of SPDEs/SDEs",
      event: "Regbynoise2025, Vienna",
      year: "2025",
      type: "talk",
      hasFile: true,
      fileUrl: "https://drive.google.com/file/d/1sxM93DfpvFG_YLZVZneRPUYwZNrXu1Ox/view?usp=sharing"
    },
    {
      title: "Long-time behavior of the stochastic heat equation with dissipative and singular drifts",
      event: "Seminar, Leeds",
      year: "2025",
      type: "talk"
    },
    {
      title: "Numerical approximations of the stochastic heat equation with distributional drift: towards an invariant measure",
      event: "SPDevent, Bielefeld",
      year: "2024",
      type: "talk",
      hasFile: true,
      fileUrl: "https://drive.google.com/file/d/1bf2pohk9X_1JlUg-OFz-Jx7rlBk0Q-a5/view"
    },
    {
      title: "Numerical approximations of the stochastic heat equation with distributional drift: towards an invariant measure",
      event: "Les probabilités de demain, Paris",
      year: "2024",
      type: "talk"
    },
    {
      title: "Numerical approximations of SDEs with distributional drift",
      event: "Stochastic dynamics and stochastic equations, Lausanne",
      year: "2024",
      type: "poster"
    },
    {
      title: "Numerical approximations of SDEs and SPDEs with distributional drift",
      event: "Colloque Jeunes Probabilistes et Statisticiens, Ile d'Oléron",
      year: "2023",
      type: "talk",
      hasFile: true,
      fileUrl: "https://drive.google.com/file/d/17LbBinMfZz7_pE6pr_mOUvrjUQJfhJeD/view"
    },
    {
      title: "Tamed-Euler scheme for SDEs and SPDEs with distributional drift",
      event: "GDR TRAjectoires ruGueuses, Paris Dauphine",
      year: "2023",
      type: "talk"
    },
    {
      title: "Tamed-Euler scheme for SDEs with distributional drift",
      event: "International Conference on Malliavin Calculus and Related Topics, Luxembourg",
      year: "2023",
      type: "poster",
      hasFile: true,
      fileUrl: "https://drive.google.com/file/d/1QWDXPHhSo3lT0jt3tWRcjCK3ggf_N_0A/view"
    },
    {
      title: "Tamed-Euler scheme for SDEs with distributional drift",
      event: "Numerical Analysis of Stochastic Partial Differential Equations, Eindhoven",
      year: "2023",
      type: "poster"
    },
    {
      title: "Numerical approximations of SDEs with distributional drift",
      event: "Congrès Jeunes Chercheurs en Mathématiques et leurs Applications, Calais",
      year: "2022",
      type: "talk"
    },
    {
      title: "Numerical approximations of SDEs with distributional drift",
      event: "SPDevent, Bielefeld",
      year: "2022",
      type: "talk"
    },
    {
      title: "Spectral risk-based learning using unbounded losses",
      event: "International Conference on Artificial Intelligence and Statistics, online",
      year: "2022",
      type: "poster"
    },
    {
      title: "Estimation of several parameters in discretely-observed Stochastic Differential Equations with additive fractional noise",
      event: "Numerical Analysis of Stochastic Partial Differential Equations, Marseille",
      year: "2021",
      type: "poster"
    },
    {
      title: "Learning with risk-averse feedback under potentially heavy tails",
      event: "International Conference on Artificial Intelligence and Statistics, online",
      year: "2021",
      type: "poster"
    }
  ];

  const attendedConferences = [
    { event: "Regbynoise2025, Vienna", year: "2025", url: "https://regbynoise2025.conf.tuwien.ac.at" },
    { event: "The SPDevent, Bielefeld", year: "2024", url: "https://www.uni-bielefeld.de/fakultaeten/mathematik/ag/hofmanova/conferences-and-workshops/spdevent-2024/" },
    { event: "Les probabilités de demain, Paris", year: "2024", url: "https://indico.math.cnrs.fr/event/11805/" },
    { event: "Stochastic dynamics and stochastic equations, Lausanne", year: "2024", url: "https://bernoulli.epfl.ch/programs/workshop-on-stochastic-dynamics-and-stochastic-equations/" },
    { event: "Colloque Jeunes Probabilistes et Statisticiens, Ile d'Oléron", year: "2023", url: "https://jps-2023.sciencesconf.org" },
    { event: "The SPDevent, Bielefeld", year: "2023", url: "https://www.uni-bielefeld.de/fakultaeten/mathematik/ag/hofmanova/conferences-and-workshops/spdevent-2023/" },
    { event: "GDR TRAjectoires ruGueuses, Paris Dauphine", year: "2023", url: "https://trag2022.sciencesconf.org" },
    { event: "International Conference on Malliavin Calculus and Related Topics, Luxembourg", year: "2023", url: "https://math.uni.lu/icmcrt/" },
    { event: "Numerical Analysis of Stochastic Partial Differential Equations, Eindhoven", year: "2023", url: "https://www.sciencedz.net/fr/conference/94121-naspde-2023-workshop-numerical-analysis-of-stochastic-partial-differential-equations" },
    { event: "Congrès Jeunes Chercheurs en Mathématiques et leurs Applications, Calais", year: "2022", url: "https://lmpa.univ-littoral.fr/conferences/jcm2022/CJC-MA-2022.html" },
    { event: "The SPDevent 2022, Bielefeld", year: "2022", url: "https://www.uni-bielefeld.de/fakultaeten/mathematik/ag/hofmanova/conferences-and-workshops/spdevent-2022-1/" },
    { event: "GDR TRAjectoires ruGueuses, Nanterre", year: "2022", url: "https://trag2022.sciencesconf.org" },
    { event: "International Conference on Artificial Intelligence and Statistics, online", year: "2022", url: "https://aistats.org/aistats2022/" },
    { event: "Numerical Analysis of Stochastic Partial Differential Equations, Marseille", year: "2021", url: "https://conferences.cirm-math.fr/2408.html" },
    { event: "International Conference on Artificial Intelligence and Statistics, online", year: "2021", url: "https://virtual.aistats.org/Conferences/2021" }
  ];

  const handleBackToHome = () => {
    navigate('/');
  };

  // Filter talks based on search term
  const filteredTalks = talks.filter(talk =>
    talk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    talk.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    talk.year.includes(searchTerm) ||
    talk.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter conferences based on search term
  const filteredConferences = attendedConferences.filter(conf =>
    conf.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conf.year.includes(searchTerm)
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
          Talks and Conferences
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
              placeholder="Search talks and conferences..."
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
          
          {/* Left Column - Selected Talks and Posters */}
          <div style={{ flex: '1', minWidth: '0' }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
              fontWeight: 'bold',
              marginBottom: '30px',
              color: 'white',
              textAlign: 'center'
            }}>
              Selected talks and posters
            </h2>
            
            {filteredTalks.length > 0 ? (
              filteredTalks.map((talk, index) => (
              <div
                key={index}
                className="publication-item"
                style={{
                  marginBottom: '25px',
                  padding: '20px',
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
                  fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
                  fontWeight: '600',
                  marginBottom: '10px',
                  color: '#e5e7eb',
                  lineHeight: '1.3'
                }}>
                  {talk.title}
                </h3>
                <p style={{
                  fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
                  color: talk.type === 'poster' ? '#f59e0b' : '#60a5fa',
                  marginBottom: '6px',
                  fontStyle: 'italic'
                }}>
                  {talk.event} {talk.type === 'poster' && '(poster)'}
                  {talk.hasFile && (
                    talk.fileUrl ? (
                      <>
                        {' '}
                        <a
                          href={talk.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#34d399',
                            textDecoration: 'none',
                            fontSize: '16px',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.2)';
                            e.currentTarget.style.color = '#6ee7b7';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.color = '#34d399';
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          📄
                        </a>
                      </>
                    ) : ' 📄'
                  )}
                </p>
                <p style={{
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  {talk.year}
                </p>
              </div>
            ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '30px',
                color: '#9ca3af',
                fontSize: 'clamp(13px, 1.8vw, 15px)'
              }}>
                No talks found matching "{searchTerm}"
              </div>
            )}
          </div>

          {/* Right Column - Attended Conferences */}
          <div style={{ flex: '1', minWidth: '0' }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
              fontWeight: 'bold',
              marginBottom: '30px',
              color: 'white',
              textAlign: 'center'
            }}>
              Attended conferences
            </h2>
            
            {filteredConferences.length > 0 ? (
              filteredConferences.map((conf, index) => (
              <a
                key={index}
                href={conf.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block'
                }}
              >
                <div
                  className="publication-item"
                  style={{
                    marginBottom: '20px',
                    padding: '18px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  <p style={{
                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                    color: '#e5e7eb',
                    marginBottom: '6px',
                    fontWeight: '500',
                    lineHeight: '1.3'
                  }}>
                    {conf.event} 🔗
                  </p>
                  <p style={{
                    fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    {conf.year}
                  </p>
                </div>
              </a>
            ))
            ) : searchTerm && (
              <div style={{
                textAlign: 'center',
                padding: '30px',
                color: '#9ca3af',
                fontSize: 'clamp(13px, 1.8vw, 15px)'
              }}>
                No conferences found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Talks;
