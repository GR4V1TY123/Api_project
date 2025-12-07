# Movie API — React + OMDB + TanStack Query

A simple and fast movie/series search app built to for API integration, client-side caching, error handling, and URL-based search using the OMDB API.

This project demonstrates how to:

• Structure API fetch logic using custom hooks  
• Log API response metadata (status, time, headers)  
• Manage React Query cache  
• Implement dynamic filtering (Movies / Series / All)  
• Sync search with the URL (?title=)

🔗 Live Demo: https://api-project-mandar.netlify.app/

🔗 GitHub Repo: https://github.com/GR4V1TY123/Api_project

------------------------------------------------------------

### Tech Stack

#### Frontend:
• React + Vite  
• TypeScript  
• TanStack React Query  
• React Router DOM  
• TailwindCSS  
• ShadCN UI + Radix UI Components  

#### API:
• OMDB API  
  - Search by title → http://www.omdbapi.com/?s=&apikey=  
  - Fetch by ID → http://www.omdbapi.com/?i=&apikey=  

#### Deployment:
• Netlify  

------------------------------------------------------------

### Setup & Run Instructions

1️⃣ Clone Repo  
git clone https://github.com/GR4V1TY123/Api_project.git

2️⃣ Install Dependencies  
npm install

3️⃣ Create Environment File  
Create a file named `.env` in the root:

VITE_OMDB_KEY=your_api_key_here

4️⃣ Run Locally  
npm run dev

------------------------------------------------------------

### API Endpoints Used

#### Search Movies  
GET http://www.omdbapi.com/?s=<TITLE>&page=1&apikey=<API_KEY>

#### Get Movie by Id  
GET http://www.omdbapi.com/?i=<id>&page=1&apikey=<API_KEY>

------------------------------------------------------------

### Filters Implemented

1. Category Filter  
Values:  
• all  
• movie  
• series  

Filtering logic:  
const filterMovies = movies.filter(m =>
  category === "all" ? true : m.Type.toLowerCase() === category
);

2. URL-Based Title Search  
User’s input updates URL as: /?title=batman  
React Query fetches automatically because queryKey changes.

------------------------------------------------------------

### Features & Flow

URL → Fetch → Cache → Render

• User types a movie title  
• App updates URL: /?title=value  
• useMovieFetch():  
  - Reads title from URL  
  - Checks React Query cache  
  - Fetches if expired or not in cache  
  - Logs metadata  
• Movies displayed  
• Category filter updates results instantly  

------------------------------------------------------------

### Error Handling

The app handles:  
• Empty search  
• Invalid movie name (Response: "False")  
• Network errors  
• OMDB rate limit  
• Invalid API key  
• Loading + No Results UI  

Metadata logged:  
• Status code  
• Status text  
• Response headers  
• Duration (ms)  
• Full JSON  

------------------------------------------------------------

### Assumptions & Notes

• OMDB returns only 10 results per page → app uses only page 1  
• Category filtering is entirely client-side  
• Search triggers only on form submit  
• React Query cache uses staleTime = 5 minutes  
• If thousands of titles are searched, React Query keeps cached data

------------------------------------------------------------

### Project Structure

src/  
├── components/  
│   ├── MovieCard.tsx  
│   ├── Category.tsx  
│   ├── List.tsx  
│   └── ApiInfo.tsx  
├── hooks/  
│   ├── useMovieFetch.ts  
│   └── useIdFetch.ts  
├── pages/  
│   ├── Details.tsx  
│   └── Home.tsx  
├── App.tsx  
└── main.tsx

### ScreenShots
<img width="1906" height="877" alt="image" src="https://github.com/user-attachments/assets/e38de8db-5ee0-4c09-b64b-070e931a21ee" />
<img width="1900" height="872" alt="image" src="https://github.com/user-attachments/assets/7bfd1e53-1be7-4874-9849-d4c70f8d067c" />
<img width="1900" height="872" alt="image" src="https://github.com/user-attachments/assets/07bc7c81-136d-4c64-bac5-71475ee244bf" />


