
/**
 * Security utility functions to protect content
 */

/**
 * Disables right-click context menu on specified elements
 * @param selector - CSS selector for elements to protect
 */
export const disableContextMenu = (selector: string = '.secure-content') => {
  const handleContextMenu = (e: MouseEvent) => {
    if ((e.target as Element).closest(selector)) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  document.addEventListener('contextmenu', handleContextMenu);
  
  // Return function to remove the event listener
  return () => {
    document.removeEventListener('contextmenu', handleContextMenu);
  };
};

/**
 * Disables keyboard shortcuts that could be used for copying
 * @param selector - CSS selector for elements to protect
 */
export const disableCopyShortcuts = (selector: string = '.secure-content') => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.target as Element).closest(selector)) {
      // Disable Ctrl+C, Ctrl+X, Ctrl+P, etc.
      if (
        (e.ctrlKey || e.metaKey) && 
        (e.key === 'c' || e.key === 'x' || e.key === 'p' || e.key === 's' || e.key === 'g')
      ) {
        e.preventDefault();
        return false;
      }
      
      // Disable F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
    }
    return true;
  };

  document.addEventListener('keydown', handleKeyDown);
  
  // Return function to remove the event listener
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Apply all content protection measures to a page
 * @param selector - CSS selector for elements to protect
 */
export const secureContent = (selector: string = '.secure-content') => {
  const cleanup1 = disableContextMenu(selector);
  const cleanup2 = disableCopyShortcuts(selector);
  
  // Return function to remove all event listeners
  return () => {
    cleanup1();
    cleanup2();
  };
};
