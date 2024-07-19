const { exec } = require('child_process');

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

  // return new Promise((resolve, reject) => {
  //   exec(command, (error, stdout, stderr) => {
  //     if (error) {
  //       reject(`Error: ${error.message}`);
  //     }
  //     if (stderr) {
  //       reject(`Stderr: ${stderr}`);
  //     }
  //     resolve(stdout);
  //   });
  // });
};

async function runGitCommands() {

  try {
    await executeCommand('git add .');

    const commitMessage = 'change of code and gti push script';
    await executeCommand(`git commit -m "${commitMessage}"`);

    await executeCommand('git push origin main');

  } catch (error) {
    console.error(error);
  };
};

runGitCommands();