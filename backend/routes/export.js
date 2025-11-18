import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import {
  renderSkills,
  renderEducation,
  renderProjects,
  renderStrengths,
  renderHobbies,
  escapeHtml
} from '../utils/templateHelpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const exportToPDF = async (req, res) => {
  let browser;
  try {
    const { personal, about, skills, education, projects, strengths, hobbies, userImage, template } = req.body;

    // Validate input
    if (!personal || !personal.name) {
      return res.status(400).json({ error: 'Personal information is required' });
    }

    // Load template
    const templatePath = join(__dirname, '../templates/resume-template.html');
    let htmlTemplate = readFileSync(templatePath, 'utf-8');

    // Build profile image HTML
    let profileImageHtml = '';
    if (userImage) {
      profileImageHtml = `<img src="${userImage}" alt="profile" class="profile-image" />`;
    }

    // Build social links
    let socialLinksHtml = '';
    if (personal.github) {
      socialLinksHtml += `<a href="${personal.github}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>`;
    }
    if (personal.linkedin) {
      socialLinksHtml += `<a href="${personal.linkedin}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>`;
    }

    // Build sections
    const aboutSection = about
      ? `<section><h2>👤 ABOUT</h2><div class="section-text">${escapeHtml(about)}</div></section>`
      : '';

    const skillsSection =
      skills && skills.length > 0
        ? `<section><h2>⭐ SKILLS</h2><div class="skills-container">${renderSkills(skills)}</div></section>`
        : '';

    const educationSection =
      education && education.length > 0
        ? `<section><h2>🎓 EDUCATION</h2>${renderEducation(education)}</section>`
        : '';

    const projectsSection =
      projects && projects.length > 0
        ? `<section><h2>🚀 PROJECTS</h2>${renderProjects(projects)}</section>`
        : '';

    const strengthsSection =
      strengths && strengths.length > 0
        ? `<section><h2>💪 STRENGTHS</h2><ul>${renderStrengths(strengths)}</ul></section>`
        : '';

    const hobbiesSection =
      hobbies && hobbies.length > 0
        ? `<section><h2>🎯 HOBBIES</h2><div class="section-text">${escapeHtml(renderHobbies(hobbies))}</div></section>`
        : '';

    // Replace placeholders
    htmlTemplate = htmlTemplate
      .replace('{{NAME}}', escapeHtml(personal.name || 'Your Name'))
      .replace('{{HANDLE}}', escapeHtml(personal.handle || ''))
      .replace('{{EMAIL}}', escapeHtml(personal.email || ''))
      .replace('{{PHONE}}', escapeHtml(personal.phone || ''))
      .replace('{{LOCATION}}', escapeHtml(personal.location || ''))
      .replace('{{PROFILE_IMAGE}}', profileImageHtml)
      .replace('{{SOCIAL_LINKS}}', socialLinksHtml)
      .replace('{{ABOUT_SECTION}}', aboutSection)
      .replace('{{SKILLS_SECTION}}', skillsSection)
      .replace('{{EDUCATION_SECTION}}', educationSection)
      .replace('{{PROJECTS_SECTION}}', projectsSection)
      .replace('{{STRENGTHS_SECTION}}', strengthsSection)
      .replace('{{HOBBIES_SECTION}}', hobbiesSection);

    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });

    const page = await browser.newPage();

    // Set viewport for A4 size
    await page.setViewport({ width: 794, height: 1123 });

    // Set content
    await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });

    // Wait for images to load
    await page.waitForTimeout(500);

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      printBackground: true,
      scale: 1
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${personal.name.replace(/\s+/g, '_')}_Resume.pdf"`
    );

    // Send PDF
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({
      error: 'Failed to generate PDF',
      message: error.message
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
