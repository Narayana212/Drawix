import { useMutation, useSelf } from "../../liveblocks.config";


/**
 * Custom hook for deleting selected layers from storage
 * @param {Object} options - The options object
 * @param {Object} options.storage - The storage object to manipulate layers and layer IDs
 * @param {Function} options.setMyPresence - Function to update the user's presence
 * @returns {Function} A mutation function that deletes selected layers when called
 */
export const useDeleteLayers = () => {
  /**
   * Custom hook that selects the current user's selection from their presence
   /**
    * Deletes selected layers from storage and clears the selection
    * @param {Object} options - The options object
    * @param {LiveObject} options.storage - The storage object containing layers and layerIds
    * @param {Function} options.setMyPresence - Function to update user's presence
    * @param {Array} selection - Array of layer IDs to be deleted
    * @returns {void} This function doesn't return a value
    */
   * @param {Function} useSelf - Hook to access the current user's state
   * @returns {Object|null} The current selection object or null if no selection
   */
  const selection = useSelf((me) => me.presence.selection);

  return useMutation((
    { storage, setMyPresence }
  ) => {
    const liveLayers = storage.get("layers");
    const liveLayerIds = storage.get("layerIds");

    for (const id of selection) {
      liveLayers.delete(id);

      const index = liveLayerIds.indexOf(id);

      if (index !== -1) {
        liveLayerIds.delete(index);
      }
    }

    setMyPresence({ selection: [] }, { addToHistory: true });
  }, [selection]);
};