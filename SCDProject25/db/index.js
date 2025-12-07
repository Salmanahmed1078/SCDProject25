const fs = require('fs');
const path = require('path');
const { connectDB } = require('./mongodb');
const Record = require('./models/Record');
const recordUtils = require('./record');
const vaultEvents = require('../events');

// Backup directory path (relative to project root)
const projectRoot = path.join(__dirname, '../..');
const backupsDir = path.join(projectRoot, 'backups');

// Ensure backups directory exists
if (!fs.existsSync(backupsDir)) {
  fs.mkdirSync(backupsDir, { recursive: true });
}

// Helper function to convert MongoDB document to plain object with id
function toPlainObject(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    id: obj._id.toString(),
    name: obj.name,
    value: obj.value,
    created: obj.created || obj.createdAt ? (obj.created || obj.createdAt.toISOString().split('T')[0]) : new Date().toISOString().split('T')[0]
  };
}

async function createBackup() {
  try {
    await connectDB();
    const records = await Record.find({});
    const data = records.map(toPlainObject);
    
    // Generate backup filename with date and time
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    
    const backupFileName = `backup_${year}-${month}-${day}_${hours}-${minutes}-${seconds}-${milliseconds}.json`;
    const backupFilePath = path.join(backupsDir, backupFileName);
    
    fs.writeFileSync(backupFilePath, JSON.stringify(data, null, 2), 'utf8');
    
    return { success: true, filePath: backupFilePath, fileName: backupFileName };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function addRecord({ name, value }) {
  try {
    await connectDB();
    recordUtils.validateRecord({ name, value });
    
    const newRecord = new Record({
      name,
      value,
      created: new Date().toISOString().split('T')[0]
    });
    
    const savedRecord = await newRecord.save();
    const recordObj = toPlainObject(savedRecord);
    
    // Create automatic backup
    const backupResult = await createBackup();
    if (backupResult.success) {
      console.log(`💾 Backup created: ${backupResult.fileName}`);
    } else {
      console.log(`⚠️  Backup failed: ${backupResult.error}`);
    }
    
    vaultEvents.emit('recordAdded', recordObj);
    return recordObj;
  } catch (error) {
    throw new Error(`Failed to add record: ${error.message}`);
  }
}

async function listRecords() {
  try {
    await connectDB();
    const records = await Record.find({});
    return records.map(toPlainObject);
  } catch (error) {
    throw new Error(`Failed to list records: ${error.message}`);
  }
}

async function updateRecord(id, newName, newValue) {
  try {
    await connectDB();
    const record = await Record.findById(id);
    if (!record) return null;
    
    record.name = newName;
    record.value = newValue;
    const updatedRecord = await record.save();
    
    vaultEvents.emit('recordUpdated', toPlainObject(updatedRecord));
    return toPlainObject(updatedRecord);
  } catch (error) {
    throw new Error(`Failed to update record: ${error.message}`);
  }
}

async function deleteRecord(id) {
  try {
    await connectDB();
    const record = await Record.findById(id);
    if (!record) return null;
    
    const recordObj = toPlainObject(record);
    await Record.findByIdAndDelete(id);
    
    // Create automatic backup
    const backupResult = await createBackup();
    if (backupResult.success) {
      console.log(`💾 Backup created: ${backupResult.fileName}`);
    } else {
      console.log(`⚠️  Backup failed: ${backupResult.error}`);
    }
    
    vaultEvents.emit('recordDeleted', recordObj);
    return recordObj;
  } catch (error) {
    throw new Error(`Failed to delete record: ${error.message}`);
  }
}

async function searchRecords(searchTerm) {
  try {
    await connectDB();
    if (!searchTerm || searchTerm.trim() === '') {
      return [];
    }
    
    const term = searchTerm.trim();
    
    // Search by name (case-insensitive) or ID
    const records = await Record.find({
      $or: [
        { name: { $regex: term, $options: 'i' } },
        { _id: term }
      ]
    });
    
    return records.map(toPlainObject);
  } catch (error) {
    throw new Error(`Failed to search records: ${error.message}`);
  }
}

async function sortRecords(sortField, sortOrder) {
  try {
    await connectDB();
    let sortObj = {};
    
    if (sortField.toLowerCase() === 'name') {
      sortObj = { name: sortOrder.toLowerCase() === 'descending' || sortOrder.toLowerCase() === 'desc' ? -1 : 1 };
    } else if (sortField.toLowerCase() === 'creation date' || sortField.toLowerCase() === 'date' || sortField.toLowerCase() === 'created') {
      sortObj = { created: sortOrder.toLowerCase() === 'descending' || sortOrder.toLowerCase() === 'desc' ? -1 : 1 };
    }
    
    const records = await Record.find({}).sort(sortObj);
    return records.map(toPlainObject);
  } catch (error) {
    throw new Error(`Failed to sort records: ${error.message}`);
  }
}

async function exportData() {
  try {
    await connectDB();
    const records = await Record.find({});
    const data = records.map(toPlainObject);
    const projectRoot = path.join(__dirname, '../..');
    const exportFile = path.join(projectRoot, 'export.txt');
    
    const now = new Date();
    const exportDate = now.toLocaleDateString();
    const exportTime = now.toLocaleTimeString();
    const totalRecords = data.length;
    const fileName = 'export.txt';
    
    let content = '';
    content += '='.repeat(60) + '\n';
    content += '                    VAULT DATA EXPORT\n';
    content += '='.repeat(60) + '\n';
    content += `Export Date: ${exportDate}\n`;
    content += `Export Time: ${exportTime}\n`;
    content += `Total Records: ${totalRecords}\n`;
    content += `File Name: ${fileName}\n`;
    content += '='.repeat(60) + '\n\n';
    
    if (totalRecords === 0) {
      content += 'No records found in the vault.\n';
    } else {
      content += 'RECORDS:\n';
      content += '-'.repeat(60) + '\n';
      data.forEach((record, index) => {
        content += `\nRecord ${index + 1}:\n`;
        content += `  ID: ${record.id}\n`;
        content += `  Name: ${record.name}\n`;
        content += `  Value: ${record.value}\n`;
        if (record.created) {
          content += `  Created: ${record.created}\n`;
        }
        content += '-'.repeat(60) + '\n';
      });
    }
    
    content += '\n' + '='.repeat(60) + '\n';
    content += `End of Export - ${totalRecords} record${totalRecords !== 1 ? 's' : ''} exported\n`;
    content += '='.repeat(60) + '\n';
    
    fs.writeFileSync(exportFile, content, 'utf8');
    return { success: true, filePath: exportFile };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getVaultStatistics() {
  try {
    await connectDB();
    const records = await Record.find({});
    const data = records.map(toPlainObject);
    
    // Get most recent update time from MongoDB
    let lastModified = 'N/A';
    if (records.length > 0) {
      const mostRecent = await Record.findOne().sort({ updatedAt: -1 });
      if (mostRecent && mostRecent.updatedAt) {
        const modDate = new Date(mostRecent.updatedAt);
        const year = modDate.getFullYear();
        const month = String(modDate.getMonth() + 1).padStart(2, '0');
        const day = String(modDate.getDate()).padStart(2, '0');
        const hours = String(modDate.getHours()).padStart(2, '0');
        const minutes = String(modDate.getMinutes()).padStart(2, '0');
        const seconds = String(modDate.getSeconds()).padStart(2, '0');
        lastModified = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
    }
    
    const totalRecords = data.length;
    
    let longestName = null;
    let longestNameLength = 0;
    if (totalRecords > 0) {
      data.forEach(record => {
        if (record.name && record.name.length > longestNameLength) {
          longestName = record.name;
          longestNameLength = record.name.length;
        }
      });
    }
    
    let earliestDate = null;
    let latestDate = null;
    if (totalRecords > 0) {
      const dates = data
        .map(record => record.created)
        .filter(date => date != null && date !== '');
      
      if (dates.length > 0) {
        dates.sort();
        earliestDate = dates[0];
        latestDate = dates[dates.length - 1];
      }
    }
    
    return {
      totalRecords,
      lastModified,
      longestName: longestName || 'N/A',
      longestNameLength,
      earliestDate: earliestDate || 'N/A',
      latestDate: latestDate || 'N/A'
    };
  } catch (error) {
    throw new Error(`Failed to get statistics: ${error.message}`);
  }
}

module.exports = { addRecord, listRecords, updateRecord, deleteRecord, searchRecords, sortRecords, exportData, createBackup, getVaultStatistics };
