const fs = require(`fs`);
const path = require(`path`);
const { exec } = require('child_process');

const projectsRootDir = path.resolve('./');

const updateFilesInAllProjects = (projectsRootDir) => {

    fs.readdir(projectsRootDir, {withFileTypes: true}, (err, projectsFolders) => {
       
        if (err) return console.log(`Error reading directory ${projectsRootDir}: `, err);

        projectsFolders.forEach(projectFolder => {

            if (projectFolder.isDirectory()) {
                fs.opendir(path.join(projectsRootDir, projectFolder.name), {encoding: 'utf8'}, (err, dir) => {
                    if (err) return console.log(`Error reading directory ${path.join(projectsRootDir, projectFolder.name)}: `, err);
                    console.log(dir.name);
                    runGitCommands();
                });
            };
        });
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

async function runGitCommands() {

  try {
    await executeCommand('git add .');

    await executeCommand(`git commit -m "bundle script name changed"`);

    await executeCommand('git push origin main');

  } catch (error) {
    console.error(error);
  };
};


updateFilesInAllProjects(projectsRootDir);