
const fs = require('fs').promises;
const { exec } = require('child_process');
const args = require('yargs').argv;

if (!args.stage) {
    args.stage = 'dev';
}

if (!['dev', 'prod'].includes(args.stage)) {
    throw Error(`Invalid stage ${args.stage}`);
}

const directory = `${args.name}-${args.stage}`;


const run = (cmd) => new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            reject(error.message);
            return;
        }
        if (stderr) {
            console.log(stderr);
            resolve(stderr);
            return;
        }
        resolve(stdout);
    });
});

(async () => {

    // Build
    const index = [
        await fs.readFile('dscc.min.js'),
        await fs.readFile(`${args.name}/src/index.js`)
    ];

    await fs.writeFile(`${args.name}/dist/index.js`, index.join('\n'));

    let manifest = await fs.readFile(`${args.name}/src/manifest.json`, 'utf-8');
    const regex = new RegExp(`${args.name}-dev`, 'g');
    manifest = manifest.replace(regex, `${args.name}-${args.stage}`);
    await fs.writeFile(`${args.name}/dist/manifest.json`, manifest);

    await fs.copyFile(
        `${args.name}/src/index.css`,
        `${args.name}/dist/index.css`
    );
    await fs.copyFile(
        `${args.name}/src/index.json`,
        `${args.name}/dist/index.json`
    );

    // Upload
    const files = [
        'manifest.json',
        'index.js',
        'index.json',
        'index.css'
    ];
    for (let file of files) {
        await run(
            `gsutil cp -a public-read ${args.name}/dist/${file} gs://highcharts-data-studio-visualizations/${directory}/${file}`
        ).catch(e => console.log(e));
    }
})();

