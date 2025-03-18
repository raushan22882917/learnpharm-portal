
/**
 * Content Security Utilities
 * 
 * These functions help implement front-end security measures to protect 
 * educational content from unauthorized copying and sharing.
 */

/**
 * Apply security measures to content elements to prevent copying, saving, etc.
 * @param selector CSS selector for secured content containers
 */
export const secureContent = (selector: string = '.secure-content') => {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    // Make content unselectable
    element.setAttribute('style', 'user-select: none; -webkit-user-select: none;');
    
    // Prevent context menu
    element.addEventListener('contextmenu', e => {
      e.preventDefault();
      return false;
    });
    
    // Prevent drag and drop
    element.addEventListener('dragstart', e => {
      e.preventDefault();
      return false;
    });
  });
  
  // Prevent keyboard shortcuts for copying, etc.
  document.addEventListener('keydown', e => {
    const activeElement = document.activeElement;
    if (activeElement && activeElement.closest(selector)) {
      // Block Ctrl+C, Ctrl+S, Ctrl+P, etc.
      if ((e.ctrlKey || e.metaKey) && 
          (e.key === 'c' || e.key === 's' || e.key === 'p' || 
           e.key === 'a' || e.key === 'x')) {
        e.preventDefault();
        return false;
      }
    }
  });
  
  // Add watermark with user info for screenshots
  addDynamicWatermark();
  
  return () => {
    // Return cleanup function
    elements.forEach(element => {
      element.removeAttribute('style');
      element.removeEventListener('contextmenu', () => {});
      element.removeEventListener('dragstart', () => {});
    });
    document.removeEventListener('keydown', () => {});
    removeDynamicWatermark();
  };
};

/**
 * Add watermark with user information to discourage screenshots
 */
const addDynamicWatermark = () => {
  const watermark = document.createElement('div');
  
  // Get user info from localStorage or session
  const userInfo = JSON.parse(localStorage.getItem('pharm_learn_user') || '{}');
  const userName = userInfo.name || 'Guest User';
  const currentDate = new Date().toLocaleString();
  
  watermark.className = 'content-watermark';
  watermark.innerHTML = `${userName} • ${currentDate} • Unauthorized copying prohibited`;
  
  // Style the watermark
  watermark.style.position = 'fixed';
  watermark.style.top = '50%';
  watermark.style.left = '50%';
  watermark.style.transform = 'translate(-50%, -50%) rotate(-45deg)';
  watermark.style.fontSize = '16px';
  watermark.style.color = 'rgba(0, 0, 0, 0.1)';
  watermark.style.pointerEvents = 'none';
  watermark.style.zIndex = '9999';
  watermark.style.userSelect = 'none';
  watermark.style.width = '100%';
  watermark.style.textAlign = 'center';
  watermark.style.fontWeight = 'bold';
  
  document.body.appendChild(watermark);
};

/**
 * Remove dynamic watermark on cleanup
 */
const removeDynamicWatermark = () => {
  const watermark = document.querySelector('.content-watermark');
  if (watermark) {
    document.body.removeChild(watermark);
  }
};

/**
 * Apply iframe sandboxing for embedded content
 * @param iframeElement The iframe element to secure
 */
export const secureIframe = (iframeElement: HTMLIFrameElement) => {
  if (!iframeElement) return;
  
  // Set sandbox attributes to restrict iframe capabilities
  iframeElement.sandbox.add('allow-scripts');
  iframeElement.sandbox.add('allow-same-origin');
  
  // Disable pointer events when not in focus
  iframeElement.addEventListener('blur', () => {
    iframeElement.style.pointerEvents = 'none';
  });
  
  iframeElement.addEventListener('focus', () => {
    iframeElement.style.pointerEvents = 'auto';
  });
  
  // Set Content Security Policy
  const csp = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';";
  iframeElement.setAttribute('csp', csp);
};

/**
 * Toggle security features on/off for admin management
 * @param enable Whether to enable or disable security features
 * @param selector CSS selector for secured content
 */
export const toggleSecurityFeatures = (enable: boolean, selector: string = '.secure-content') => {
  const elements = document.querySelectorAll(selector);
  
  if (enable) {
    secureContent(selector);
  } else {
    elements.forEach(element => {
      element.removeAttribute('style');
    });
    
    const watermark = document.querySelector('.content-watermark');
    if (watermark) {
      document.body.removeChild(watermark);
    }
  }
  
  return enable;
};

/**
 * Apply watermark with user information on downloadable content
 * @param content HTML content to watermark
 * @param userName User name to include in watermark
 */
export const watermarkContent = (content: string, userName: string) => {
  const timestamp = new Date().toLocaleString();
  const watermarkHTML = `
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
                pointer-events: none; z-index: 1000; opacity: 0.07; overflow: hidden;">
      ${Array(20).fill(`${userName} • ${timestamp} • CONFIDENTIAL`).join('<br>')}
    </div>
  `;
  
  // Insert watermark at beginning of body
  return content.replace('<body>', `<body>${watermarkHTML}`);
};
