const { exec } = require('child_process');

// MongoDB connection details
const host = 'mongo';
const port = '27017';
const dbName = 'brilliantwear';

// Get the current date in a format like "2022-12-01"
const currentDate = new Date().toISOString().split('T')[0];

// Output archive file
const backupFile = `/app/dump/dump_${currentDate}.gz`;

// Auth
const user = 'philip';
const passwordFile = '/run/secrets/mongo-root-pw';

// Create the mongodump command
const mongodumpCommand = `mongodump --host=${host} --port=${port} --db=${dbName} --archive=${backupFile} --gzip --authenticationDatabase=admin -u=${user} < ${passwordFile}`;

// Execute the mongodump command
exec(mongodumpCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error during backup: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Backup stderr: ${stderr}`);
    return;
  }

  console.log(`Backup completed. Output: ${stdout}`);
});
