const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
const remoteUrl = 'https://github.com/georgiougt/Diamantides.git';

function run(cmd, cwd = distPath) {
    console.log(`Running: ${cmd}`);
    try {
        const result = execSync(cmd, { cwd, stdio: 'inherit' });
        return result;
    } catch (error) {
        console.error(`Error executing ${cmd}:`, error.message);
        throw error;
    }
}

async function deploy() {
    if (!fs.existsSync(distPath)) {
        console.error('Dist directory does not exist. Run npm run build first.');
        process.exit(1);
    }

    // Clean up any existing git repo in dist
    const gitPath = path.join(distPath, '.git');
    if (fs.existsSync(gitPath)) {
        console.log('Cleaning up existing .git in dist...');
        fs.rmSync(gitPath, { recursive: true, force: true });
    }

    console.log('--- Starting Manual Deployment ---');
    run('git init');
    run(`git remote add origin ${remoteUrl}`);
    run('git checkout -b gh-pages');
    run('git add .');
    run('git commit -m "Manual deployment to GitHub Pages"');
    run('git push origin gh-pages --force');
    console.log('--- Deployment Successful ---');
}

deploy().catch(err => {
    console.error('Deployment failed:', err);
    process.exit(1);
});
