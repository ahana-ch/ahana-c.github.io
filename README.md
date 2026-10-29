# Ahana Chaudhury - Portfolio Website

> Professional portfolio website for **Ahana Chaudhury**, Technical Writer and Documentation Specialist with 5+ years of experience across Banking & Financial Services (Wells Fargo), Pharmaceutical, Healthcare, and Digital Platforms (Cognizant).

---

## 🌟 Highlights & Features

- **Design System & Layout**: Inspired by `divyangmishra.github.io` with a bespoke, polished design tailored for an Enterprise Documentation Leader.
- **Organization Logos**: Official vector SVG logos for **Wells Fargo**, **Cognizant**, and **University of Calcutta**.
- **Complete Resume Coverage**:
  - **Summary**: Comprehensive overview of 5+ years documentation lifecycle experience.
  - **Core Skills**: Over 50+ skills categorized into 7 structured domains (Technical Writing & SOPs, Documentation Management & Governance, API & Developer Docs, Tools & Platforms, Learning & Content Development, Quality & Accessibility, Professional Practices).
  - **Interactive Real-Time Search**: Instant search bar to filter any skill, tool, or format.
  - **Professional Experience**: Interactive timeline for Wells Fargo (Procedure Writer) and Cognizant (Technical Writer) with complete detailed bullet points and tech badges.
  - **Key Documentation Initiatives**: Interactive modal dialogs detailing problem, solution, technologies, and measurable business impact.
  - **Education**: University of Calcutta (B.A. in English Literature) with official crest.
  - **Achievements & Governance**: Core competencies in enterprise re-platforming, 100% audit compliance, Docs-as-Code, and cross-functional leadership.
  - **Testimonials & Endorsements**: Professional recommendations representing compliance, engineering, and product operations.
  - **Live Contact Form & Direct Email Delivery**: Direct AJAX email forwarding to `ahana.chau99@gmail.com` via FormSubmit with interactive confirmation pop-up and loading spinner.
  - **Resume Access**: Direct Google Drive integration linking to the public resume PDF (`https://drive.google.com/file/d/1oFETfltOM-yycKnx8bOIbJI--kqWb2QK/view`) plus printable web version at `assets/docs/resume.html`.
  - **Theme Switcher**: Smooth Light and Dark mode toggle with `localStorage` persistence.
  - **Printable Resume View**: Dedicated printable/save-to-PDF resume at `assets/docs/resume.html`.
  - **100% Responsive**: Tested across mobile (320px–480px), tablet (768px), laptop (1024px), and desktop (1280px+).
  - **Clean & Human-Crafted**: Built without AI emojis or generic AI symbols.

---

## 📁 Project Structure

```
ahana-portfolio/
├── index.html                   # Main portfolio landing page
├── .nojekyll                    # GitHub Pages Jekyll bypass
├── README.md                    # Documentation & deployment guide
├── css/
│   └── styles.css               # Complete styling, CSS variables & responsive rules
├── js/
│   └── main.js                  # Theme toggle, search, modals & form logic
└── assets/
    ├── images/
    │   ├── wells-fargo.svg      # Wells Fargo official vector logo
    │   ├── cognizant.svg        # Cognizant official vector logo
    │   ├── calcutta-university.svg # Calcutta University official crest
    │   └── favicon.svg          # Modern AC monogram favicon
    └── docs/
        └── resume.html          # Clean printable resume view (Print / Save as PDF)
```

---

## 💻 Local Preview

You can preview the website locally in either of two easy ways:

### Option 1: Direct File Opening
Double-click `index.html` in your file explorer, or open it in your browser:
```
file:///C:/Users/ahana/.gemini/antigravity/scratch/ahana-portfolio/index.html
```

### Option 2: Local HTTP Server (Python / PowerShell)
In PowerShell, navigate to the folder and run:
```powershell
cd "C:\Users\ahana\.gemini\antigravity\scratch\ahana-portfolio"
python -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🚀 Deploying to GitHub Pages (`github.io`)

Because this project is built with clean static HTML, CSS, and Vanilla JavaScript, it is 100% ready for instant GitHub Pages deployment with zero build steps or CI pipeline friction.

### Step-by-Step Deployment Guide:

1. **Create a GitHub Repository**:
   - Go to [github.com/new](https://github.com/new)
   - Repository name:
     - For `https://<your-username>.github.io`: name the repo `<your-username>.github.io`
     - Or for a project page: name it `portfolio` (will be hosted at `https://<your-username>.github.io/portfolio/`)
   - Choose **Public**.

2. **Initialize Git and Push**:
   Open PowerShell in the project directory:
   ```powershell
   cd "C:\Users\ahana\.gemini\antigravity\scratch\ahana-portfolio"

   # Initialize repository
   git init
   git add .
   git commit -m "Initial commit: Ahana Chaudhury Portfolio"

   # Rename branch to main
   git branch -M main

   # Add your remote (replace <your-username> and <repo-name>)
   git remote add origin https://github.com/<your-username>/<repo-name>.git

   # Push to GitHub
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - In your GitHub repository, go to **Settings** > **Pages** (under "Code and automation").
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/(root)`.
   - Click **Save**.
   - Your site will be live within 1 to 2 minutes at `https://<your-username>.github.io/`!
