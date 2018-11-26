const { randInt, shuffle } = require('./utils');

const randomizeAssignments = config => {
    const participants = config.participants.map(p => p.name);

    const randomize = (people, invalidGroups) => {
        const initialResult = {
            correct: true,
            assignments: [],
            remainingParticipants: [...people]
        };

        return people.reduce((acc, person) => {
            if (!acc.correct) {
                return acc;
            }

            const invalidAssignments = new Set(
                [person].concat(
                    invalidGroups.filter(group => group.includes(person))
                        .reduce((acc, v) => acc.concat(v), [])));

            const validAssignments = acc.remainingParticipants.filter(p => !invalidAssignments.has(p));
            if (validAssignments.length === 0) {
                return {
                    correct: false
                };
            }

            const assignment = validAssignments[randInt(0, validAssignments.length - 1)];

            return {
                ...acc,
                assignments: [...acc.assignments, {
                    from: person,
                    to: assignment
                }],
                remainingParticipants: acc.remainingParticipants.filter(p => p !== assignment)
            };

        }, initialResult);
    };

    let iteration = 1;
    while (true) {
        const candidate = randomize(shuffle(participants), config.forbiddenGroups);

        if (candidate.correct) {
            console.log('Found result after ' + iteration + ' iterations.')
            return candidate.assignments;
        }

        iteration++;
    }
};

module.exports = { randomizeAssignments };
