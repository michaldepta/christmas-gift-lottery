const path = require('path')

if (process.argv.length < 3) {
    console.error('Please specify the config file!')
} else {
    const { randomizeAssignments } = require('./engine/randomizer');
    const { sendNotificaitons, sendResults } = require('./engine/notifier');
    const config = require(path.resolve(process.argv[2]));
    const result = randomizeAssignments(config);

    sendResults(config, result, true).then(
        () => sendNotificaitons(config, result)
        //() => console.log(result)
    );
}
