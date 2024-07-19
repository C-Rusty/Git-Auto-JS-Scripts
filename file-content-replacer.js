const fs = require(`fs`);
const path = require(`path`);

const projectsRootDir = path.resolve('./');
const newFileNameFieldValue = `main.js`;

const updateProjectWebpackConfig = (filepath, newFileNameFieldValue) => {

    if (fs.existsSync(filepath)) {
        fs.readFile(filepath, 'utf8', (err, file) => {

            if (err) return console.log(`Error reading file ${filepath}: `, err);

            const updatedField = file.replace(/(new\s+container\.ModuleFederationPlugin\s*\(\s*\{\s*[^\}]*filename:\s*)['"`][^'"`]+['"`]/, `$1'${newFileNameFieldValue}'`);

            fs.writeFile(filepath, updatedField, err => {
                if (err) {
                    console.log(`Error writing file ${filepath}: `, err);
                } else {
                    console.log(`Updated filename in ${filepath}`);
                };
            });
        });
    } else {
        console.log(`No webpack.base.config.js file found at ${filepath}`);
    };
};

const updateFilesInAllProjects = (projectsRootDir, newFileNameFieldValue) => {

    fs.readdir(projectsRootDir, {withFileTypes: true}, (err, projectsFolders) => {
       
        if (err) return console.log(`Error reading directory ${projectsRootDir}: `, err);

        projectsFolders.forEach(projectFolder => {
            const fullProjectPath = path.join(projectsRootDir, projectFolder.name);

            if (projectFolder.isDirectory()) {
                const webpackConfigPath = path.join(fullProjectPath, 'build', 'webpack.base.config.js');
                updateProjectWebpackConfig(webpackConfigPath, newFileNameFieldValue);
            };
        });
    });
};

updateFilesInAllProjects(projectsRootDir, newFileNameFieldValue);