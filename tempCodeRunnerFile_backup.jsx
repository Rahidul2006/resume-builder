/* Backup of tempCodeRunnerFile.javascript: original JSX/React source for ResumeBuilder */

/* Full original content below */

/*
ResumeBuilder.jsx
Template updated to match the user's uploaded resume format (single-column, simple bullets, sections: Skills, Education, Academic Projects, Strengths, Hobbies & Interests, social links).
- Default values filled from the uploaded PDF (Rahidul Khan)
- Print-friendly, single-column layout for easy export
- Simple "❖" bullet style to match the document

How to use:
 - Add this file to a React app with Tailwind configured.
 - Edit the fields on the left; the preview updates on the right.
 - Use Export / Print to save as PDF (or integrate html2canvas/jsPDF for better control).
*/

import React, { useState, useRef } from "react";

export default function ResumeBuilder() {
   const [personal, setPersonal] = useState({
      name: "RAHIDUL KHAN",
      email: "krahidul869@gmail.com",
      phone: "+91 9832577462",
      github: "https://github.com/Rahidul2006",
      linkedin: "https://www.linkedin.com/in/rahidul-khan-6a3922269",
      handle: "@Rahidul2006",
   });

   const [skills, setSkills] = useState(["HTML", "CSS", "JavaScript", "C (programming language)"]);

   const [education, setEducation] = useState([
      {
         id: 1,
         title: "Ideal Institute of Engineering | CSE",
         meta: "CGPA: 7.175 (2024-25) — 1st year",
         details: ""
      },
      { id: 2, title: "X (WBBSE) | JKHS", meta: "60.14% | 2022", details: "" },
      { id: 3, title: "XII (WBCHSE) | VGDV", meta: "64.4% | 2024", details: "" }
   ]);

   const [projects, setProjects] = useState([
      {
         id: 1,
         title: "RK-Clothing",
         desc: "Front-end prototype of a clothing e-commerce platform. Focus: responsive design, intuitive navigation, interactive UI elements.",
         code: "https://github.com/Rahidul2006/RK-Clothing"
      },
      {
         id: 2,
         title: "Starbucks Homepage Clone",
         desc: "Replicated Starbucks homepage using semantic HTML and clean CSS, focusing on layout fidelity.",
         code: "https://github.com/Rahidul2006/Starbucks_homepage_Clone"
      }
   ]);

   const [strengths, setStrengths] = useState(["Problem-solving and analytical thinking", "Team collaboration & communication skills", "Quick learner and adaptable"]);
   const [hobbies, setHobbies] = useState(["Reading tech blogs", "Coding challenges", "Photography"]);

   const previewRef = useRef();

   function updatePersonal(field, value) {
      setPersonal(prev => ({ ...prev, [field]: value }));
   }

   function exportToPDF() {
      window.print();
   }

   return (
      <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Controls */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow p-6 sticky top-6">
               <h2 className="text-xl font-semibold mb-4">Edit Resume (PDF format)</h2>

               <section className="mb-4">
                  <h3 className="font-medium">Personal</h3>
                  <div className="space-y-2 mt-2">
                     <input value={personal.name} onChange={e => updatePersonal('name', e.target.value)} className="w-full border p-2 rounded text-sm font-medium" />
                     <input value={personal.handle} onChange={e => updatePersonal('handle', e.target.value)} className="w-full border p-2 rounded text-sm" />
                     <input value={personal.email} onChange={e => updatePersonal('email', e.target.value)} className="w-full border p-2 rounded text-sm" />
                     <input value={personal.phone} onChange={e => updatePersonal('phone', e.target.value)} className="w-full border p-2 rounded text-sm" />
                     <input value={personal.github} onChange={e => updatePersonal('github', e.target.value)} className="w-full border p-2 rounded text-sm" />
                     <input value={personal.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} className="w-full border p-2 rounded text-sm" />
                  </div>
               </section>

               <section className="mb-4">
                  <h3 className="font-medium">Skills</h3>
                  <div className="mt-2 space-y-2">
                     {skills.map((s, i) => (
                        <div key={i} className="flex gap-2">
                           <input value={s} onChange={e => setSkills(prev => prev.map((x, idx) => idx === i ? e.target.value : x))} className="flex-1 border p-2 rounded text-sm" />
                           <button onClick={() => setSkills(prev => prev.filter((_, idx) => idx !== i))} className="px-3 rounded bg-red-100 text-red-700">x</button>
                        </div>
                     ))}
                     <div className="flex gap-2">
                        <button onClick={() => setSkills(prev => [...prev, 'New Skill'])} className="flex-1 py-2 rounded bg-blue-600 text-white text-sm">Add Skill</button>
                        <button onClick={() => setSkills([])} className="px-3 rounded bg-gray-100 text-sm">Clear</button>
                     </div>
                  </div>
               </section>

               <section className="mb-4">
                  <h3 className="font-medium">Education (editable)</h3>
                  <div className="mt-2 space-y-2">
                     {education.map((ed, i) => (
                        <div key={ed.id} className="border p-3 rounded">
                           <input value={ed.title} onChange={e => setEducation(prev => prev.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))} className="w-full border p-1 rounded mb-1 text-sm" />
                           <input value={ed.meta} onChange={e => setEducation(prev => prev.map((x, idx) => idx === i ? { ...x, meta: e.target.value } : x))} className="w-full border p-1 rounded text-sm" />
                        </div>
                     ))}
                  </div>
               </section>

               <section className="mb-4">
                  <h3 className="font-medium">Academic Projects</h3>
                  <div className="mt-2 space-y-2">
                     {projects.map((p, i) => (
                        <div key={p.id} className="border p-3 rounded">
                           <input value={p.title} onChange={e => setProjects(prev => prev.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))} className="w-full border p-1 rounded mb-1 text-sm" />
                           <textarea value={p.desc} onChange={e => setProjects(prev => prev.map((x, idx) => idx === i ? { ...x, desc: e.target.value } : x))} className="w-full border p-1 rounded text-sm h-20" />
                           <input value={p.code} onChange={e => setProjects(prev => prev.map((x, idx) => idx === i ? { ...x, code: e.target.value } : x))} className="w-full border p-1 rounded mt-1 text-sm" />
                        </div>
                     ))}
                  </div>
               </section>

               <section className="mb-4">
                  <h3 className="font-medium">Strengths & Hobbies</h3>
                  <div className="mt-2 text-sm">
                     <label className="block">Strengths (comma separated)</label>
                     <input value={strengths.join(', ')} onChange={e => setStrengths(e.target.value.split(',').map(s => s.trim()))} className="w-full border p-2 rounded text-sm" />
                     <label className="block mt-2">Hobbies (comma separated)</label>
                     <input value={hobbies.join(', ')} onChange={e => setHobbies(e.target.value.split(',').map(s => s.trim()))} className="w-full border p-2 rounded text-sm" />
                  </div>
               </section>

               <div className="mt-6 flex gap-2">
                  <button onClick={exportToPDF} className="flex-1 py-2 rounded bg-green-600 text-white">Export / Print</button>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-4 rounded bg-gray-100">Top</button>
               </div>
            </div>

            {/* Preview */}
            <div className="lg:col-span-2">
               <div ref={previewRef} className="bg-white rounded-2xl shadow p-8 print:p-6 print:shadow-none print:rounded-none" style={{minHeight: '1120px'}}>
                  <div className="max-w-3xl mx-auto font-sans text-gray-800" style={{lineHeight: 1.25}}>

                     {/* Header */}
                     <header className="mb-4">
                        <h1 className="text-3xl font-bold tracking-wide">{personal.name}</h1>
                        <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                           <div>{personal.email} • {personal.phone}</div>
                           <div className="text-right">
                              <div className="whitespace-nowrap">{personal.handle}</div>
                              <div className="mt-1 text-xs"><a href={personal.github} target="_blank" rel="noreferrer">{personal.github}</a></div>
                              <div className="text-xs"><a href={personal.linkedin} target="_blank" rel="noreferrer">{personal.linkedin}</a></div>
                           </div>
                        </div>
                     </header>

                     <hr className="my-4" />

                     {/* Skills */}
                     <section className="mb-4">
                        <h4 className="font-semibold">SKILLS</h4>
                        <ul className="mt-2 list-none text-sm space-y-1">
                           {skills.map((s, i) => (
                              <li key={i}>❖ {s}</li>
                           ))}
                        </ul>
                     </section>

                     {/* Education */}
                     <section className="mb-4">
                        <h4 className="font-semibold">EDUCATION</h4>
                        <ul className="mt-2 list-none text-sm space-y-3">
                           {education.map(ed => (
                              <li key={ed.id}>
                                 <div>❖ <span className="font-medium">{ed.title}</span></div>
                                 <div className="text-xs text-gray-600 ml-6">{ed.meta}</div>
                              </li>
                           ))}
                        </ul>
                     </section>

                     {/* Projects */}
                     <section className="mb-4">
                        <h4 className="font-semibold">ACADEMIC PROJECTS</h4>
                        <div className="mt-2 text-sm space-y-3">
                           {projects.map(p => (
                              <div key={p.id}>
                                 <div>❖ <span className="font-medium">Project: {p.title}</span></div>
                                 <div className="ml-6">{p.desc}</div>
                                 {p.code && (<div className="ml-6 text-xs text-blue-600 break-all"><a href={p.code} target="_blank" rel="noreferrer">CODE: {p.code}</a></div>)}
                              </div>
                           ))}
                        </div>
                     </section>

                     {/* Strengths */}
                     <section className="mb-4">
                        <h4 className="font-semibold">STRENGTHS</h4>
                        <ul className="mt-2 list-none text-sm space-y-1">
                           {strengths.map((s, i) => <li key={i}>❖ {s}</li>)}
                        </ul>
                     </section>

                     {/* Hobbies & Interests */}
                     <section>
                        <h4 className="font-semibold">HOBBIES & INTERESTS</h4>
                        <ul className="mt-2 list-none text-sm space-y-1">
                           {hobbies.map((h, i) => <li key={i}>❖ {h}</li>)}
                        </ul>
                     </section>

                  </div>
               </div>
            </div>

         </div>
      </div>
   );
}
