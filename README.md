---

# Tiger Classes – Student Management System

Tiger Classes is a fully featured **student management system** built using **Next.js 16**, **Prisma**, **PostgreSQL**, **NextAuth**, and **TailwindCSS**.  
It manages batches, courses, students, enrollments, payments, and documents — with **soft delete**, **role-based access**, and a modern dashboard.

## Features

### Authentication
- User **Registration & Login**  
- **NextAuth** JWT-based authentication  
- Sessions stored securely  

### Batches Management
- Create / Read / Update / Delete Batches  
- Soft delete for persistent history  

### Courses Management
- Create / Read / Update / Delete Courses  
- Course details + fee info  
- Soft delete enabled  

### Students Management
- Create / Read / Update / Delete Students  
- Student profile pages  
- Soft delete for history retention  

### Student Courses (Enrolled Courses)
- Students can enroll in one or multiple courses  
- CRUD operations for enrollment records  

### Payments Module
- **Create** and **Delete** payment records  
- Updates are not allowed to keep financial history accurate  
- Each payment is tied to a specific enrolled course  

### Student Documents
- CRUD for document metadata (form-based)  
- Soft delete maintained  

### Dashboard
- Recently added:
  - Student, course, and batch stats  
  - Charts with Recharts (line charts, bar charts, pie)  
- Coming soon:
  - Payments overview section  

### Soft Delete Everywhere
Every entity (Batch, Course, Student, Enrollment, Payment, Document) uses:
- `deleted: boolean`
- `deletedAt: Date | null`

This keeps **history safe**, avoids accidental loss, and makes admin auditing easier.

## Tech Stack

### Frontend + Backend (Full Stack Next.js App)
- **Next.js 16**
- **React 19**
- **TailwindCSS 4**
- **Recharts**
- **Lucide React** & **Heroicons**
- **React Toastify** (notifications)
- **Axios**

### Backend Logic / DB
- **Prisma ORM (6.19)**  
- **Prisma Accelerate Extension**  
- **PostgreSQL**  
- **bcryptjs** for hashing  
- **dotenv** for environment configs  

### Auth
- **NextAuth 4** (JWT adapter)

### Validation
- **Zod 4** for all input validation  

### Dev Tools
- TypeScript  
- ESLint  
- Tailwind PostCSS  
- Prisma Studio  
- React Compiler  
- Baseline browser polyfills  

## Deployment

This full stack app is deployed using [Vercel](https://vercel.com/) by Tiger. You can access the live version here: [Tiger Classes](https://tigerxclasses.vercel.app/)

## Installation & Setup

1. Clone the repository
2. Navigate to the folder
3. Install dependencies
4. Setup environment variables
5. Database setup
6. Start the development server
7. Open the app in your browser at http://localhost:3000

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Made with ❤️ by Tiger

---