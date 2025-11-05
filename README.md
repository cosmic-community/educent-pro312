# Educent Pro - Institute Management Platform

![App Preview](https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=300&fit=crop&auto=format)

A comprehensive multi-tenant institute management system built with Next.js and Cosmic CMS, featuring role-based dashboards, real-time attendance tracking, and deterministic reward systems.

## ✨ Features

- 🏫 **Multi-Tenant Architecture** - Manage multiple institutes with complete data isolation
- 👥 **Role-Based Access Control** - Student, Lecturer, Parent, Principal, and Admin roles
- 📊 **Real-Time Dashboards** - Live updates for attendance and notifications
- 🎁 **Reward System** - Deterministic spin wheel based on attendance streaks
- 📱 **Mobile-First Design** - Fully responsive interface for all devices
- 🔒 **Hidden Admin Panel** - Secret access via @HVRS logo activation
- 📝 **Audit Trails** - Complete activity logging with immutable records
- ♿ **Accessibility** - WCAG AA compliant interface

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=690b5b33fb7423bbdde4ab94&clone_repository=690b5e21fb7423bbdde4abcd)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Build Educent Pro — a multi-tenant institute management platform (Control HQ + Institute App) with strict RBAC, realtime sync, attendance-based deterministic rewards (spin wheel), audit trails, and accessible, mobile-first UI — delivered as a monorepo with frontend, backend, infra, tests and CI/CD."

### Code Generation Prompt

> "Based on the content model I created, now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies

- **Framework**: Next.js 16 with App Router
- **Styling**: TailwindCSS with custom design tokens
- **CMS**: Cosmic for content management
- **TypeScript**: Full type safety and developer experience
- **Authentication**: Mock authentication for demo purposes
- **State Management**: React hooks and context

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- Cosmic CMS account with configured bucket
- Environment variables configured

### Installation

1. Clone the repository
2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

The app demonstrates various Cosmic SDK patterns:

- Fetching typed objects with depth parameter
- Handling empty results with proper error handling
- Real-time updates for attendance and notifications
- CRUD operations for rewards and attendance

## 🔗 Cosmic CMS Integration

This application integrates with your Cosmic bucket containing:
- **Institutes**: Educational institution profiles
- **Users**: System users with role assignments
- **Students**: Student records with attendance summaries
- **Attendance**: Daily attendance records
- **Rewards**: Reward requests and approvals
- **Notices**: Institute announcements

## 🌐 Deployment Options

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Configure environment variables
4. Deploy

### Netlify
1. Build command: `bun run build`
2. Publish directory: `.next`
3. Configure environment variables

### Self-Hosted
1. Build: `bun run build`
2. Start: `bun start`
3. Use PM2 or systemd for process management

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com/docs)
<!-- README_END -->