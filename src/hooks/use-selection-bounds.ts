import { shallow } from "@liveblocks/react";

import { Layer, XYWH } from "@/types/canvas";
import { useSelf, useStorage } from "../../liveblocks.config";


/**
 * Calculates the bounding box encompassing all given layers.
 * @param {Layer[]} layers - An array of Layer objects, each with x, y, width, and height properties.
 * @returns {XYWH | null} An object representing the bounding box with x, y, width, and height properties, or null if the input array is empty.
 */
const boundingBox = (layers: Layer[]): XYWH | null => {
  const first = layers[0];

  if (!first) {
    return null;
  }

  let left = first.x;
  let right = first.x + first.width;
  let top = first.y;
  let bottom = first.y + first.height;

  for (let i = 1; i < layers.length; i++) {
    const { x, y, width, height } = layers[i];

    if (left > x) {
      left = x;
    }

    if (right < x + width) {
      right = x + width;
    }

    if (top > y) {
      top = y;
    }

    if (bottom < y + height) {
      bottom = y + height;
    }
  }

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
};

/**
 /**
  * Custom hook that selects the current user's selection from their presence state
  * @param {void} No parameters
  * @returns {Selection|null} The current selection of the user, or null if no selection is made
  */
 * Custom React hook that calculates the bounding box of selected layers
 * @returns {Object|null} The bounding box of selected layers or null if no layers are selected
 */
export const useSelectionBounds = () => {
  const selection = useSelf((me) => me.presence.selection);

  /**
   * Calculates the bounding box of selected layers using a storage hook.
   * @param {function} root - The root accessor function for the storage.
   * @returns {object} The bounding box of the selected layers.
   */
  return useStorage((root) => {
    const selectedLayers = selection
      /**
       * Maps layer IDs to their corresponding layer objects
       * @param {string[]} layerId - An array of layer IDs
       * @returns {Layer[]} An array of Layer objects corresponding to the given layer IDs
       */
      .map((layerId) => root.layers.get(layerId)!)
      .filter(Boolean);

    return boundingBox(selectedLayers);
  }, shallow);
};