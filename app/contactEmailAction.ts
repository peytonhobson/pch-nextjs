'use server'

import sgMail from '@sendgrid/mail'

// Set SendGrid API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

// Create server action in nextjs to send email
export async function contactEmailAction({
  name: senderName,
  email,
  subject
}: {
  name: string
  email: string
  subject: string
}) {
  const msg = {
    templateId: 'd-16180d1ed06a4f578e60b245cbeb5d02',
    from: 'peyton.hobson1@gmail.com',
    personalizations: [
      {
        // TODO: Put as 'premiercarehomes@comcast.net'
        to: 'peyton.hobson1@gmail.com',
        dynamic_template_data: {
          name: senderName,
          email: email,
          message: subject
        }
      }
    ]
  }

  try {
    await sgMail.send(msg)

    return true
  } catch (error) {
    console.log(error)

    return false
  }
}
