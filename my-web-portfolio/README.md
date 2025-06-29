# Shenal's Web Portfolio

A modern, responsive portfolio website built with Next.js, featuring dark/light theme toggle, GSAP animations, and EmailJS contact form integration.

## Features

- 🌙 Dark/Light theme toggle
- ✨ GSAP animations and smooth transitions
- 📱 Fully responsive design
- 📧 Contact form with EmailJS integration
- 🎮 Interactive OOP knowledge quiz
- 🎨 Modern glassmorphism UI design

## EmailJS Setup

To enable the contact form functionality, you need to configure EmailJS:

### 1. Create EmailJS Account
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin)
2. Sign up/Login to your account

### 2. Create Email Service
1. Click "Add New Service"
2. Choose your email provider (Gmail, Outlook, etc.)
3. Connect your email account
4. Note down the **Service ID** (format: `service_xxxxxxx`)

### 3. Create Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template structure:
```html
Subject: New message from {{name}}

Name: {{name}}
Email: {{email}}
Message: {{message}}
```
4. Note down the **Template ID** (format: `template_xxxxxxx`)

### 4. Get Your Public Key
1. Go to "Account" → "API Keys" in EmailJS dashboard
2. Copy your **Public Key**

### 5. Configure Environment Variables
Create a `.env.local` file in the root directory with:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 6. Deploy to Vercel
When deploying to Vercel, add these environment variables in your Vercel project settings:
- Go to your Vercel project dashboard
- Navigate to Settings → Environment Variables
- Add the three EmailJS variables above

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up EmailJS (see instructions above)
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Technologies Used

- Next.js 15
- React 18
- GSAP (GreenSock)
- Tailwind CSS
- EmailJS
- Framer Motion (for animations)

## License

MIT License
