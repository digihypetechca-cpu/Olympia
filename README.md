# Olympia Electric Ltd. — Official Website

Responsive single-page website for **Olympia Electric Ltd.** (Charlottetown, Prince Edward Island), designed for service lead generation, mobile responsiveness, and direct appointment booking.

## 1. GitHub Pages Deployment (Works Out-of-the-Box)

This repository supports **all three** GitHub Pages deployment modes:

- **Option A — Zero-Config (`Deploy from a branch` → `main` / `(root)`)**: Works immediately out of the box. Root `index.html` automatically loads the compiled `./docs/` production bundle if GitHub Pages serves the unbuilt source branch.
- **Option B — Docs Folder (`Deploy from a branch` → `main` / `/docs`)**: Serves the pre-built `docs/` bundle directly at your site root.
- **Option C — Automated CI/CD (`GitHub Actions`)**: Uses `.github/workflows/deploy.yml` to build fresh from source on every push to `main` (required if you inject EmailJS keys via GitHub Repository Secrets).

If you edit source files in `src/` and deploy via Option A or B, regenerate `docs/` before pushing:

```bash
npx vite build --outDir docs
```

## 2. EmailJS Setup (Send Bookings to `kevin@olympiaelectric.ca`)

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
   - **GitHub Repository Secrets / `.env`** (for Option C GitHub Actions): Set `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` (see `.env.example`).
   - **Direct config** (works for all options): Paste the three public IDs directly into `src/config/emailConfig.ts` and rebuild `docs/` (`npx vite build --outDir docs`).
