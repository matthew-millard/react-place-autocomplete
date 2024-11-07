import { useEffect, useState } from "react";

type AutocompleteRequest = google.maps.places.AutocompleteRequest;
type Suggestions = google.maps.places.AutocompleteSuggestion[];

export function useAutocompleteService(request: AutocompleteRequest): Suggestions {
  const [suggestions, setSuggestions] = useState<Suggestions>([]);

  useEffect(() => {
    if (request.input) {
      async function fetchSuggestions() {
        try {
          const { AutocompleteSuggestion } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;

          // Fetch autocomplete suggestions.
          const { suggestions = [] } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

          setSuggestions(suggestions);
        } catch (error) {
          console.error("Failed to fetch autocomplete suggestions:", error);
          setSuggestions([]);
        }
      }

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [request.input]);

  return suggestions;
}
