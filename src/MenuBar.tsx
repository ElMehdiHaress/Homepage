import { useNavigate, useLocation } from 'react-router-dom';

const MenuBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠', path: '/' },
    { id: 'publications', label: 'Publications', icon: '📄', path: '/publications' },
    { id: 'talks', label: 'Talks', icon: '🎤', path: '/talks' },
    { id: 'teaching', label: 'Teaching', icon: '👨‍🏫', path: '/teaching' },
    { id: 'projects', label: 'Projects', icon: '👨‍💻', path: '/projects' },
    { id: 'research-intro', label: 'Research Intro', icon: '📚', path: '/research-intro' }
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#4a4a4a',
      borderRadius: '16px',
      padding: '8px',
      border: '1px solid #666666',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      gap: '4px'
    }}>
      {menuItems.map((item) => (
        <div key={item.id} style={{ position: 'relative' }}>
          <button
            onClick={() => handleMenuClick(item.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: isActive(item.path) ? '#10b981' : 'transparent',
              color: isActive(item.path) ? '#ffffff' : '#ffffff',
              fontSize: '20px',
              fontWeight: '500'
            }}
            onMouseOver={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.backgroundColor = 'rgba(96, 165, 250, 0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.color = '#60a5fa';
              }
            }}
            onMouseOut={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.color = '#6b7280';
              }
            }}
          >
            <span style={{ fontSize: '20px', marginBottom: '2px' }}>{item.icon}</span>
            <span style={{ fontSize: '10px', fontWeight: '600' }}>{item.label}</span>
          </button>
          
          {/* Tooltip */}
          <div style={{
            position: 'absolute',
            bottom: '-35px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
            zIndex: 1001
          }} className="menu-tooltip">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
