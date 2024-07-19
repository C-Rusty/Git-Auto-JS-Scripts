const { exec } = require('child_process');

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

async function runGitCommands(repUrl) {

  try {
    await executeCommand(`git clone ${repUrl}`)

  } catch (error) {
    console.error(error);
  };
};

const repUrls = [
    ``
];

runGitCommands();