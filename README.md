# Olympia Electric Ltd. — Official Website

Responsive single-page website for **Olympia Electric Ltd.** (Charlottetown, Prince Edward Island), designed for service lead generation, mobile responsiveness, and direct appointment booking.

## 1. EmailJS Setup (Send Bookings to `kevin@olympiaelectric.ca`)

This site uses **EmailJS** so form submissions work directly on static hosting (including GitHub Pages) without exposing private SMTP credentials.

1. Create a free account at [https://www.emailjs.com/](https://www.emailjs.com/).
2. Under **Email Services**, connect your email provider (e.g., Gmail, Microsoft 365, or SMTP) and note your **Service ID**.
3. Under **Email Templates**, create a new template:
   - **To Email**: `kevin@olympiaelectric.ca` (or `{{to_email}}`)
   - **Reply-To**: `{{reply_to}}`
   - **Subject**: `New Electrical Appointment Request — {{service_type}} ({{customer_name}})`
   - **Body**:
     ```text
     New appointment request received from the Olympia Electric Ltd. website:

     Full Name: {{customer_name}}
     Email: {{customer_email}}
     Phone: {{customer_phone}}
     Service Type: {{service_type}}
     Preferred Date: {{preferred_date}}
     Preferred Time: {{preferred_time}}
     Project Address: {{project_address}}
     Consent Given: {{consent_given}}
     Submitted At: {{submitted_at}}

     Message / Electrical Needs:
     {{message}}
     ```
   - Save the template and note your **Template ID**.
4. Under **Account → General**, copy your **Public Key**.
5. Configure your keys in one of two ways:
   - **Local / `.env`**: Create `.env` from `.env.example` and fill in:
     ```env
     VITE_EMAILJS_SERVICE_ID="your_service_id"
     VITE_EMAILJS_TEMPLATE_ID="your_template_id"
     VITE_EMAILJS_PUBLIC_KEY="your_public_key"
     ```
   - **Code fallback**: Paste the three public IDs in `src/config/emailConfig.ts`.

## 2. Deploying to GitHub Pages

This repository includes `.github/workflows/deploy.yml` and uses relative Vite paths (`base: './'`) so it works cleanly on any `https://<username>.github.io/<repo>/` URL.

1. Push this project to the `main` branch of a GitHub repository.
2. In GitHub, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Go to **Settings → Secrets and variables → Actions → Repository secrets** and add:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
4. Re-run the **Deploy to GitHub Pages** workflow (or push a commit to `main`). Your live URL will appear in the Actions summary.
