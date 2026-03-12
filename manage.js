#!/usr/bin/env node

// Site Content Manager — run: node manage.js
// Usage:
//   node manage.js add update "text"       Add a timeline update
//   node manage.js add project             Add a project (interactive)
//   node manage.js add material            Add tutoring material (interactive)
//   node manage.js add cv-item             Add a CV entry (interactive)
//   node manage.js add publication         Add a publication (interactive)
//
//   node manage.js list updates            List all updates
//   node manage.js list projects           List all projects
//   node manage.js list tutoring           List tutoring materials
//   node manage.js list publications       List publications
//   node manage.js list cv                 List CV sections
//
//   node manage.js remove update <index>   Remove an update by index
//   node manage.js remove project <index>  Remove a project by index
//
//   node manage.js status                  Show content counts
//   node manage.js edit                    Open data/ in VS Code
//   node manage.js push "message"          Git add, commit & push

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const DATA_DIR = path.join(__dirname, 'data');

function read(file) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
}

function write(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2) + '\n');
}

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans); }));
}

// ======== Add Commands ========

async function addUpdate(text) {
  const data = read('updates.json');
  const date = new Date().toISOString().split('T')[0];
  if (!text) text = await prompt('Description: ');
  data.updates.unshift({ date, text });
  write('updates.json', data);
  console.log(`\u2713 Added update: "${text}" (${date})`);
}

async function addProject() {
  const data = read('projects.json');
  const title = await prompt('Title: ');
  const description = await prompt('Description: ');
  const tagsInput = await prompt('Tags (comma-separated, e.g. programming,complexity,quantum): ');
  const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [];
  const link = await prompt('Link URL (or empty): ');
  const linkText = link ? await prompt('Link text (e.g. "View \u2192"): ') : '';
  data.projects.push({ title, description, tags, link, linkText });
  write('projects.json', data);
  console.log(`\u2713 Added project: "${title}"`);
}

async function addTutoringMaterial() {
  const data = read('tutoring.json');
  console.log('\nSections:');
  data.sections.forEach((s, i) => console.log(`  ${i}: ${s.title}`));
  const idx = parseInt(await prompt('Section index: '));
  if (isNaN(idx) || !data.sections[idx]) { console.log('Invalid section'); return; }
  const title = await prompt('Material title: ');
  const link = await prompt('PDF link: ');
  const tagsInput = await prompt('Tags (comma-separated, or empty): ');
  const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [];
  data.sections[idx].materials.push({ title, link, tags });
  write('tutoring.json', data);
  console.log(`\u2713 Added material: "${title}" to ${data.sections[idx].title}`);
}

async function addCVItem() {
  const data = read('cv.json');
  console.log('\nCV Sections:');
  data.sections.forEach((s, i) => console.log(`  ${i}: ${s.title}`));
  const idx = parseInt(await prompt('Section index: '));
  if (isNaN(idx) || !data.sections[idx]) { console.log('Invalid section'); return; }
  const title = await prompt('Title: ');
  const subtitle = await prompt('Subtitle (e.g. institution, or empty): ');
  const date = await prompt('Date (e.g. "Fall 2025 \u2013 Present"): ');
  const description = await prompt('Description (or empty): ');
  const item = { title, subtitle, date, description, details: [] };
  data.sections[idx].items.push(item);
  write('cv.json', data);
  console.log(`\u2713 Added CV item: "${title}" to ${data.sections[idx].title}`);
}

async function addPublication() {
  const data = read('publications.json');
  const title = await prompt('Title: ');
  const authors = await prompt('Authors: ');
  const venue = await prompt('Venue (e.g. journal/conference name): ');
  const year = await prompt('Year: ');
  const link = await prompt('Link URL (or empty): ');
  const linkText = link ? await prompt('Link text (e.g. "PDF"): ') : '';
  data.publications.push({ title, authors, venue, year, link, linkText });
  write('publications.json', data);
  console.log(`\u2713 Added publication: "${title}"`);
}

// ======== List Commands ========

function listUpdates() {
  const data = read('updates.json');
  console.log('\n\ud83d\udcc5 Updates:');
  data.updates.forEach((u, i) => console.log(`  [${i}] ${u.date}  ${u.text}`));
  if (data.updates.length === 0) console.log('  (none)');
}

function listProjects() {
  const data = read('projects.json');
  console.log('\n\ud83d\udd2c Projects:');
  data.projects.forEach((p, i) => {
    console.log(`  [${i}] ${p.title}`);
    console.log(`      ${p.description.split('\n')[0]}`);
    if (p.tags.length) console.log(`      Tags: ${p.tags.join(', ')}`);
    if (p.link) console.log(`      ${p.link}`);
    console.log();
  });
  if (data.projects.length === 0) console.log('  (none)');
}

function listTutoring() {
  const data = read('tutoring.json');
  console.log('\n\ud83d\udcda Tutoring:');
  data.sections.forEach(s => {
    console.log(`  ${s.title}`);
    s.materials.forEach(m => console.log(`    - ${m.title} \u2192 ${m.link}`));
    console.log();
  });
}

function listPublications() {
  const data = read('publications.json');
  console.log('\n\ud83d\udcdd Publications:');
  data.publications.forEach((p, i) => {
    console.log(`  [${i}] ${p.title}`);
    if (p.authors) console.log(`      ${p.authors}`);
    if (p.venue) console.log(`      ${p.venue} (${p.year || ''})`);
    if (p.link) console.log(`      ${p.link}`);
    console.log();
  });
  if (data.publications.length === 0) console.log('  (none yet)');
}

function listCV() {
  const data = read('cv.json');
  console.log('\n\ud83c\udf93 CV Sections:');
  data.sections.forEach((s, si) => {
    console.log(`  [${si}] ${s.icon || ''} ${s.title} (${s.items.length} items)`);
    s.items.forEach((item, ii) => {
      console.log(`       [${ii}] ${item.title}${item.date ? ' \u2014 ' + item.date : ''}`);
    });
    console.log();
  });
}

// ======== Remove Commands ========

function removeUpdate(index) {
  const data = read('updates.json');
  const idx = parseInt(index);
  if (isNaN(idx) || idx < 0 || idx >= data.updates.length) {
    console.log(`Invalid index. Use "list updates" to see indices (0-${data.updates.length - 1}).`);
    return;
  }
  const removed = data.updates.splice(idx, 1)[0];
  write('updates.json', data);
  console.log(`\u2713 Removed update: "${removed.text}" (${removed.date})`);
}

function removeProject(index) {
  const data = read('projects.json');
  const idx = parseInt(index);
  if (isNaN(idx) || idx < 0 || idx >= data.projects.length) {
    console.log(`Invalid index. Use "list projects" to see indices (0-${data.projects.length - 1}).`);
    return;
  }
  const removed = data.projects.splice(idx, 1)[0];
  write('projects.json', data);
  console.log(`\u2713 Removed project: "${removed.title}"`);
}

// ======== Utility Commands ========

function showStatus() {
  const updates = read('updates.json');
  const projects = read('projects.json');
  const tutoring = read('tutoring.json');
  const pubs = read('publications.json');
  const cv = read('cv.json');

  const totalMaterials = tutoring.sections.reduce((sum, s) => sum + s.materials.length, 0);
  const totalCVItems = cv.sections.reduce((sum, s) => sum + s.items.length, 0);

  console.log('\n\ud83d\udcca Site Content Status');
  console.log('\u2500'.repeat(30));
  console.log(`  Updates:        ${updates.updates.length}`);
  console.log(`  Projects:       ${projects.projects.length}`);
  console.log(`  Publications:   ${pubs.publications.length}`);
  console.log(`  CV Sections:    ${cv.sections.length} (${totalCVItems} items)`);
  console.log(`  Teaching:       ${tutoring.sections.length} sections (${totalMaterials} materials)`);
  console.log(`  Interests:      ${(cv.researchInterests || []).length}`);
  console.log();
}

function openEditor() {
  console.log('Opening data/ in VS Code...');
  execSync('code ' + DATA_DIR);
}

function gitPush(msg) {
  if (!msg) msg = 'update content';
  console.log('Pushing changes...');
  execSync(`git add -A && git commit -m "${msg}" && git push`, { stdio: 'inherit', cwd: __dirname });
}

// ======== Main ========

async function main() {
  const [,, cmd, sub, ...rest] = process.argv;

  if (!cmd) {
    console.log(`
Site Content Manager
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

  ADD CONTENT
  node manage.js add update "text"       Add a timeline update
  node manage.js add project             Add a project (interactive)
  node manage.js add material            Add tutoring material (interactive)
  node manage.js add cv-item             Add a CV entry (interactive)
  node manage.js add publication         Add a publication (interactive)

  LIST CONTENT
  node manage.js list updates            List all updates (with indices)
  node manage.js list projects           List all projects (with indices)
  node manage.js list tutoring           List tutoring materials
  node manage.js list publications       List publications
  node manage.js list cv                 List CV sections and items

  REMOVE CONTENT
  node manage.js remove update <index>   Remove an update by index
  node manage.js remove project <index>  Remove a project by index

  UTILITIES
  node manage.js status                  Show content counts
  node manage.js edit                    Open data/ in VS Code
  node manage.js push "message"          Git add, commit & push

Or just edit the JSON files directly in data/
`);
    return;
  }

  switch (cmd) {
    case 'add':
      if (sub === 'update') await addUpdate(rest.join(' ') || null);
      else if (sub === 'project') await addProject();
      else if (sub === 'material') await addTutoringMaterial();
      else if (sub === 'cv-item') await addCVItem();
      else if (sub === 'publication') await addPublication();
      else console.log('Usage: add update|project|material|cv-item|publication');
      break;
    case 'list':
      if (sub === 'updates') listUpdates();
      else if (sub === 'projects') listProjects();
      else if (sub === 'tutoring') listTutoring();
      else if (sub === 'publications') listPublications();
      else if (sub === 'cv') listCV();
      else console.log('Usage: list updates|projects|tutoring|publications|cv');
      break;
    case 'remove':
      if (sub === 'update') removeUpdate(rest[0]);
      else if (sub === 'project') removeProject(rest[0]);
      else console.log('Usage: remove update|project <index>');
      break;
    case 'status':
      showStatus();
      break;
    case 'edit':
      openEditor();
      break;
    case 'push':
      gitPush(sub || rest[0]);
      break;
    default:
      console.log('Unknown command. Run without args for help.');
  }
}

main();
