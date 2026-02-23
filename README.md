Architecture Decisions
The Lumina Teacher Insights Dashboard is built using a decoupled MERN-style architecture (replacing MongoDB with SQLite/Prisma for structured data integrity).

Frontend (React + Vite): * Decision: I chose Vite over Create React App for significantly faster build times and a better developer experience.

State Management: I used React's native useState and useEffect hooks for data fetching, keeping the bundle size small without the overhead of Redux for this scale of application.

UI/UX: Tailwind CSS was used to create a custom "Lumina" design system, focusing on a clean, accessible dashboard for school directors.

Backend (Node.js + Express):

Decision: A RESTful API design was implemented to separate concerns. This allows the frontend and backend to be hosted on different services (Vercel and Render).

ORM (Prisma): Prisma was selected to provide a type-safe interface for the database. This allowed for rapid development and ensured that the data coming from the CSV files mapped perfectly to the UI requirements.

Database (SQLite):

Decision: SQLite was chosen for this prototype because it is a self-contained, serverless database engine that simplifies deployment while still providing full relational capabilities for complex teacher-activity queries.

 Future Scalability Improvements
While the current version is fully functional, it is designed with a roadmap for scaling:

Database Migration (PostgreSQL): As the data grows from hundreds of rows to millions, the architecture is ready to migrate from SQLite to a managed PostgreSQL instance with minimal code changes, thanks to the abstraction provided by the Prisma ORM.

Real-time Updates (WebSockets): Future versions could implement Socket.io to push real-time activity alerts to the Director's dashboard as soon as a teacher creates a new lesson or assessment.

Role-Based Access Control (RBAC): Expanding the authentication layer beyond a simple PIN to a full JWT-based system (JSON Web Tokens). This would allow different levels of access (e.g., Teachers seeing only their data, while Directors see the entire campus).

Caching Strategy (Redis): To reduce database load and improve response times for the "All Instructors" overview, a Redis caching layer could be implemented for the most frequent API requests.

 Tech Stack Recap
How to use this:
Open your README.md file in the root of your project.

Replace the current text with this version.

Commit and push:

git add .

git commit -m "Updated README with architecture and scalability docs"

git push
