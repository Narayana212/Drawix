
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { 
  Camera, 
  Color, 
  Layer, 
  LayerType, 
  PathLayer, 
  Point, 
  Side, 
  XYWH
} from "@/types/canvas";

const COLORS = [
  "#DC2626", 
  "#D97706", 
  "#059669", 
  "#7C3AED", 
  "#DB2777"
];

```
/**
 * Merges and combines CSS class names using clsx and twMerge utilities
 * @param {...ClassValue[]} inputs - An array of class values to be merged
 /**
  * Converts a connection ID to a color string.
  * @param {number} connectionId - The unique identifier for the connection.
  * @returns {string} The color string associated with the connection ID.
  */
 * @returns {string} A string of combined and merged CSS class names
 */
```
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
};

/**
 * Converts a pointer event to canvas coordinates based on the camera position
 * @param {React.PointerEvent} e - The pointer event object
 * @param {Camera} camera - The camera object containing x and y coordinates
 * @returns {Object} An object with x and y properties representing the canvas point
 */
export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera,
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
};

/**
 * Converts a Color object to a CSS hexadecimal color string
 * @param {Color} color - An object containing r, g, and b properties representing red, green, and blue values (0-255)
 * @returns {string} A CSS hexadecimal color string in the format "#RRGGBB"
 */
export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

/**
 * Resizes the given bounds based on the specified corner and point.
 * @param {XYWH} bounds - The original bounds to be resized.
 * @param {Side} corner - The corner or side of the bounds to be adjusted.
 * @param {Point} point - The new point to which the specified corner should be moved.
 * @returns {XYWH} The resized bounds.
 */
export function resizeBounds(
  bounds: XYWH, 
  corner: Side, 
  point: Point
): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
};

/**
 * Finds layers that intersect with a given rectangle.
 * @param {readonly string[]} layerIds - Array of layer IDs to check for intersection.
 * @param {ReadonlyMap<string, Layer>} layers - Map of layer IDs to Layer objects.
 * @param {Point} a - First point defining the rectangle.
 * @param {Point} b - Second point defining the rectangle.
 * @returns {string[]} Array of layer IDs that intersect with the given rectangle.
 */
export function findIntersectingLayersWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point,
) {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };

  const ids = [];

  for (const layerId of layerIds) {
    const layer = layers.get(layerId);

    if (layer == null) {
      continue;
    }

    const { x, y, height, width } = layer;

    if (
      rect.x + rect.width > x &&
      rect.x < x + width && 
      rect.y + rect.height > y &&
      rect.y < y + height
    ) {
      ids.push(layerId);
    }
  }

  return ids;
};

/**
 * Determines the contrasting text color (black or white) based on the background color.
 * @param {Color} color - The background color object containing r, g, b values.
 * @returns {string} The contrasting text color: "black" or "white".
 */
export function getContrastingTextColor(color: Color) {
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

  return luminance > 182 ? "black" : "white";
};

/**
 * Transforms an array of pen points into a PathLayer object.
 * @param {number[][]} points - An array of points, where each point is an array of [x, y, pressure].
 * @param {Color} color - The fill color for the path.
 * @returns {PathLayer} A PathLayer object representing the path drawn by the points.
 * @throws {Error} If the input array has less than 2 points.
 */
export function penPointsToPathLayer(
  points: number[][],
  color: Color,
): PathLayer {
  if (points.length < 2) {
    throw new Error("Cannot transform points with less than 2 points");
  }

  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (left > x) {
      left = x;
    }

    if (top > y) {
      top = y;
    }

    if (right < x) {
      right = x;
    }

    if (bottom < y) {
      bottom = y;
    }
  }

  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points
      /**
       * Maps an array of touch point coordinates and pressure to adjusted coordinates relative to a container
       * @param {Array} entry - An array containing [x, y, pressure] values for a touch point
       * @returns {Array} An array with adjusted [x, y, pressure] values relative to the container's top-left corner
       */
      .map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
};

/**
 * Generates an SVG path string from an array of stroke coordinates.
 * @param {number[][]} stroke - An array of [x, y] coordinate pairs representing the stroke.
 * @returns {string} A string representing the SVG path data.
 ```
 /**
  * Processes an array of coordinate pairs to create a new array with midpoints.
  * @param {Array} acc - The accumulator array to store the processed coordinates.
  * @param {Array} [x0, y0] - The current coordinate pair being processed.
  * @param {number} i - The index of the current coordinate pair in the array.
  * @param {Array} arr - The original array of coordinate pairs.
  * @returns {Array} The updated accumulator array with new coordinates and midpoints.
  */
 ```
 */
export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};
