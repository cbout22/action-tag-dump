const git = require('simple-git');

async function getLastTag() {
    const gitLog = await git().tags();
    return gitLog.latest;
}

async function getCommitsSinceLastTag(lastTag) {
    return await git().log({ from: lastTag });
}

function determineBumpType(commits) {
    let bump = "patch";
    for (let commit of commits.all) {
        if (commit.message.includes('BREAKING-CHANGE') || commit.message.includes('!')) {
            return "major";
        }
        if (commit.message.startsWith('feat')) {
            bump = "minor";
        }
    }
    return bump;
}

function incrementVersion(version, bump) {
    const [major, minor, patch] = version.split('.').map(Number);
    switch (bump) {
        case 'major':
            return `${major + 1}.0.0`;
        case 'minor':
            return `${major}.${minor + 1}.0`;
        default:
            return `${major}.${minor}.${patch + 1}`;
    }
}

async function main() {
    const lastTag = await getLastTag();
    const commits = await getCommitsSinceLastTag(lastTag);
    const bump = determineBumpType(commits);
    const newVersion = incrementVersion(lastTag, bump);
    console.log(`Bumping from ${lastTag} to ${newVersion}`);
}

main();
