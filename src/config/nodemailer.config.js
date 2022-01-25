// // async..await is not allowed in global scope, must use a wrapper
// // Generate test SMTP service account from ethereal.email
// // Only needed if you don't have a real mail account for testing
// const nodemailerConfig = async () => {
// //   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false,
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });
//   return { testAccount, transporter };
// };

// const result = {};
// nodemailerConfig()
//   .then((data) => {
//     result.testAccount = data.testAccount;
//     result.transporter = data.transporter;
//   })
//   .catch(console.error);
// module.exports = result;

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "investorkenwilliams@gmail.com",
    pass: "Leo@1234", // generated ethereal password
  },
});

module.exports = transporter;
