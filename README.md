# Starter Client for Web client side

This project is designed to help you rapidly develop your startup ideas by providing the essential components that most applications require. My goal is to save you countless hours, allowing you to concentrate on what truly matters: creating innovative and groundbreaking tools.

<p align="center">
  <a href="https://github.com/Hans-Breyholtz" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://www.linkedin.com/in/hans-eirik-breyholtz-mott/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://twitter.com/hanseirik_breyh" target="_blank">
    <img src="https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter">
  </a>
  <a href="https://www.youtube.com/@hanseirik_breyholtzmott" target="_blank">
    <img src="https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube">
  </a>
  <a href="https://www.instagram.com/hanseirik_breyholtzmott/" target="_blank">
    <img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram">
  </a>
</p>

## Motivation and Vision

As a passionate startup enthusiast and developer, I've recognized a common challenge in software development: the repetitive setup of foundational components across projects. This realization has inspired me to embark on an ambitious journey - creating the ultimate starter kit for developers.

My drive comes from countless hours spent configuring authentication systems, setting up backend infrastructures, and integrating databases - tasks that, while crucial, often divert energy from the unique aspects of each project. I envision the future with new and creative soluations, if I can help a few to make bigger chanages will that be a reward itself.

I aim to build a comprehensive, flexible starter kit that will:

1.  Accelerate Development: Save 100+ hours on each new project by providing ready-to-use, customizable components.
2.  Empower Creativity: Free developers to focus on innovative features rather than boilerplate setup.
3.  Elevate Quality: Incorporate best practices and robust architectures to ensure projects start on a solid foundation.
4.  Foster Community: Create a platform for developers to share, learn, and contribute, enhancing the kit's value over time.

## Overview

(Rewrite this)

This project is a REST API server developed using Node.js, Express.js, and MongoDB. It serves as the backend for a client application, offering endpoints to facilitate CRUD (Create, Read, Update, Delete) operations. The API is capable of handling user authentication, data validation, and other essential functionalities.

Key features of this project include:

- Type checking TypeScript
- Customized Authentication system: Sign up, Sign in, Forgot password, Reset password, and more.
- Coming soon: Passwordless Authentication with magic links, multi-factor Auth, Social Auth (Google, Facebook, Vipps, Github and more)
- Logging with winston and Log Management with Better Stack
- Integration with MongoDB
- RESTful API design

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [Technologies Used](#technologies-used)
5. [Project Structure](#project-structure)
6. [API Endpoints](#api-endpoints)
7. [Youtube tutorials](#youtube-tutorials)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB (v4.x or higher) installed and running

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/hanseirik-breyholtzmott/starter_client.git

   ```

2. Navigate to the project directory:

   ```
   cd starter_client
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

4. Run the development:

   ```bash
   npm run dev
   ```

## Environment Variables

[.env.template](https://github.com/hanseirik-breyholtzmott/starter_client/blob/main/.env.template)

## Technologies Used

- [Next.js](https://nextjs.org) Next.js is a React-based open-source web development framework that enables server-side rendering, static site generation, and dynamic routing for building fast, scalable web applications.
- [React.js](https://react.dev) React.js is a popular open-source JavaScript library for building user interfaces, particularly for single-page applications, by enabling the creation of reusable UI components.
- [Axios](https://axios-http.com) Axios is a promise-based HTTP client for JavaScript that simplifies making asynchronous requests to APIs and handling responses in both browser and Node.js environments.
- [uploadThing](https://uploadthing.com) Uploadthing is a simple and secure file-uploading solution for developers to easily integrate file upload capabilities into their web applications.
- [Joi](https://www.npmjs.com/package/joi) Joi validation is a powerful schema description library for JavaScript, used to define and validate object structures to ensure data integrity and consistency.
- [Resend](https://resend.com) Resend is an email API platform designed to simplify sending, receiving, and tracking emails programmatically for developers.

## Project structure

```

.next/              # Automatically generated build folder (Do not commit) app/
├── (admin)/        # Admin-related pages and components
├── (auth)/         # Authentication-related pages and components
├── (main)/         # Main application logic and components
├── api/
│ └── uploading/
├── coming-soon/    # Coming soon page
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
├── favicon.ico     # Favicon file
├── globals.css     # Global CSS styles
├── layout.tsx      # Main layout component
├── not-found.tsx   # 404 Not Found page
└── page.tsx        # Main page component
config/             # Configuration files
lib/                # Utility functions
providers/          # Context and providers for state management
public/             # Static files (e.g., images, fonts)
├── .env            # Environment variables
├── middleware.ts   # Custom middleware logic
└── README.md       # Project README file
```

## API Endpoints

## Youtube Tutorials
