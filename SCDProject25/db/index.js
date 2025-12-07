const fs = require('fs');
const path = require('path');
const fileDB = require('./file');
const recordUtils = require('./record');
const vaultEvents = require('../events');

// Backup directory path (relative to project root)
const projectRoot = path.join(__dirname, '../..');
const backupsDir = path.join(projectRoot, 'backups');

// Ensure backups directory exists
if (!fs.existsSync(backupsDir)) {
  fs.mkdirSync(backupsDir, { recursive: true });
}

function createBackup() {
  try {
    const data = fileDB.readDB();
    
    // Generate backup filename with date and time
    // Format: backup_2025-11-04_15-22-10.json (or with milliseconds if needed)
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    
    // Include milliseconds to ensure uniqueness
    const backupFileName = `backup_${year}-${month}-${day}_${hours}-${minutes}-${seconds}-${milliseconds}.json`;
    const backupFilePath = path.join(backupsDir, backupFileName);
    
    // Write the backup file with the current vault state
    fs.writeFileSync(backupFilePath, JSON.stringify(data, null, 2), 'utf8');
    
    return { success: true, filePath: backupFilePath, fileName: backupFileName };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function addRecord({ name, value }) {
  recordUtils.validateRecord({ name, value });
  const data = fileDB.readDB();
  const newRecord = { 
    id: recordUtils.generateId(), 
    name, 
    value,
    created: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
  };
  data.push(newRecord);
  fileDB.writeDB(data);
  
  // Create automatic backup
  const backupResult = createBackup();
  if (backupResult.success) {
    console.log(`💾 Backup created: ${backupResult.fileName}`);
  } else {
    console.log(`⚠️  Backup failed: ${backupResult.error}`);
  }
  
  vaultEvents.emit('recordAdded', newRecord);
  return newRecord;
}

function listRecords() {
  return fileDB.readDB();
}

function updateRecord(id, newName, newValue) {
  const data = fileDB.readDB();
  const record = data.find(r => r.id === id);
  if (!record) return null;
  record.name = newName;
  record.value = newValue;
  fileDB.writeDB(data);
  vaultEvents.emit('recordUpdated', record);
  return record;
}

function deleteRecord(id) {
  let data = fileDB.readDB();
  const record = data.find(r => r.id === id);
  if (!record) return null;
  data = data.filter(r => r.id !== id);
  fileDB.writeDB(data);
  
  // Create automatic backup
  const backupResult = createBackup();
  if (backupResult.success) {
    console.log(`💾 Backup created: ${backupResult.fileName}`);
  } else {
    console.log(`⚠️  Backup failed: ${backupResult.error}`);
  }
  
  vaultEvents.emit('recordDeleted', record);
  return record;
}

function searchRecords(searchTerm) {
  const data = fileDB.readDB();
  if (!searchTerm || searchTerm.trim() === '') {
    return [];
  }
  
  const term = searchTerm.trim().toLowerCase();
  
  // Search by name (case-insensitive) or ID (convert to string for comparison)
  const matches = data.filter(record => {
    const nameMatch = record.name.toLowerCase().includes(term);
    const idMatch = String(record.id).includes(term);
    return nameMatch || idMatch;
  });
  
  return matches;
}

function sortRecords(sortField, sortOrder) {
  const data = fileDB.readDB();
  
  // Create a copy of the array to avoid modifying the original
  const sortedData = [...data];
  
  // Sort based on the field
  sortedData.sort((a, b) => {
    let comparison = 0;
    
    if (sortField.toLowerCase() === 'name') {
      // Sort by name (case-insensitive)
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) comparison = -1;
      else if (nameA > nameB) comparison = 1;
    } else if (sortField.toLowerCase() === 'creation date' || sortField.toLowerCase() === 'date' || sortField.toLowerCase() === 'created') {
      // Sort by creation date
      const dateA = a.created || '';
      const dateB = b.created || '';
      if (dateA < dateB) comparison = -1;
      else if (dateA > dateB) comparison = 1;
    }
    
    // Apply sort order (ascending or descending)
    return sortOrder.toLowerCase() === 'descending' || sortOrder.toLowerCase() === 'desc' 
      ? -comparison 
      : comparison;
  });
  
  return sortedData;
}

function exportData() {
  const data = fileDB.readDB();
  const projectRoot = path.join(__dirname, '../..');
  const exportFile = path.join(projectRoot, 'export.txt');
  
  // Get current date and time
  const now = new Date();
  const exportDate = now.toLocaleDateString();
  const exportTime = now.toLocaleTimeString();
  const totalRecords = data.length;
  const fileName = 'export.txt';
  
  // Build the export content
  let content = '';
  
  // Header section
  content += '='.repeat(60) + '\n';
  content += '                    VAULT DATA EXPORT\n';
  content += '='.repeat(60) + '\n';
  content += `Export Date: ${exportDate}\n`;
  content += `Export Time: ${exportTime}\n`;
  content += `Total Records: ${totalRecords}\n`;
  content += `File Name: ${fileName}\n`;
  content += '='.repeat(60) + '\n\n';
  
  // Records section
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
  
  // Footer
  content += '\n' + '='.repeat(60) + '\n';
  content += `End of Export - ${totalRecords} record${totalRecords !== 1 ? 's' : ''} exported\n`;
  content += '='.repeat(60) + '\n';
  
  try {
    fs.writeFileSync(exportFile, content, 'utf8');
    return { success: true, filePath: exportFile };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function getVaultStatistics() {
  const data = fileDB.readDB();
  const dataDir = path.join(__dirname, '..', 'data');
  const dbFile = path.join(dataDir, 'vault.json');
  
  // Get file modification time
  let lastModified = 'N/A';
  try {
    const stats = fs.statSync(dbFile);
    const modDate = new Date(stats.mtime);
    const year = modDate.getFullYear();
    const month = String(modDate.getMonth() + 1).padStart(2, '0');
    const day = String(modDate.getDate()).padStart(2, '0');
    const hours = String(modDate.getHours()).padStart(2, '0');
    const minutes = String(modDate.getMinutes()).padStart(2, '0');
    const seconds = String(modDate.getSeconds()).padStart(2, '0');
    lastModified = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  } catch (error) {
    // File doesn't exist or can't be read
  }
  
  // Calculate statistics
  const totalRecords = data.length;
  
  // Find longest name
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
  
  // Find earliest and latest creation dates
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
}

module.exports = { addRecord, listRecords, updateRecord, deleteRecord, searchRecords, sortRecords, exportData, createBackup, getVaultStatistics };
