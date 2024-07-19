const { exec } = require('child_process');
const readline = require('node:readline');

async function executeCommand(command) {

  try {
    exec(command, (error, stdout, stderr) => {
      if (error) return console.log(`Error: ${error.message}`);
      if (stderr) return console.log(`Stderr: ${stderr}`);

      console.log(`stdout: ${stdout}`);
    });

  } catch (error) {
    console.log(`Failed to execute ${command}. Error: ${error}`);
  };
};

async function setCommitMessage() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(`Write commit message`, message => {
    commitMessage = message;
    rl.close();
  });
};

async function runGitCommands() {

  try {
    await executeCommand('git add .');

    await setCommitMessage();

    await executeCommand(`git commit -m "${commitMessage}"`);

    await executeCommand('git push origin main');

  } catch (error) {
    console.error(error);
  };
};

let commitMessage = undefined;

runGitCommands();