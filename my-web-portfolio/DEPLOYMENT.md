# Deploying to WSO2 Choreo

This guide will help you deploy your Next.js portfolio to WSO2 Choreo.

## Prerequisites

1. WSO2 Choreo account
2. Docker installed locally (for testing)
3. Git repository with your code

## Steps to Deploy

### 1. Build and Test Locally

First, test your Docker build locally:

```bash
# Build the Docker image
docker build -t my-portfolio .

# Run the container locally
docker run -p 3000:3000 my-portfolio
```

Visit `http://localhost:3000` to verify everything works.

### 2. Push to Git Repository

Make sure your code is pushed to a Git repository (GitHub, GitLab, etc.):

```bash
git add .
git commit -m "Prepare for Choreo deployment"
git push origin main
```

### 3. Deploy to WSO2 Choreo

#### Option A: Using Choreo Console

1. **Login to Choreo Console**
   - Go to [Choreo Console](https://console.choreo.dev/)
   - Sign in with your credentials

2. **Create a New Project**
   - Click "Create Project"
   - Give it a name (e.g., "Portfolio")
   - Choose your organization

3. **Create a New Component**
   - Click "Create Component"
   - Select "Web Application"
   - Choose "Dockerfile" as the build method

4. **Configure the Component**
   - **Name**: `portfolio-web`
   - **Description**: `My personal portfolio website`
   - **Repository**: Select your Git repository
   - **Branch**: `main` (or your default branch)
   - **Dockerfile Path**: `Dockerfile`
   - **Port**: `3000`

5. **Deploy**
   - Click "Deploy"
   - Wait for the build and deployment to complete

#### Option B: Using Choreo CLI

1. **Install Choreo CLI**
   ```bash
   npm install -g @wso2/choreo-cli
   ```

2. **Login to Choreo**
   ```bash
   choreo login
   ```

3. **Deploy**
   ```bash
   choreo deploy --project portfolio --component portfolio-web
   ```

### 4. Configure Environment Variables

If you have any environment variables (like EmailJS keys), configure them in Choreo:

1. Go to your component in Choreo Console
2. Navigate to "Settings" → "Environment Variables"
3. Add any required environment variables

### 5. Access Your Application

Once deployed, you'll get a URL like:
`https://portfolio-web-{org}-{project}.choreo.dev`

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check the build logs in Choreo Console
   - Ensure all dependencies are in `package.json`
   - Verify the Dockerfile is correct

2. **Runtime Errors**
   - Check the application logs
   - Verify environment variables are set correctly
   - Ensure EmailJS configuration is correct

3. **Port Issues**
   - Make sure your app listens on port 3000
   - Check that the port is exposed in Dockerfile

### Logs and Monitoring

- **Build Logs**: Available in Choreo Console under your component
- **Runtime Logs**: Available in "Logs" section
- **Metrics**: Available in "Observability" section

## Environment Variables

If you need to set environment variables for EmailJS or other services:

1. Go to your component in Choreo Console
2. Navigate to "Settings" → "Environment Variables"
3. Add variables like:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## Scaling

Choreo supports auto-scaling:
- Configure minimum and maximum replicas
- Set up scaling policies based on CPU/memory usage
- Enable horizontal pod autoscaling

## Custom Domain

To use a custom domain:
1. Go to "Settings" → "Custom Domain"
2. Add your domain
3. Configure DNS records as instructed
4. Enable SSL certificate

## Support

For Choreo-specific issues:
- Check [Choreo Documentation](https://wso2.com/choreo/docs/)
- Contact WSO2 Support
- Visit [Choreo Community](https://wso2.com/choreo/community/) 