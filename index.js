if (process.argv.length < 3) {
    console.error('Please specify the config file!')
} else {
    const { randomizeAssignments } = require('./engine/randomizer');
    const { sendNotificaitons } = require('./engine/notifier');
    const config = require(process.argv[2]);
    const result = randomizeAssignments(config);

    sendNotificaitons(config, result);

    console.log(result);
}
