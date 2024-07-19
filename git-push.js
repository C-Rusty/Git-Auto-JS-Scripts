const { exec } = require('child_process');
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function setCommitMessageAndRunGitCommands() {

  rl.question(`Write commit message: `, inputValue => {
    const commitMessage = inputValue;
    runGitCommands(commitMessage);

    rl.close();
  });
};

async function executeCommand(command) {

  try {
    exec(command, (error, consoleResponse, consoleError) => {
      if (error) return console.log(`Error: ${error.message}`);
      if (consoleError) return console.log(`Console Error: ${consoleError}`);

      console.log(`Console response: ${consoleResponse}`);
    });

  } catch (error) {
    console.log(`Failed to execute ${command}. Error: ${error}`);
  };
};

async function runGitCommands(commitMessage) {

  try {
    if (commitMessage) {
      await executeCommand('git add .');

      await executeCommand(`git commit -m "${commitMessage}"`);

      await executeCommand('git push origin main');

    } else {
      console.log('Commit message not provided. Exiting...');
    };

  } catch (error) {
    console.error(error);
  };
};

setCommitMessageAndRunGitCommands();