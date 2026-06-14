# Recruiter Contact Setup

Configure these environment variables in Vercel for Production, Preview, and
Development:

- `NEXT_PUBLIC_CALENDLY_URL`: Full Calendly scheduling URL.
- `RESEND_API_KEY`: Server-only Resend API key.
- `CONTACT_TO_EMAIL`: Inbox that receives recruiter messages.
- `CONTACT_FROM_EMAIL`: Optional verified Resend sender, for example
  `Growth in Practice <hello@your-domain.com>`.

Without the Calendly URL, the scheduling CTA scrolls to the contact form.
Without the Resend variables, the form returns a configuration message instead
of attempting to send.
