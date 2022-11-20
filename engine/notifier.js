const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const sendNotificaitons = (config, assignments) => {

    const smtpOptions = {
        from: config.smtpConfig.sender,
        subject: config.smtpConfig.subject
    };

    const transporter = nodemailer.createTransport(
        nodemailerSendgrid({
             apiKey: config.smtpConfig.auth.sendgridKey
          })
        ); 

    const sendMessage = (name, address, assignedPerson) => {
        const mailOptions = {
            ...smtpOptions,
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
        subject: 'Wyniki - kopia'
    };
    const transporter = nodemailer.createTransport(
        nodemailerSendgrid({
             apiKey: config.smtpConfig.auth.sendgridKey
          })
        );

    const results = encode
        ? Buffer.from(JSON.stringify(assignments)).toString('base64')
        : JSON.stringify(assignments);

    const mailOptions = {
        ...smtpOptions,
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
