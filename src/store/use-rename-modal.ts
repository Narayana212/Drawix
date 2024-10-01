import { create } from "zustand";

const defaultValues = { id: "", title: "" };

interface IRenameModal {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
};

/**
 * Creates a custom hook for managing a rename modal state
 ```
 /**
  * Opens a modal or dialog with initial values.
  * @param {string|number} id - The unique identifier of the item to be opened.
  * @param {string} title - The title of the item to be displayed.
  * @returns {void} This function doesn't return a value but updates the state.
  */
 ```
 * @param {Function} set - Function to update the state
 * @returns {Object} An object containing the modal state and control functions
 */
export const useRenameModal = create<IRenameModal>((set) => ({
  /**
   * Handles the closing action for a component or modal
   * @param {void} - This function doesn't accept any parameters
   * @returns {void} Updates the state by setting isOpen to false and resetting initialValues to default
   */
  isOpen: false,
  onOpen: (id, title) => set({
    isOpen: true,
    initialValues: { id, title },
  }),
  onClose: () => set({
    isOpen: false,
    initialValues: defaultValues,
  }),
  initialValues: defaultValues,
}));