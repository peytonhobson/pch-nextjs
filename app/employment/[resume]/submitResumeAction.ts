'use server'

import { sgMail } from '@@/utils/sendgrid'

export async function submitResumeAction({
  name: senderName,
  email,
  phoneNumber,
  file
}: {
  name: string
  email: string
  phoneNumber: string
  file: string
}) {
  const msg = {
    templateId: 'd-a6dae8b1eb7e4dd69156c0861c9cf6a4',
    from: 'peyton.hobson1@gmail.com',
    attachments: [
      {
        filename: 'Resume.pdf',
        content: file,
        type: 'application/pdf',
        disposition: 'attachment'
      }
    ],
    personalizations: [
      {
        to: 'premiercarehomes@comcast.net',
        dynamic_template_data: {
          name: senderName,
          email: email,
          phoneNumber: phoneNumber
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
