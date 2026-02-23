# Contact Form Integration Guide

The contact form in `src/components/Contact.jsx` is currently set up as a frontend-only demonstration. To make it functional (send emails), you need to integrate a backend service.

## Option 1: Formspree (Recommended for Static Sites)

1.  Go to [formspree.io](https://formspree.io) and create a free account.
2.  Create a new form and copy the **Endpoint URL** (e.g., `https://formspree.io/f/xvnd...`).
3.  Open `src/components/Contact.jsx`.
4.  Update the `form` tag:

    ```jsx
    <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    ```

5.  Remove the `onSubmit` handler or update it to use fetch/axios if you want an AJAX submission (Formspree provides React examples).

## Option 2: EmailJS

1.  Go to [emailjs.com](https://www.emailjs.com/).
2.  Install the SDK: `npm install @emailjs/browser`.
3.  Follow their React documentation to send emails directly from the client side without a backend server.

## Option 3: Custom Backend

If you have a backend (Node, PHP, Python):

1.  Create an API endpoint (e.g., `/api/contact`).
2.  Update `handleSubmit` in `Contact.jsx` to `fetch()` your endpoint with the form data.

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (response.ok) alert('Message sent!');
  } catch (error) {
    console.error('Error:', error);
  }
};
```
