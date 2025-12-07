# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas and connect it to your NodeVault application.

## Step 1: Create a MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** or **"Sign Up"**
3. Fill in your details and create an account

## Step 2: Create a New Cluster

1. After logging in, you'll be prompted to create a cluster
2. Choose **"Build a Database"**
3. Select the **FREE (M0)** tier
4. Choose a cloud provider and region (closest to your location)
5. Click **"Create"** (cluster name is optional)

## Step 3: Create Database User

1. In the **Security** section, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. Enter a username and password (save these securely!)
5. Under **"Database User Privileges"**, select **"Read and write to any database"**
6. Click **"Add User"**

## Step 4: Configure Network Access

1. In the **Security** section, click **"Network Access"**
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (adds 0.0.0.0/0)
   - **Note**: For production, use specific IP addresses
4. Click **"Confirm"**

## Step 5: Get Your Connection String

1. Go to **"Database"** section
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as the driver
5. Copy the connection string (it looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Connection String in Your Application

1. Replace `<username>` with your database username
2. Replace `<password>` with your database password
3. Add your database name after the `.net/` part (e.g., `nodevault`)

**Example:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/nodevault?retryWrites=true&w=majority
```

## Step 7: Update Your Application

### Option A: Update the connection string directly in code

Edit `SCDProject25/db/mongodb.js` and replace the `MONGODB_URI` with your connection string.

### Option B: Use Environment Variable (Recommended)

1. Create a `.env` file in the project root:
   ```
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/nodevault?retryWrites=true&w=majority
   ```

2. Install dotenv package:
   ```bash
   npm install dotenv
   ```

3. Add to the top of `SCDProject25/db/mongodb.js`:
   ```javascript
   require('dotenv').config();
   ```

## Step 8: Test Your Connection

Run your application:
```bash
npm start
```

You should see: `✅ Connected to MongoDB Atlas`

## Troubleshooting

### Connection Timeout
- Check your network access settings in Atlas
- Ensure your IP address is whitelisted

### Authentication Failed
- Verify your username and password
- Make sure special characters in password are URL-encoded

### Database Not Found
- MongoDB Atlas will create the database automatically when you first insert data
- Make sure the database name in the connection string is correct

## Security Best Practices

1. **Never commit your connection string to Git**
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **Use specific IP addresses in production**
   - Don't use "Allow Access from Anywhere" in production

3. **Use strong passwords**
   - Mix of uppercase, lowercase, numbers, and special characters

4. **Rotate passwords regularly**

## Next Steps

Once connected, your application will automatically:
- Create the `records` collection
- Store all data in MongoDB Atlas
- Maintain all existing functionality

