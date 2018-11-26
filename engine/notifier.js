const nodemailer = require('nodemailer');

const sendNotificaitons = (config, assignments) => {
    const defaults = {
        from: '"Automat Prezentowy" <automat-prezentowy@wp.pl>',
        subject: 'Wyniki losowania prezentowego',
    };

    const transporter = nodemailer.createTransport(config.smtpConfig, defaults);    

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

module.exports = { sendNotificaitons };
