const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config();

// Initialize the API client with your Sendinblue API key
const apiKey = process.env.API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Set the API key
apiInstance.apiClient.authentications['api-key'].apiKey = apiKey;

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Generate a password reset link (this example assumes you have a function for that)
  const resetLink = `http://yourdomain.com/reset-password?token=GENERATED_TOKEN`;

  const sender = {
    email: 'your-email@example.com', // Replace with your sender email
  };

  const receiver = [
    {
      email: email,
    },
  ];

  const emailOptions = {
    sender: sender,
    to: receiver,
    subject: 'Password Reset Request',
    htmlContent: `<p>Click the link below to reset your password:</p>
                  <p><a href="${resetLink}">${resetLink}</a></p>`,
  };

  try {
    await apiInstance.sendTransacEmail(emailOptions);
    res.status(200).send('Password reset email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending password reset email');
  }
};
