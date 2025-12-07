# Quick Start Guide - MongoDB Atlas Setup

## Before Running the Application

1. **Set up MongoDB Atlas** (see `MONGODB_ATLAS_SETUP.md` for detailed instructions)

2. **Get your connection string** from MongoDB Atlas

3. **Update the connection string** in `SCDProject25/db/mongodb.js`:
   - Replace `<username>` with your MongoDB username
   - Replace `<password>` with your MongoDB password
   - Replace `<cluster>` with your cluster address
   - Ensure the database name is included (e.g., `nodevault`)

   Example:
   ```javascript
   const MONGODB_URI = 'mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/nodevault?retryWrites=true&w=majority';
   ```

## Running the Application

```bash
npm start
```

You should see: `✅ Connected to MongoDB Atlas`

## What Changed

- ✅ Replaced file-based database with MongoDB Atlas
- ✅ All CRUD operations now use MongoDB
- ✅ Automatic backups still work (saves to local JSON files)
- ✅ All existing features work the same way
- ✅ Data is now stored in the cloud (MongoDB Atlas)

## Troubleshooting

**Connection Error?**
- Check your connection string in `SCDProject25/db/mongodb.js`
- Verify your IP is whitelisted in MongoDB Atlas
- Check your username and password

**Need Help?**
- See `MONGODB_ATLAS_SETUP.md` for detailed setup instructions

