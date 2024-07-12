'use server'

import sgMail from '@sendgrid/mail'

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export async function shareWithFriendAction({
  yourName,
  yourEmail,
  friendsName,
  friendsEmail
}: {
  yourName: string
  yourEmail: string
  friendsName: string
  friendsEmail: string
}) {
  const msg = {
    templateId: 'd-c30d5d08f9324f1e80b143e6152ec2b6',
    from: 'peyton.hobson1@gmail.com',
    personalizations: [
      {
        to: 'premiercarehomes@comcast.net',
        dynamic_template_data: {
          submitterName: yourName,
          submitterEmail: yourEmail,
          friendName: friendsName,
          friendEmail: friendsEmail
        }
      }
    ]
  }

  try {
    await sgMail.send(msg)

    console.log('sent')

    return true
  } catch (error) {
    console.log(error)

    return false
  }
}
