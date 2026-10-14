# PortfoliX — Minimalist Editorial Portfolio for AI/ML & Data Science

A high-performance, Swiss-style editorial portfolio website built specifically for **Data Scientists, AI Engineers, and Machine Learning Researchers**.

Designed with clean typography, high readability, seamless Light/Dark mode, zero build steps, and an **interactive client-side ML Demo Lab** that impresses recruiters and collaborators immediately.

---

## ⚡ Quick Start

No Node.js or build tools required! You can view and edit it immediately:

### Option 1: Direct File Preview
Simply double-click `index.html` in your file explorer to open it in Chrome, Edge, or Firefox.

### Option 2: Local Python Server (Recommended)
Open PowerShell or your terminal in this directory (`c:\Users\Admin\Desktop\PortfoliX`) and run:

```powershell
python -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000) in your browser.

---

## 📁 Project Structure

```text
PortfoliX/
├── index.html        # Clean semantic markup with Tailwind CSS & Lucide icons
├── styles.css        # Swiss typography refinements, badge styles & print styles
├── app.js            # Theme toggle, project filtering, modal dialogs & ML Demo Lab
└── README.md         # Customization and deployment guide
```

---

## 🛠️ Personalizing Your Portfolio

### 1. Update Name & Personal Information
Open `index.html`:
- Search for `Alex Rivera` and replace with your name.
- Update your title: `Data Scientist / Machine Learning Engineer`.
- Change location: `San Francisco, CA / Remote` to your preferred location.
- Update your email: change `alex.rivera.ai@example.com` in both the hero spec card and the contact section.

### 2. Update Social Links
In `index.html`:
- Replace `https://github.com` with your GitHub profile link (`https://github.com/yourusername`).
- Replace `https://linkedin.com` with your LinkedIn URL.
- Replace `https://scholar.google.com` with your Google Scholar or Kaggle profile.

### 3. Add or Modify Projects
1. **In `index.html`**:
   - Each project is housed inside `<article class="project-card" data-category="llm|cv|mlops">`.
   - Update titles, descriptions, impact metrics, and tech tags.
2. **In `app.js`**:
   - The `projectData` object holds the detailed architecture view for the interactive modal (`project-rag`, `project-cv`, `project-mlops`, `project-ts`).
   - Customize the problem statement, engineering decisions, and key metrics.

### 4. Interactive Demo Lab
The **Demo Lab** section allows visitors to test live tokenization, character density, and semantic polarity directly in the browser:
- You can add more preset sentences or domain-specific prompts in `index.html` within `.preset-btn`.
- The heuristic analyzer in `app.js` (`initDemoLab`) can be tweaked or connected to a real backend API (e.g., FastAPI, Hugging Face Inference API, or OpenAI) if desired.

---

## 🚀 Free Deployment Guide

### Deploy on GitHub Pages (Free)
1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment**, set the Source to **Deploy from a branch**.
   - Select branch `main` and folder `/ (root)`.
   - Click **Save**. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Deploy on Vercel or Netlify (1-Click)
- **Netlify Drop**: Simply drag and drop the `PortfoliX` folder into [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel**: Import the GitHub repo into [vercel.com](https://vercel.com) with framework preset set to **Other**.

---

## 🎨 Design Features
- **Editorial Typography**: Pairing modern geometric `Inter` for high UI legibility with editorial `Newsreader` for headline elegance, and `JetBrains Mono` for engineering metrics.
- **Precision Dark / Light Mode**: Persisted automatically via `localStorage` with system preference detection.
- **Print-to-PDF Resume Mode**: Clean `@media print` styling formats the page into a crisp CV when printing (`Ctrl + P`).
- **Zero External Runtime Dependencies**: Blazing fast load time, high Google Lighthouse score, accessible contrast.
