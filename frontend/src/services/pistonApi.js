import axios from 'axios';

const PISTON = 'https://emkc.org/api/v2/piston/execute';

export async function executeCode({ language, version, filename, content }) {
  const { data } = await axios.post(
    PISTON,
    {
      language,
      version,
      files: [{ name: filename, content }],
    },
    { headers: { 'Content-Type': 'application/json' }, timeout: 30000 },
  );
  return data;
}
