const nodemailer = require('nodemailer');

async function testMail() {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '3fd9613365394a',
      pass: '3b1a65e0a30b29',
    },
  });

  await transporter.sendMail({
    from: '"Test" <adeoyemayopoelijah.com>',
    to: 'adeoyemayopoelijah2@email.com',
    subject: 'Hello',
    text: 'Test mail',
  });

  console.log('Email sent!');
}

testMail().catch(console.error);
