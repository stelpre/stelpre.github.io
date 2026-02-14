#!/usr/bin/env node

// Site Content Manager — run: node manage.js
// Usage:
//   node manage.js add update "Did something cool"
//   node manage.js add project
//   node manage.js list updates
//   node manage.js list projects
//   node manage.js edit               (opens data/ in VS Code)
//   node manage.js push "commit msg"  (git add, commit, push)

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

async function addUpdate(text) {
  const data = read('updates.json');
  const date = new Date().toISOString().split('T')[0];
  if (!text) text = await prompt('Description: ');
  data.updates.unshift({ date, text });
  write('updates.json', data);
  console.log(`✓ Added update: "${text}" (${date})`);
}

async function addProject() {
  const data = read('projects.json');
  const title = await prompt('Title: ');
  const description = await prompt('Description: ');
  const tagsInput = await prompt('Tags (comma-separated: programming,complexity,quantum,algorithms): ');
  const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [];
  const link = await prompt('Link URL (or empty): ');
  const linkText = link ? await prompt('Link text (e.g. "View →"): ') : '';
  data.projects.push({ title, description, tags, link, linkText });
  write('projects.json', data);
  console.log(`✓ Added project: "${title}"`);
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
  console.log(`✓ Added material: "${title}" to ${data.sections[idx].title}`);
}

function listUpdates() {
  const data = read('updates.json');
  console.log('\n📅 Updates:');
  data.updates.forEach(u => console.log(`  ${u.date}  ${u.text}`));
}

function listProjects() {
  const data = read('projects.json');
  console.log('\n🔬 Projects:');
  data.projects.forEach(p => {
    console.log(`  ${p.title}`);
    console.log(`    ${p.description}`);
    if (p.tags.length) console.log(`    Tags: ${p.tags.join(', ')}`);
    if (p.link) console.log(`    ${p.link}`);
    console.log();
  });
}

function listTutoring() {
  const data = read('tutoring.json');
  console.log('\n📚 Tutoring:');
  data.sections.forEach(s => {
    console.log(`  ${s.title}`);
    s.materials.forEach(m => console.log(`    - ${m.title} → ${m.link}`));
    console.log();
  });
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

async function main() {
  const [,, cmd, sub, ...rest] = process.argv;

  if (!cmd) {
    console.log(`
Site Content Manager
━━━━━━━━━━━━━━━━━━━

  node manage.js add update "text"     Add a timeline update
  node manage.js add project           Add a project (interactive)
  node manage.js add material          Add tutoring material (interactive)

  node manage.js list updates          List all updates
  node manage.js list projects         List all projects
  node manage.js list tutoring         List tutoring materials

  node manage.js edit                  Open data/ in VS Code
  node manage.js push "message"        Git add, commit & push

Or just edit the JSON files directly in data/
`);
    return;
  }

  switch (cmd) {
    case 'add':
      if (sub === 'update') await addUpdate(rest.join(' ') || null);
      else if (sub === 'project') await addProject();
      else if (sub === 'material') await addTutoringMaterial();
      else console.log('Usage: add update|project|material');
      break;
    case 'list':
      if (sub === 'updates') listUpdates();
      else if (sub === 'projects') listProjects();
      else if (sub === 'tutoring') listTutoring();
      else console.log('Usage: list updates|projects|tutoring');
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
