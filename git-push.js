const { exec } = require('child_process');

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
      }
      if (stderr) {
        reject(`Stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

async function runGitCommands() {
  try {
    console.log('Running: git add .');
    await executeCommand('git add .');
    console.log('Changes staged.');

    const commitMessage = 'bundle script name changed';
    console.log(`Running: git commit -m "${commitMessage}"`);
    await executeCommand(`git commit -m "${commitMessage}"`);
    console.log('Changes committed.');

    console.log('Running: git push');
    await executeCommand('git push');
    console.log('Changes pushed.');
  } catch (error) {
    console.error(error);
  }
}

runGitCommands();
