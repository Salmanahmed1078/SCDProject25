const fileDB = require('./file');
const recordUtils = require('./record');
const vaultEvents = require('../events');

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

module.exports = { addRecord, listRecords, updateRecord, deleteRecord, searchRecords, sortRecords };
