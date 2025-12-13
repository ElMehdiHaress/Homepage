// Google Analytics 4 utility functions

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  if (typeof window === 'undefined') return

  // Initialize dataLayer and gtag function BEFORE loading the script
  // This ensures commands are queued properly and processed when script loads
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }

  // Queue the js initialization command (will be processed when script loads)
  window.gtag('js', new Date())
  
  // Queue the config command (will be processed when script loads)
  // This ensures proper initialization even if script.onload fires late
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
  })

  // Create script tag for Google Analytics
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  
  // Handle script load completion
  script.onload = () => {
    // Script has loaded and processed dataLayer commands
    // If window.gtag was replaced by GA library, ensure config is sent
    if (typeof window.gtag === 'function') {
      // Re-send config to ensure it's registered (in case dataLayer wasn't processed)
      try {
        window.gtag('config', measurementId, {
          page_path: window.location.pathname,
        })
      } catch (error) {
        console.warn('Google Analytics initialization error:', error)
      }
    }
  }
  
  // Handle script load errors
  script.onerror = () => {
    console.warn('Failed to load Google Analytics script')
  }
  
  document.head.appendChild(script)
}

// Track page views (call this on route changes)
export const trackPageView = (url: string, measurementId?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const id = measurementId || import.meta.env.VITE_GA_MEASUREMENT_ID || ''
    if (id) {
      window.gtag('config', id, {
        page_path: url,
      })
    }
  }
}

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

