# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas for the Resume Builder application.

## Prerequisites

- A MongoDB Atlas account (free tier available)
- Internet connection

## Step-by-Step Setup

### 1. Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click on **"Start Free"** or **"Sign Up"**
3. Sign up using your email, Google, or GitHub account
4. Verify your email address if required

### 2. Create a New Cluster

1. After logging in, click **"Build a Database"** or **"Create"**
2. Choose the **FREE** tier (M0 Sandbox)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to your location for better performance
5. Name your cluster (optional) or keep the default name
6. Click **"Create Cluster"** (this may take 3-5 minutes)

### 3. Create a Database User

1. In the left sidebar, click on **"Database Access"** under Security
2. Click **"Add New Database User"**
3. Choose **"Password"** as the authentication method
4. Enter a username (e.g., `resumebuilder`)
5. Click **"Autogenerate Secure Password"** or create your own
   - ⚠️ **Important**: Save this password securely! You'll need it for the connection string
6. Under **"Database User Privileges"**, select **"Read and write to any database"**
7. Click **"Add User"**

### 4. Configure Network Access

1. In the left sidebar, click on **"Network Access"** under Security
2. Click **"Add IP Address"**
3. For development purposes:
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ **Note**: For production, restrict to specific IP addresses
4. Click **"Confirm"**

### 5. Get Your Connection String

1. Go back to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Select **"Connect your application"**
4. Choose **"Node.js"** as the driver and select the latest version
5. Copy the connection string (it looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 6. Configure Your Application

1. Open the `.env` file in the `server` directory
2. Replace `<username>` with your database username
3. Replace `<password>` with your database password
4. Add your database name (e.g., `resume_builder`) after `mongodb.net/`

Example `.env` file:
```env
MONGO_URI=mongodb+srv://resumebuilder:YourPassword123@cluster0.xxxxx.mongodb.net/resume_builder?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

### 7. Test the Connection

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   or
   ```bash
   nodemon
   ```

4. Look for a success message like:
   ```
   Server is running on port 5000
   MongoDB connected successfully
   ```

## Common Issues and Solutions

### Issue: "Authentication failed"
- **Solution**: Double-check your username and password in the connection string
- Make sure there are no special characters that need URL encoding in your password
- If your password contains special characters, encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - `%` → `%25`

### Issue: "IP not whitelisted"
- **Solution**: Go to Network Access and add your current IP address or allow access from anywhere (0.0.0.0/0)

### Issue: "Connection timeout"
- **Solution**: 
  - Check your internet connection
  - Verify the cluster is running (green status in Atlas dashboard)
  - Ensure your firewall isn't blocking MongoDB connections

### Issue: "Cannot connect to cluster"
- **Solution**:
  - Wait a few minutes if you just created the cluster
  - Verify the connection string format is correct
  - Make sure you've replaced `<username>` and `<password>` with actual values

## Database Structure

The Resume Builder uses the following collections:

- **users**: Stores user account information
- **resumes**: Stores resume data for each user

## Managing Your Database

### View Data
1. In MongoDB Atlas, go to **"Browse Collections"**
2. Select your database and collection
3. View, edit, or delete documents

### Create Indexes
1. Go to **"Collections"** → Select your collection
2. Click **"Indexes"** tab
3. Create indexes for better query performance

### Backup
- MongoDB Atlas automatically creates backups for free tier clusters
- Access backups from the **"Backup"** tab

## Security Best Practices

1. ✅ Never commit your `.env` file to version control
2. ✅ Use strong, unique passwords for database users
3. ✅ Restrict IP access in production environments
4. ✅ Regularly rotate database credentials
5. ✅ Use environment variables for sensitive data
6. ✅ Enable MongoDB Atlas alerts for suspicious activity

## Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Node.js Driver Documentation](https://mongodb.github.io/node-mongodb-native/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

## Support

If you encounter any issues:
1. Check the MongoDB Atlas logs in the dashboard
2. Review the server console for error messages
3. Consult the MongoDB Atlas support documentation
4. Open an issue in the project repository

---

**Last Updated**: November 2025
