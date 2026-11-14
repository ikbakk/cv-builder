import { useEffect } from 'react';
import '../landing.css';

const editorUrl = '/editor';

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true" fill="none"><path d="M4 10h11m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function DocumentPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`landing-document${compact ? ' landing-document-compact' : ''}`} aria-hidden="true">
      <div className="landing-document-name">Alex Morgan</div>
      <div className="landing-document-role">Product Designer · Jakarta</div>
      <div className="landing-document-rule" />
      <div className="landing-document-label">Summary</div>
      <div className="landing-document-line" />
      <div className="landing-document-line landing-document-line-short" />
      <div className="landing-document-rule" />
      <div className="landing-document-label">Experience</div>
      <div className="landing-document-job">Senior Product Designer</div>
      <div className="landing-document-role">Studio North · 2022–Present</div>
      <div className="landing-document-line" />
      <div className="landing-document-rule" />
      <div className="landing-document-label">Education</div>
      <div className="landing-document-job">Design, B.A.</div>
      <div className="landing-document-role">Example University</div>
    </div>
  );
}

export function LandingPage() {
  useEffect(() => {
    if (window.location.hash) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    }
  }, []);

  return (
    <div className="landing">
      <a className="landing-skip" href="#main-content">Skip to content</a>
      <header className="landing-header">
        <div className="landing-container landing-header-inner">
          <a className="landing-logo" href="/" aria-label="CV Builder home"><span className="landing-logo-mark" aria-hidden="true">c</span>cvbuilder<span className="landing-logo-dot">.</span></a>
          <nav className="landing-nav" aria-label="Main navigation"><a href="#how-it-works">How it works</a><a href="#templates">Templates</a><a href="#privacy">Privacy</a></nav>
          <a className="landing-button landing-button-small" href={editorUrl}>Open editor <ArrowIcon /></a>
        </div>
      </header>

      <main id="main-content">
        <section className="landing-hero landing-container" aria-labelledby="landing-title">
          <div className="landing-hero-copy">
            <h1 id="landing-title">Your next CV,<br /><span>without the fuss.</span></h1>
            <p>Add your details, choose a layout, and generate a polished PDF. Your work stays on your machine.</p>
            <div className="landing-actions"><a className="landing-button" href={editorUrl}>Create my CV <ArrowIcon /></a><a className="landing-text-link" href="#how-it-works">See how it works <ArrowIcon /></a></div>
            <p className="landing-hero-note">No account needed · Typst CLI required for PDF export</p>
          </div>
          <div className="landing-hero-art" role="img" aria-label="Illustrative CV preview using the Professional template">
            <div className="landing-art-caption">Illustrative CV preview</div>
            <DocumentPreview />
            <div className="landing-template-tag">Professional template</div>
            <div className="landing-save-tag"><span aria-hidden="true">✓</span> Auto-saved in your browser</div>
          </div>
        </section>

        <section className="landing-steps" id="how-it-works" aria-labelledby="steps-title">
          <div className="landing-container">
            <div className="landing-section-head"><h2 id="steps-title">From draft to document.</h2><p>A short, visible path from your details to a PDF.</p></div>
            <div className="landing-steps-grid">
              <article><span className="landing-step-number">01</span><h3>Add your details</h3><p>Use clear sections for your profile, experience, skills, education and more.</p></article>
              <article><span className="landing-step-number">02</span><h3>Choose a template</h3><p>Pick ATS Friendly or Professional. You can also upload a custom Typst template.</p></article>
              <article><span className="landing-step-number">03</span><h3>Generate your PDF</h3><p>Preview the compiled result, then download the file ready to share.</p></article>
            </div>
          </div>
        </section>

        <section className="landing-template-section landing-container" id="templates" aria-labelledby="templates-title">
          <div className="landing-template-copy"><h2 id="templates-title">Make it yours.<br /><span>Keep it readable.</span></h2><p>Start with a clean layout, then focus on the words that matter. Switch templates whenever you like without re-entering your details.</p><div className="landing-template-list"><span>ATS Friendly</span><span>Professional</span><span>Custom Typst</span></div><a className="landing-text-link" href={editorUrl}>Explore templates in the editor <ArrowIcon /></a></div>
          <div className="landing-template-display" role="img" aria-label="Illustrative comparison of ATS Friendly and Professional CV layouts"><div className="landing-template-paper landing-template-paper-back"><div className="landing-mini-name">Alex Morgan</div><div className="landing-mini-rule"/><div className="landing-mini-line"/><div className="landing-mini-line short"/><div className="landing-mini-rule"/><div className="landing-mini-line"/></div><DocumentPreview compact /><span className="landing-display-label landing-display-label-left">ATS Friendly</span><span className="landing-display-label landing-display-label-right">Professional</span></div>
        </section>

        <section className="landing-privacy" id="privacy" aria-labelledby="privacy-title"><div className="landing-container landing-privacy-inner"><div className="landing-privacy-icon" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none"><rect x="11" y="26" width="42" height="31" rx="7" stroke="currentColor" strokeWidth="3"/><path d="M20 26v-8a12 12 0 0 1 24 0v8" stroke="currentColor" strokeWidth="3"/><circle cx="32" cy="41" r="3" fill="currentColor"/></svg></div><div><h2 id="privacy-title">Your CV stays yours.</h2><p>Your details are saved in your browser. PDF compilation runs locally through Typst, so you can work without sending your CV to an online account.</p></div></div></section>

        <section className="landing-final landing-container" aria-labelledby="final-title"><h2 id="final-title">Start with your details.</h2><p>The editor saves your work in this browser as you go.</p><a className="landing-button" href={editorUrl}>Open the editor <ArrowIcon /></a><span>Typst CLI is required on your machine to generate PDFs.</span></section>
      </main>
      <footer className="landing-footer"><div className="landing-container"><span className="landing-logo">cvbuilder<span className="landing-logo-dot">.</span></span><span>Build locally. Share confidently.</span><a href={editorUrl}>Open editor</a></div></footer>
    </div>
  );
}
