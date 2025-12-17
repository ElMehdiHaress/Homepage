import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';
import mapImage from './assets/map.jpeg';
import profileImage from './assets/recent-me.jpeg';

interface Talk {
  title: string;
  event: string;
  year: string;
  type: string;
  hasFile?: boolean;
  fileUrl?: string;
  city: string;
}

interface City {
  name: string;
  // Approximate geographic positions (normalized to 0-100 for x, y)
  x: number; // longitude-like (west to east)
  y: number; // latitude-like (north to south)
  talks: Talk[];
  conferences: Array<{ event: string; year: string; url: string }>;
}

// City coordinates (normalized positions for European region)
// x: 0 (west) to 100 (east), y: 0 (north) to 100 (south)
const cityCoordinates: Record<string, { x: number; y: number }> = {
  "Rennes": { x: 49, y: 27 },
  "Leeds": { x: 50, y: 2 }, // Further north than Calais
  "Nancy": { x: 59, y: 32 }, // Slightly east to create space
  "Marrakech": { x: 36, y: 98 }, // Morocco - southern part of the map
  "Vienna": { x: 68, y: 40 },
  "Bielefeld": { x: 64, y: 18 }, // More north and east to reduce crowding
  "Paris": { x: 54, y: 35 },
  "Lausanne": { x: 60, y: 40 }, // Slightly east
  "Ile d'Oléron": { x: 45, y: 39 }, // West/south-west of Rennes
  "Luxembourg": { x: 58, y: 25 }, // Above Nancy
  "Eindhoven": { x: 61, y: 10 }, // More north
  "Calais": { x: 53, y: 17 },
  "Marseille": { x: 57, y: 62 } // Further south than Lausanne
};

const talks: Talk[] = [
    {
      title: "Singular and dissipative stochastic differential equations",
      event: "Mesures de Gibbs, Turbulence d'onde et EDP stochastiques, Évry",
      year: "2025",
      type: "Talk",
      hasFile: true,
      fileUrl: "https://drive.google.com/drive/folders/163cXtYFTNoGqRiKSQYpnL68oSywI6IW4?usp=share_link",
      city: "Paris"
    },
    {
      title: "Singular and dissipative stochastic differential equations",
      event: "Séminaire d'analyse numérique (IRMAR), Rennes",
      year: "2025",
      type: "Talk",
      hasFile: true,
      fileUrl: "https://drive.google.com/drive/folders/163cXtYFTNoGqRiKSQYpnL68oSywI6IW4?usp=share_link",
      city: "Rennes"
    },
    {
      title: "Singular and dissipative SDEs",
      event: "Probability Seminar, Leeds",
      year: "2025",
      type: "Talk",
      hasFile: true,
      fileUrl: "https://drive.google.com/drive/folders/163cXtYFTNoGqRiKSQYpnL68oSywI6IW4?usp=share_link",
      city: "Leeds"
    },
    {
      title: "Singular and Dissipative S(P)DEs",
      event: "Les journées PASTA (INRIA), Nancy",
      year: "2025",
      type: "Talk",
      hasFile: true,
      fileUrl: "https://drive.google.com/drive/folders/163cXtYFTNoGqRiKSQYpnL68oSywI6IW4?usp=share_link",
      city: "Nancy"
    },
    {
      title: "Long-time behavior of singular SDEs and SPDEs",
      event: "Moroccan - Swedish Conference on Stochastic Analysis 2025, Marrakech",
      year: "2025",
      type: "Talk",
      hasFile: true,
      fileUrl: "https://drive.google.com/drive/folders/163cXtYFTNoGqRiKSQYpnL68oSywI6IW4?usp=share_link",
      city: "Marrakech"
    },
    {
      title: "Long-time behavior of SPDEs/SDEs",
      event: "Regbynoise2025, Vienna",
      year: "2025",
      type: "Talk",
      hasFile: true,
      fileUrl: "https://drive.google.com/drive/folders/163cXtYFTNoGqRiKSQYpnL68oSywI6IW4?usp=share_link",
      city: "Vienna"
    },
    {
      title: "Long-time behavior of the stochastic heat equation with dissipative and singular drifts",
      event: "Probability Seminar, Leeds",
      year: "2025",
      type: "Talk",
      city: "Leeds"
    },
    {
      title: "Numerical approximations of the stochastic heat equation with distributional drift: towards an invariant measure",
      event: "SPDevent, Bielefeld",
      year: "2024",
      type: "Talk",
      hasFile: true,
      fileUrl: "https://drive.google.com/drive/folders/163cXtYFTNoGqRiKSQYpnL68oSywI6IW4?usp=share_link",
      city: "Bielefeld"
    },
    {
      title: "Numerical approximations of the stochastic heat equation with distributional drift: towards an invariant measure",
      event: "Les probabilités de demain, Paris",
      year: "2024",
      type: "Talk",
      hasFile: true,
      fileUrl: "https://drive.google.com/drive/folders/163cXtYFTNoGqRiKSQYpnL68oSywI6IW4?usp=share_link",
      city: "Paris"
    },
    {
      title: "Numerical approximations of SDEs with distributional drift",
      event: "Stochastic dynamics and stochastic equations, Lausanne",
      year: "2024",
      type: "poster",
      city: "Lausanne"
    },
    {
      title: "Numerical approximations of SDEs and SPDEs with distributional drift",
      event: "Colloque Jeunes Probabilistes et Statisticiens, Ile d'Oléron",
      year: "2023",
      type: "Talk",
      hasFile: true,
      fileUrl: "https://drive.google.com/drive/folders/163cXtYFTNoGqRiKSQYpnL68oSywI6IW4?usp=share_link",
      city: "Ile d'Oléron"
    },
    {
      title: "Tamed-Euler scheme for SDEs and SPDEs with distributional drift",
      event: "GDR TRAjectoires ruGueuses, Paris Dauphine",
      year: "2023",
      type: "Talk",
      city: "Paris"
    },
    {
      title: "Tamed-Euler scheme for SDEs with distributional drift",
      event: "International Conference on Malliavin Calculus and Related Topics, Luxembourg",
      year: "2023",
      type: "poster",
      hasFile: true,
      fileUrl: "https://drive.google.com/drive/folders/163cXtYFTNoGqRiKSQYpnL68oSywI6IW4?usp=share_link",
      city: "Luxembourg"
    },
    {
      title: "Tamed-Euler scheme for SDEs with distributional drift",
      event: "Numerical Analysis of Stochastic Partial Differential Equations, Eindhoven",
      year: "2023",
      type: "poster",
      city: "Eindhoven"
    },
    {
      title: "Numerical approximations of SDEs with distributional drift",
      event: "Congrès Jeunes Chercheurs en Mathématiques et leurs Applications, Calais",
      year: "2022",
      type: "Talk",
      city: "Calais"
    },
    {
      title: "Numerical approximations of SDEs with distributional drift",
      event: "SPDevent, Bielefeld",
      year: "2022",
      type: "Talk",
      city: "Bielefeld"
    },
    {
      title: "Spectral risk-based learning using unbounded losses",
      event: "International Conference on Artificial Intelligence and Statistics, online",
      year: "2022",
      type: "poster",
      city: "Online"
    },
    {
      title: "Estimation of several parameters in discretely-observed Stochastic Differential Equations with additive fractional noise",
      event: "Numerical Analysis of Stochastic Partial Differential Equations, Marseille",
      year: "2021",
      type: "poster",
      city: "Marseille"
    },
    {
      title: "Learning with risk-averse feedback under potentially heavy tails",
      event: "International Conference on Artificial Intelligence and Statistics, online",
      year: "2021",
      type: "poster",
      city: "Online"
    }
];

const attendedConferences = [
    { event: "Mesures de Gibbs, Turbulence d'onde et EDP stochastiques, Évry", year: "2025", url: "https://indico.math.cnrs.fr/event/15230/overview", city: "Paris" },
    { event: "Moroccan - Swedish Conference on Stochastic Analysis 2025, Marrakech", year: "2025", url: "https://moscsa2025.com", city: "Marrakech" },
    { event: "Regbynoise2025, Vienna", year: "2025", url: "https://regbynoise2025.conf.tuwien.ac.at", city: "Vienna" },
    { event: "The SPDevent, Bielefeld", year: "2024", url: "https://www.uni-bielefeld.de/fakultaeten/mathematik/ag/hofmanova/conferences-and-workshops/spdevent-2024/", city: "Bielefeld" },
    { event: "Les probabilités de demain, Paris", year: "2024", url: "https://indico.math.cnrs.fr/event/11805/", city: "Paris" },
    { event: "Stochastic dynamics and stochastic equations, Lausanne", year: "2024", url: "https://bernoulli.epfl.ch/programs/workshop-on-stochastic-dynamics-and-stochastic-equations/", city: "Lausanne" },
    { event: "Colloque Jeunes Probabilistes et Statisticiens, Ile d'Oléron", year: "2023", url: "https://jps-2023.sciencesconf.org", city: "Ile d'Oléron" },
    { event: "The SPDevent, Bielefeld", year: "2023", url: "https://www.uni-bielefeld.de/fakultaeten/mathematik/ag/hofmanova/conferences-and-workshops/spdevent-2023/", city: "Bielefeld" },
    { event: "GDR TRAjectoires ruGueuses, Paris Dauphine", year: "2023", url: "https://trag2022.sciencesconf.org", city: "Paris" },
    { event: "International Conference on Malliavin Calculus and Related Topics, Luxembourg", year: "2023", url: "https://math.uni.lu/icmcrt/", city: "Luxembourg" },
    { event: "Numerical Analysis of Stochastic Partial Differential Equations, Eindhoven", year: "2023", url: "https://www.sciencedz.net/fr/conference/94121-naspde-2023-workshop-numerical-analysis-of-stochastic-partial-differential-equations", city: "Eindhoven" },
    { event: "Congrès Jeunes Chercheurs en Mathématiques et leurs Applications, Calais", year: "2022", url: "https://lmpa.univ-littoral.fr/conferences/jcm2022/CJC-MA-2022.html", city: "Calais" },
    { event: "The SPDevent 2022, Bielefeld", year: "2022", url: "https://www.uni-bielefeld.de/fakultaeten/mathematik/ag/hofmanova/conferences-and-workshops/spdevent-2022-1/", city: "Bielefeld" },
    { event: "GDR TRAjectoires ruGueuses, Nanterre", year: "2022", url: "https://trag2022.sciencesconf.org", city: "Paris" },
    { event: "International Conference on Artificial Intelligence and Statistics, online", year: "2022", url: "https://aistats.org/aistats2022/", city: "Online" },
    { event: "Numerical Analysis of Stochastic Partial Differential Equations, Marseille", year: "2021", url: "https://conferences.cirm-math.fr/2408.html", city: "Marseille" },
    { event: "International Conference on Artificial Intelligence and Statistics, online", year: "2021", url: "https://virtual.aistats.org/Conferences/2021", city: "Online" }
];

const Talks = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Group talks and conferences by city
  const cities = useMemo<City[]>(() => {
    const cityMap = new Map<string, City>();

    // Process talks
    talks.forEach(talk => {
      if (talk.city === "Online") return; // Skip online talks for the map
      
      if (!cityMap.has(talk.city)) {
        const coords = cityCoordinates[talk.city] || { x: 50, y: 50 };
        cityMap.set(talk.city, {
          name: talk.city,
          x: coords.x,
          y: coords.y,
          talks: [],
          conferences: []
        });
      }
      cityMap.get(talk.city)!.talks.push(talk);
    });

    // Process conferences
    attendedConferences.forEach(conf => {
      if (conf.city === "Online") return; // Skip online conferences
      
      if (!cityMap.has(conf.city)) {
        const coords = cityCoordinates[conf.city] || { x: 50, y: 50 };
        cityMap.set(conf.city, {
          name: conf.city,
          x: coords.x,
          y: coords.y,
          talks: [],
          conferences: []
        });
      }
      cityMap.get(conf.city)!.conferences.push({
        event: conf.event,
        year: conf.year,
        url: conf.url
      });
    });

    return Array.from(cityMap.values());
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  // Filter talks and conferences based on selected city and search term
  const filteredTalks = useMemo(() => {
    let filtered = talks;
    
    if (selectedCity) {
      filtered = filtered.filter(talk => talk.city === selectedCity);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(talk =>
        talk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talk.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talk.year.includes(searchTerm) ||
        talk.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talk.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCity, searchTerm]);

  const filteredConferences = useMemo(() => {
    let filtered = attendedConferences;
    
    if (selectedCity) {
      filtered = filtered.filter(conf => conf.city === selectedCity);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(conf =>
        conf.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conf.year.includes(searchTerm) ||
        conf.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCity, searchTerm]);

  // Get all city positions for connecting lines with city names
  const cityPositionsWithNames = cities.map(city => ({ name: city.name, x: city.x, y: city.y }));
  
  // Helper function to check if two cities should be connected
  const shouldConnect = (city1: string, city2: string): boolean => {
    // Paris connected to everything EXCEPT Rennes, Nancy, Vienna, Marrakech
    if (city1 === 'Paris') {
      return city2 !== 'Rennes' && city2 !== 'Nancy' && city2 !== 'Vienna' && city2 !== 'Marrakech';
    }
    if (city2 === 'Paris') {
      return city1 !== 'Rennes' && city1 !== 'Nancy' && city1 !== 'Vienna' && city1 !== 'Marrakech';
    }
    
    // Leeds connected to Rennes, Nancy, Vienna, Paris, and Marrakech
    if (city1 === 'Leeds') {
      return city2 === 'Paris' || city2 === 'Rennes' || city2 === 'Nancy' || city2 === 'Vienna' || city2 === 'Marrakech';
    }
    if (city2 === 'Leeds') {
      return city1 === 'Paris' || city1 === 'Rennes' || city1 === 'Nancy' || city1 === 'Vienna' || city1 === 'Marrakech';
    }
    
    return false;
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
            Talks and Conferences
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
        className="talks-container"
        style={{
          maxWidth: '1400px',
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
              placeholder="Search talks and conferences..."
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
          
          {selectedCity && (
            <button
              onClick={() => setSelectedCity(null)}
              style={{
                padding: '15px 25px',
                fontSize: 'clamp(14px, 2vw, 16px)',
                backgroundColor: '#1f2937',
                color: '#ffffff',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '500'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#374151';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#1f2937';
              }}
            >
              Show All Cities
            </button>
          )}
        </div>

        {/* City Map */}
        <div 
          className="talks-city-map"
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(400px, 60vh, 600px)',
            marginBottom: '60px',
            backgroundImage: `url(${mapImage})`,
            backgroundSize: '35%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: '20px',
            border: '0px solid rgba(0, 0, 0, 0.05)',
            overflow: 'hidden'
          }}
        >
          {/* Connection lines between cities */}
          <svg style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}>
            {cityPositionsWithNames.map((pos1, i) =>
              cityPositionsWithNames.slice(i + 1).map((pos2, j) => {
                if (shouldConnect(pos1.name, pos2.name)) {
                  return (
                    <line
                      key={`${i}-${i + j + 1}`}
                      x1={`${pos1.x}%`}
                      y1={`${pos1.y}%`}
                      x2={`${pos2.x}%`}
                      y2={`${pos2.y}%`}
                      stroke="rgba(96, 165, 250, 0.15)"
                      strokeWidth="1"
                    />
                  );
                }
                return null;
              })
            )}
          </svg>

          {/* City Circles */}
          {cities.map((city) => {
            const isSelected = selectedCity === city.name;
            const totalCount = city.talks.length + city.conferences.length;
            // Size based on city name length and activity - even smaller sizing
            const nameLength = city.name.length;
            // Smaller base calculation for size
            const calculatedSize = 30 + nameLength * 1.5 + totalCount * 0.8;
            
            return (
              <div
                key={city.name}
                onClick={() => setSelectedCity(isSelected ? null : city.name)}
                style={{
                  position: 'absolute',
                  left: `${city.x}%`,
                  top: `${city.y}%`,
                  transform: 'translate(-50%, -50%)',
                  minWidth: `clamp(28px, ${calculatedSize}px, 65px)`,
                  width: 'auto',
                  padding: 'clamp(3px, 0.6vw, 6px) clamp(4px, 1vw, 10px)',
                  minHeight: `clamp(16px, ${calculatedSize * 0.5}px, 35px)`,
                  borderRadius: 'clamp(8px, 1.5vw, 16px)',
                  background: isSelected
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isSelected
                    ? '0 5px 15px rgba(102, 126, 234, 0.4), 0 0 0 2px rgba(102, 126, 234, 0.2)'
                    : '0 2px 10px rgba(96, 165, 250, 0.3)',
                  border: 'clamp(1px, 0.25vw, 2px) solid #ffffff',
                  zIndex: isSelected ? 10 : 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: 'clamp(6px, 1.2vw, 9px)',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  lineHeight: '1.2',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(96, 165, 250, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(96, 165, 250, 0.3)';
                  }
                }}
                title={`${city.name}: ${city.talks.length} talks, ${city.conferences.length} conferences`}
              >
                {city.name}
              </div>
            );
          })}
        </div>

        {/* Selected City Info */}
        {selectedCity && (
          <div style={{
            marginBottom: '50px',
            textAlign: 'center',
            padding: '20px',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '16px',
            border: '2px solid rgba(102, 126, 234, 0.2)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.3rem)',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '10px'
            }}>
              {selectedCity}
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.1rem)',
              color: '#6b7280'
            }}>
              {filteredTalks.length} {filteredTalks.length === 1 ? 'talk' : 'talks'} • {filteredConferences.length} {filteredConferences.length === 1 ? 'conference' : 'conferences'}
            </p>
          </div>
        )}

        {/* Talks and Conferences List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
          gap: 'clamp(20px, 4vw, 40px)',
          alignItems: 'flex-start'
        }}>
          {/* Talks Column */}
          <div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
              fontWeight: 'bold',
              marginBottom: '30px',
              color: '#1f2937',
              textAlign: 'center'
            }}>
              {selectedCity ? `Talks in ${selectedCity}` : 'Selected Talks and Posters'}
            </h2>
            
            {filteredTalks.length > 0 ? (
              filteredTalks.map((talk, index) => (
                <div
                  key={index}
                  className="publication-item"
                  style={{
                    marginBottom: '25px',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '12px',
                    border: '2px solid rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <h3 style={{
                    fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
                    fontWeight: '600',
                    marginBottom: '10px',
                    color: '#1f2937',
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
                    {talk.year} • {talk.city}
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
                {selectedCity 
                  ? `No talks found in ${selectedCity}${searchTerm ? ` matching "${searchTerm}"` : ''}`
                  : `No talks found${searchTerm ? ` matching "${searchTerm}"` : ''}`}
              </div>
            )}
          </div>

          {/* Conferences Column */}
          <div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)',
              fontWeight: 'bold',
              marginBottom: '30px',
              color: '#1f2937',
              textAlign: 'center'
            }}>
              {selectedCity ? `Conferences in ${selectedCity}` : 'Attended Conferences'}
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
                      backgroundColor: 'rgba(255, 255, 255, 0.6)',
                      borderRadius: '12px',
                      border: '2px solid rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                      e.currentTarget.style.transform = 'translateY(0px)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                    }}
                  >
                    <p style={{
                      fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                      color: '#1f2937',
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
                      {conf.year} • {conf.city}
                    </p>
                  </div>
                </a>
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '30px',
                color: '#9ca3af',
                fontSize: 'clamp(13px, 1.8vw, 15px)'
              }}>
                {selectedCity 
                  ? `No conferences found in ${selectedCity}${searchTerm ? ` matching "${searchTerm}"` : ''}`
                  : searchTerm 
                    ? `No conferences found matching "${searchTerm}"`
                    : 'No conferences to display'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Talks;
