const git = require('simple-git');
const core = require('@actions/core');

/**
 * Returns the latest Git tag.
 * If no tags are found, returns a default version number.
 * @returns {Promise<string>} The latest Git tag or a default version number.
 */
async function getLastTag() {
    const gitLog = await git().tags();
    const lastTag = gitLog.latest;
    if (!lastTag) {
        console.log('No tags found, using 0.0.0');
        return my_version_prefix + '0.0.0';
    }
    return gitLog.latest;
}

/**
 * Returns the commits made since the last tag.
 * @param {string} lastTag - The last tag version in semver format (e.g. '1.2.3').
 * @returns {Promise<Array>} - A promise that resolves to an array of commit objects.
 */
async function getCommitsSinceLastTag(lastTag) {
    if (lastTag === '0.0.0') {
        return await git().log();
    }
    return await git().log({ from: lastTag });
}

/**
 * Determines the type of bump based on the commits.
 * @param {Object} commits - An object containing all the commits.
 * @returns {string} - The type of bump (major, minor, or patch).
 */
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
    // const lastTag = await getLastTag();
    // const commits = await getCommitsSinceLastTag(lastTag);
    // const bump = determineBumpType(commits);
    // const newVersion = incrementVersion(lastTag, bump);
    // console.log(`Bumping from ${lastTag} to ${newVersion}`);
    // core.setOutput('dumped_version', newVersion);
    // core.setOutput('bump_type', bump);
    // core.setOutput('last_tag', lastTag);
    // return newVersion;
    inputs_names = ['GITHUB_TOKEN', 'TAG_PREFIX']
    inputs = {}
    for (let input_name of inputs_names) {
        inputs[input_name] = core.getInput(input_name);
    }
    console.log(inputs);
}

main();
