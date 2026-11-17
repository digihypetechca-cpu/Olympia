# Olympia Electric Ltd. — Official Website

Responsive single-page website for **Olympia Electric Ltd.** (Charlottetown, Prince Edward Island), designed for service lead generation, mobile responsiveness, and direct appointment booking.

## 1. Fix Blank Page / Deploy to GitHub Pages

This is a Vite + React + TypeScript application. GitHub Pages **must** serve the compiled `dist/` bundle built by GitHub Actions — if GitHub Pages is set to **Deploy from a branch (`main` / root)**, browsers receive the uncompiled `index.html` (`/src/main.tsx`) and display a blank page.

Follow these steps in your GitHub repository:

1. Push the latest code (including `.github/workflows/deploy.yml`) to the `main` branch.
2. Open your repository on GitHub and go to **Settings → Pages**.
3. Under **Build and deployment → Source**, change the dropdown from *Deploy from a branch* to **GitHub Actions**.
4. *(Optional for live EmailJS)* Go to **Settings → Secrets and variables → Actions → Repository secrets** and add:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
5. Go to the **Actions** tab, open **Deploy to GitHub Pages**, and click **Run workflow** (or push a commit to `main`). Once it finishes, your live site at `https://<username>.github.io/<repo>/` will load the built app.

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
   - **GitHub Repository Secrets / `.env`**: Set `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` (see `.env.example`).
   - **Code fallback**: Paste the three public IDs directly in `src/config/emailConfig.ts`.
