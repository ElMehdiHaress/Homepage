import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';
import profileImage from './assets/recent-me.jpeg';
import brownianSlateSeed5 from './assets/brownian-slate-seed5.png';

// Cinematic photography gallery: pull in every new shot (P11*, 0607*, IMG_*, PXL*)
const photoModules = import.meta.glob('./assets/*.jpg', { eager: true, import: 'default' });
const photos: string[] = Object.entries(photoModules)
  .filter(([path]) => /\/(P11|0607|IMG_|PXL)[^/]*\.jpg$/.test(path))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src as string);

const Photography = () => {
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const showNext = () =>
    setLightboxIndex((i) => (i === null ? i : (i + 1) % photos.length));
  const showPrev = () =>
    setLightboxIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#f8f9fb',
      backgroundImage: `linear-gradient(rgba(248, 249, 251, 0.88), rgba(248, 249, 251, 0.88)), url(${brownianSlateSeed5})`,
      backgroundSize: '1200px auto',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      position: 'relative',
      margin: 0,
      padding: '40px 20px',
      color: '#141820'
    }}>
      {/* Persistent Menu Bar */}
      <MenuBar />

      {/* Banner Section */}
      <div
        className="page-banner"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#2e5c8a',
          borderTop: '2px solid #3880b9',
          borderBottom: '2px solid #3880b9',
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(20px, 3vw, 40px) clamp(20px, 5vw, 80px)',
          paddingTop: 'clamp(30px, 4vw, 50px)',
          zIndex: 99,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
        }}
      >
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
            Photography
          </h1>
        </div>
      </div>

      {/* Back to Projects Button */}
      <button
        className="back-button"
        onClick={() => navigate('/projects')}
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
        ← Back to Projects
      </button>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '40px' }}>
        {/* Cinematic Photography Gallery */}
        <div
          className="photo-cinema"
          style={{
            background: 'linear-gradient(180deg, #141820 0%, #1b2330 55%, #141820 100%)',
            borderRadius: '24px',
            padding: 'clamp(28px, 5vw, 64px) clamp(20px, 4vw, 56px)',
            boxShadow: '0 24px 60px rgba(20, 24, 32, 0.35)',
            border: '1px solid rgba(92, 99, 112, 0.35)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Letterbox accent bars */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, transparent, #3880b9, transparent)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, transparent, #3880b9, transparent)' }} />

          <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 4vw, 48px)' }}>
            <span style={{
              display: 'inline-block',
              fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#3880b9',
              marginBottom: '14px',
              fontWeight: 600
            }}>
              Personal Project
            </span>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 'bold',
              color: '#f8f9fb',
              margin: '0 0 14px 0',
              letterSpacing: '0.02em'
            }}>
              Photography
            </h2>
            <p style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: '#d4d7dd',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              A roll of frames from the field, long exposures, light, and quiet moments.
            </p>
          </div>

          <div style={{ columnWidth: '260px', columnGap: '16px' }}>
            {photos.map((photo, i) => (
              <div
                key={photo}
                className="cinema-frame"
                onClick={() => setLightboxIndex(i)}
                style={{
                  breakInside: 'avoid',
                  marginBottom: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 22px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(92, 99, 112, 0.3)'
                }}
              >
                <img
                  src={photo}
                  alt={`Photograph ${i + 1}`}
                  loading="lazy"
                  style={{ width: '100%', display: 'block' }}
                />
                <span className="cinema-frame-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cinematic Lightbox */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(16px, 4vw, 48px)'
          }}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            aria-label="Close"
            style={{
              position: 'fixed',
              top: '24px',
              right: '28px',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              border: '1px solid rgba(212, 215, 221, 0.3)',
              backgroundColor: 'rgba(248, 249, 251, 0.08)',
              color: '#f8f9fb',
              fontSize: '22px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(56, 128, 185, 0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(248, 249, 251, 0.08)'; }}
          >
            ✕
          </button>

          {/* Previous */}
          <button
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            aria-label="Previous"
            style={{
              position: 'fixed',
              left: 'clamp(12px, 3vw, 36px)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              border: '1px solid rgba(212, 215, 221, 0.3)',
              backgroundColor: 'rgba(248, 249, 251, 0.08)',
              color: '#f8f9fb',
              fontSize: '28px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(56, 128, 185, 0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(248, 249, 251, 0.08)'; }}
          >
            ‹
          </button>

          <img
            src={photos[lightboxIndex]}
            alt={`Photograph ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '88vw',
              maxHeight: '84vh',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6)'
            }}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            aria-label="Next"
            style={{
              position: 'fixed',
              right: 'clamp(12px, 3vw, 36px)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              border: '1px solid rgba(212, 215, 221, 0.3)',
              backgroundColor: 'rgba(248, 249, 251, 0.08)',
              color: '#f8f9fb',
              fontSize: '28px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(56, 128, 185, 0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(248, 249, 251, 0.08)'; }}
          >
            ›
          </button>

          {/* Counter */}
          <div style={{
            position: 'fixed',
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#d4d7dd',
            fontSize: '14px',
            letterSpacing: '0.2em',
            fontFamily: 'Consolas, "Courier New", monospace'
          }}>
            {String(lightboxIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </div>
        </div>
      )}
    </div>
  );
};

export default Photography;
