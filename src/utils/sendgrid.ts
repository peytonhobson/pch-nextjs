import sgMail from '@sendgrid/mail'

// Initialize SendGrid once
let isInitialized = false

export function initializeSendGrid(): void {
  if (!isInitialized && process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    isInitialized = true
  }
}

// Initialize on import
initializeSendGrid()

// Re-export sgMail for use in other files
export { sgMail }
