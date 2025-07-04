# Pexels API Integration Guide

## Setup

- The Pexels API key is stored in `.env` as `REACT_APP_PEXELS_API_KEY`.
  - **NEVER** commit your `.env` to public repositories.
- The React app uses the environment variable at build time.

## Usage

- Use the utility in `src/pexelsApi.js` to fetch pet images:

```js
import { fetchPetImages } from "./pexelsApi";

fetchPetImages("puppy", 10)
  .then(data => console.log(data.photos)) // Array of photo objects
  .catch(err => alert(err.message));
```

## Security

- Do not expose the API key in your UI code or repository.
- Only use the key for client-side requests to Pexels (as permitted by [Pexels API docs](https://www.pexels.com/api/documentation/)).

## Example Response

See [Pexels API Docs](https://www.pexels.com/api/documentation/) for details.

Typical response structure:
```json
{
  "page": 1,
  "per_page": 10,
  "photos": [
    {
      "id": 234545,
      "width": 5000,
      "height": 3500,
      "url": "...",
      "src": {
         "original": "...",
         "medium": "...",
         "small": "...",
         "portrait": "...",
         "landscape": "...",
         "tiny": "..."
      },
      "photographer": "...",
      ...
    }
  ],
  "total_results": 10000,
  "next_page": "..."
}
```
