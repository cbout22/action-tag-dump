const core = require('@actions/core');

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
