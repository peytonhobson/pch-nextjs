'use server'

import { sgMail } from '@@/utils/sendgrid'

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
        to: 'premiercarehomes@comcast.net',
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
