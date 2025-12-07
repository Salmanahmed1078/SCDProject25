// Load environment variables from .env file first
require('dotenv').config();

const readline = require('readline');
const db = require('./db');
const { connectDB } = require('./db/mongodb');
require('./events/logger'); // Initialize event logger

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function menu() {
  console.log(`
===== NodeVault =====
1. Add Record
2. List Records
3. Update Record
4. Delete Record
5. Search Records
6. Sort Records
7. Export Data
8. View Vault Statistics
9. Exit
=====================
  `);

  rl.question('Choose option: ', async (ans) => {
    try {
      switch (ans.trim()) {
        case '1':
          rl.question('Enter name: ', (name) => {
            rl.question('Enter value: ', async (value) => {
              try {
                await db.addRecord({ name, value });
                console.log('✅ Record added successfully!');
              } catch (error) {
                console.log(`❌ Error: ${error.message}`);
              }
              menu();
            });
          });
          break;

        case '2':
          try {
            const records = await db.listRecords();
            if (records.length === 0) console.log('No records found.');
            else records.forEach(r => console.log(`ID: ${r.id} | Name: ${r.name} | Value: ${r.value}`));
          } catch (error) {
            console.log(`❌ Error: ${error.message}`);
          }
          menu();
          break;

        case '3':
          rl.question('Enter record ID to update: ', (id) => {
            rl.question('New name: ', (name) => {
              rl.question('New value: ', async (value) => {
                try {
                  const updated = await db.updateRecord(id, name, value);
                  console.log(updated ? '✅ Record updated!' : '❌ Record not found.');
                } catch (error) {
                  console.log(`❌ Error: ${error.message}`);
                }
                menu();
              });
            });
          });
          break;

        case '4':
          rl.question('Enter record ID to delete: ', async (id) => {
            try {
              const deleted = await db.deleteRecord(id);
              console.log(deleted ? '🗑️ Record deleted!' : '❌ Record not found.');
            } catch (error) {
              console.log(`❌ Error: ${error.message}`);
            }
            menu();
          });
          break;

        case '5':
          rl.question('Enter search keyword: ', async (keyword) => {
            try {
              const matches = await db.searchRecords(keyword);
              if (matches.length === 0) {
                console.log('No records found.');
              } else {
                console.log(`\nFound ${matches.length} matching record${matches.length > 1 ? 's' : ''}:`);
                matches.forEach((record, index) => {
                  const createdDate = record.created || 'N/A';
                  console.log(`${index + 1}. ID: ${record.id} | Name: ${record.name} | Created: ${createdDate}`);
                });
              }
            } catch (error) {
              console.log(`❌ Error: ${error.message}`);
            }
            menu();
          });
          break;

        case '6':
          rl.question('Choose field to sort by: ', (sortField) => {
            rl.question('Choose order: ', async (sortOrder) => {
              try {
                const sortedRecords = await db.sortRecords(sortField, sortOrder);
                if (sortedRecords.length === 0) {
                  console.log('No records found.');
                } else {
                  console.log('\nSorted Records:');
                  sortedRecords.forEach((record, index) => {
                    console.log(`${index + 1}. ID: ${record.id} | Name: ${record.name}`);
                  });
                }
              } catch (error) {
                console.log(`❌ Error: ${error.message}`);
              }
              menu();
            });
          });
          break;

        case '7':
          try {
            const exportResult = await db.exportData();
            if (exportResult.success) {
              console.log('✅ Data exported successfully to export.txt');
            } else {
              console.log(`❌ Error exporting data: ${exportResult.error}`);
            }
          } catch (error) {
            console.log(`❌ Error: ${error.message}`);
          }
          menu();
          break;

        case '8':
          try {
            const stats = await db.getVaultStatistics();
            console.log('\nVault Statistics:');
            console.log('--------------------------');
            console.log(`Total Records: ${stats.totalRecords}`);
            console.log(`Last Modified: ${stats.lastModified}`);
            if (stats.longestName !== 'N/A') {
              console.log(`Longest Name: ${stats.longestName} (${stats.longestNameLength} characters)`);
            } else {
              console.log(`Longest Name: ${stats.longestName}`);
            }
            console.log(`Earliest Record: ${stats.earliestDate}`);
            console.log(`Latest Record: ${stats.latestDate}`);
            console.log('--------------------------\n');
          } catch (error) {
            console.log(`❌ Error: ${error.message}`);
          }
          menu();
          break;

        case '9':
          console.log('👋 Exiting NodeVault...');
          const { disconnectDB } = require('./db/mongodb');
          await disconnectDB();
          rl.close();
          process.exit(0);
          break;

        default:
          console.log('Invalid option.');
          menu();
      }
    } catch (error) {
      console.log(`❌ Unexpected error: ${error.message}`);
      menu();
    }
  });
}

// Initialize MongoDB connection and start menu
(async () => {
  try {
    await connectDB();
    menu();
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    console.log('\nPlease check your MongoDB Atlas connection string in SCDProject25/db/mongodb.js');
    console.log('See MONGODB_ATLAS_SETUP.md for setup instructions.\n');
    process.exit(1);
  }
})();
