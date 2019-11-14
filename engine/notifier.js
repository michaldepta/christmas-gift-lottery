const nodemailer = require('nodemailer');

const sendNotificaitons = (config, assignments) => {

    const smtpOptions = {
        from: config.smtpConfig.sender,
        subject: config.smtpConfig.subject
    };
    const transporter = nodemailer.createTransport(config.smtpConfig, smtpOptions);    

    const sendMessage = (name, address, assignedPerson) => {
        const mailOptions = {
            to: address,
            text: `Cześć ${name}! Osoba, której sprawiasz prezent pod choinkę to: ${assignedPerson}. Wesołych Świąt!`
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    };

    return Promise.all(config.participants.map(person =>
        sendMessage(
            person.name, 
            person.contact, 
            assignments.find(assignment => assignment.from === person.name).to)));
};

const sendResults = (config, assignments, encode) => {
    const smtpOptions = {
        from: config.smtpConfig.sender,
        subject: 'Wyniki'
    };
    const transporter = nodemailer.createTransport(config.smtpConfig, smtpOptions);   

    const results = encode
        ? Buffer.from(JSON.stringify(assignments)).toString('base64')
        : JSON.stringify(assignments);

    const mailOptions = {
        to: config.adminMail,
        text: `Wyniki losowania: \n ${results}`
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
    })
}

module.exports = { sendNotificaitons, sendResults };
