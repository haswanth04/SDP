# JobSync — AI-Powered Job Portal (MERN Stack)

An end-to-end job matching platform built with the MERN stack and Gemini API. JobSync delivers personalized job recommendations, secure multi-role authentication, and scalable cloud deployment.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Configuration](#configuration)  
   - [Running Locally](#running-locally)  
4. [Usage](#usage)  
5. [API Reference](#api-reference)  
6. [Testing](#testing)  
7. [Deployment](#deployment)  
8. [Contributing](#contributing)  
9. [License](#license)  

---

## Features

- 🔍 **AI-Driven Matching**  
  Integrates Gemini API to surface highly relevant job postings for each user.  
- 🔐 **Multi-Role Auth**  
  Secure JWT-based login for Admin, Employer & Seeker roles with fine-grained permissions.  
- ⚡ **Performance Optimized**  
  Node.js & Redis caching to reduce average API latency by 30%.  
- ☁️ **Cloud-Ready**  
  Dockerized & deployable on AWS EC2/Elastic Beanstalk or any container service.  
- 📈 **Scalable Data Layer**  
  MongoDB with indexing & pagination for fast job search & listing.  

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios  
- **Backend**: Node.js, Express.js, Redis cache  
- **Database**: MongoDB (Atlas or local)  
- **API**: OpenAI Gemini API  
- **Auth**: JSON Web Tokens (JWT)  
- **Deployment**: Docker, AWS EC2 / Elastic Beanstalk  

---

## Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org/)  
- [MongoDB](https://www.mongodb.com/) (local or Atlas)  
- [Redis](https://redis.io/) (optional, for caching)  
- An OpenAI account & [Gemini API key](https://platform.openai.com/)  

### Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/haswanth04/SDP.git
   cd SDP
