// Example serverless function for /api/subscribe
// - Netlify-style: exports.handler = async (event) => { ... }
// - Vercel: export default async function handler(req, res) { ... }
// Choose the style that matches your platform or adapt this snippet.
//
// This simple handler validates the email and returns a JSON response.
// To forward to a real provider (Mailchimp/ConvertKit/etc.) add provider client code
// and environment variables (examples commented below).

// Netlify function style:
exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid JSON" }),
    };
  }

  const email = (body.email || "").toString().trim().toLowerCase();
  const simpleEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!simpleEmail.test(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Please provide a valid email address." }),
    };
  }

  // Example: If you want to forward to Mailchimp, set environment variables:
  // MAILCHIMP_API_KEY and MAILCHIMP_LIST_ID (audience id).
  // Uncomment and replace the code below with your Mailchimp call.
  //
  // const fetch = require("node-fetch");
  // const API_KEY = process.env.MAILCHIMP_API_KEY;
  // const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  // if (API_KEY && LIST_ID) {
  //   const dc = API_KEY.split("-")[1]; // datacenter suffix
  //   const url = `https://${dc}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;
  //   const payload = {
  //     email_address: email,
  //     status: "subscribed"
  //   };
  //   const resp = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Authorization": `apikey ${API_KEY}`,
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(payload)
  //   });
  //   const result = await resp.json();
  //   if (!resp.ok) {
  //     return { statusCode: 500, body: JSON.stringify({ message: result.detail || "Failed to subscribe" }) };
  //   }
  //   return { statusCode: 200, body: JSON.stringify({ message: "Subscription successful" }) };
  // }

  // For demo purposes: pretend the email was saved.
  // Replace with a real persistence step (database, Mailchimp, etc.) as needed.
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Thanks — you're on the list!" }),
  };
};

/* Vercel (Next.js API) equivalent:
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
  const { email } = req.body || {};
  // validation and provider code same as above
}
*/
