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

  // Create script tag for Google Analytics
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script1)

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }

  // Configure GA
  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
  })
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

