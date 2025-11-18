// Helper functions for rendering resume sections

export const renderSkills = (skills) => {
  if (!skills || skills.length === 0) return '';
  return skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
};

export const renderEducation = (education) => {
  if (!education || education.length === 0) return '';
  return education
    .map(
      (edu) => `
    <div class="education-item">
      <div class="education-title">${edu.title || ''}</div>
      <div class="education-meta">${edu.meta || ''}</div>
    </div>
  `
    )
    .join('');
};

export const renderProjects = (projects) => {
  if (!projects || projects.length === 0) return '';
  return projects
    .map(
      (proj) => `
    <div class="project-item">
      <div class="project-title">${proj.title || ''}</div>
      <div class="project-desc">${proj.desc || ''}</div>
      ${proj.code ? `<div class="project-code"><a href="${proj.code}" target="_blank">Code: ${proj.code}</a></div>` : ''}
    </div>
  `
    )
    .join('');
};

export const renderStrengths = (strengths) => {
  if (!strengths || strengths.length === 0) return '';
  return strengths.map(strength => `<li>${strength}</li>`).join('');
};

export const renderHobbies = (hobbies) => {
  if (!hobbies || hobbies.length === 0) return '';
  return hobbies.join(' • ');
};

export const escapeHtml = (text) => {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};
