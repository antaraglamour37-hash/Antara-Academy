const https = require('https');

const apiKey = "AIzaSyBGiWqMW8AHzmeI-DWXtzZ2WNS_S7heqwU";
const candidates = [
  "antara-academy",
  "antara-makeover",
  "mba-academy",
  "mba-academy-landing-phase1",
  "antaramakeover",
  "antara-academy-1",
  "antara-academy-app",
  "antara-glamour",
  "antaraglamour",
  "antaraglamour37"
];

async function checkProject(projectId) {
  return new Promise((resolve) => {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents?key=${apiKey}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
             if (json.error.status === 'PERMISSION_DENIED') {
                 // Usually means project exists but rules deny, OR api key is valid for it.
                 // Actually if project doesn't exist, it says NOT_FOUND or INVALID_ARGUMENT.
                 resolve({ id: projectId, status: json.error.status, message: json.error.message });
             } else {
                 resolve({ id: projectId, status: json.error.status, message: json.error.message });
             }
          } else {
             resolve({ id: projectId, status: 'SUCCESS', data: json });
          }
        } catch(e) {
          resolve({ id: projectId, status: 'PARSE_ERROR' });
        }
      });
    }).on('error', (err) => {
      resolve({ id: projectId, status: 'REQ_ERROR', message: err.message });
    });
  });
}

async function run() {
  for (const id of candidates) {
    const res = await checkProject(id);
    console.log(`Project: ${id} -> Status: ${res.status} | Msg: ${res.message || 'OK'}`);
  }
}

run();
