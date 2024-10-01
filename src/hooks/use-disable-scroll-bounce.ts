import { useEffect } from "react";

/**
 * Custom React hook to disable scroll bounce effect on the body
 * @returns {void} This hook does not return anything
 */
export const useDisableScrollBounce = () => {
  /**
   * Adds and removes CSS classes to the body element to prevent scrolling
   * @returns {void} No return value
   */
  useEffect(() => {
    document.body.classList.add("overflow-hidden", "overscroll-none");
    /**
     * Removes overflow and overscroll classes from the document body
     * @returns {Function} A cleanup function that removes 'overflow-hidden' and 'overscroll-none' classes from the document body
     */
    return () => {
      document.body.classList.remove("overflow-hidden", "overscroll-none");
    };
  }, []);
};