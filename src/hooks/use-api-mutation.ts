import { useState } from "react";
import { useMutation } from "convex/react";

```
/**
 * A custom hook for handling API mutations with loading state management
 * @param {Function} mutationFunction - The mutation function to be executed
 * @returns {Object} An object containing the mutate function and pending state
 * @returns {Function} mutate - A function that executes the mutation and manages the pending state
 * @returns {boolean} pending - A boolean indicating whether a mutation is in progress
 */

```export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  /**
   * Performs an API mutation with the given payload and manages the pending state.
   * @param {any} payload - The data to be sent for the API mutation.
   * @returns {Promise<any>} A promise that resolves with the mutation result or rejects with an error.
   */
  const mutate = (payload: any) => {
    setPending(true);
    return apiMutation(payload)
      /**
       * Executes a final action to set the pending state to false, regardless of the outcome of the previous operations.
       * @returns {void} This method doesn't return a value.
       */
      .finally(() => setPending(false))
      /**
       * Handles the resolution of a Promise
       * @param {*} result - The resolved value of the Promise
       /**
        * Handles errors by re-throwing them
        * @param {Error} error - The error object caught in the catch block
        * @returns {void} This method doesn't return anything, it throws the error
        */
       * @returns {*} The same resolved value, passed through unchanged
       */
      .then((result) => {
        return result;
      })
      .catch ((error) => {
        throw error;
      });
  };

  return {
    mutate,
    pending,
  };
};