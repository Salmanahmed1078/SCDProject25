const readline = require('readline');
const db = require('./db');
require('./events/logger'); // Initialize event logger

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log(`
===== NodeVault =====
1. Add Record
2. List Records
3. Update Record
4. Delete Record
5. Search Records
6. Exit
=====================
  `);

  rl.question('Choose option: ', ans => {
    switch (ans.trim()) {
      case '1':
        rl.question('Enter name: ', name => {
          rl.question('Enter value: ', value => {
            db.addRecord({ name, value });
            console.log('✅ Record added successfully!');
            menu();
          });
        });
        break;

      case '2':
        const records = db.listRecords();
        if (records.length === 0) console.log('No records found.');
        else records.forEach(r => console.log(`ID: ${r.id} | Name: ${r.name} | Value: ${r.value}`));
        menu();
        break;

      case '3':
        rl.question('Enter record ID to update: ', id => {
          rl.question('New name: ', name => {
            rl.question('New value: ', value => {
              const updated = db.updateRecord(Number(id), name, value);
              console.log(updated ? '✅ Record updated!' : '❌ Record not found.');
              menu();
            });
          });
        });
        break;

      case '4':
        rl.question('Enter record ID to delete: ', id => {
          const deleted = db.deleteRecord(Number(id));
          console.log(deleted ? '🗑️ Record deleted!' : '❌ Record not found.');
          menu();
        });
        break;

      case '5':
        rl.question('Enter search keyword: ', keyword => {
          const matches = db.searchRecords(keyword);
          if (matches.length === 0) {
            console.log('No records found.');
          } else {
            console.log(`\nFound ${matches.length} matching record${matches.length > 1 ? 's' : ''}:`);
            matches.forEach((record, index) => {
              const createdDate = record.created || 'N/A';
              console.log(`${index + 1}. ID: ${record.id} | Name: ${record.name} | Created: ${createdDate}`);
            });
          }
          menu();
        });
        break;

      case '6':
        console.log('👋 Exiting NodeVault...');
        rl.close();
        break;

      default:
        console.log('Invalid option.');
        menu();
    }
  });
}

menu();
