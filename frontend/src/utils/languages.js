/** Monaco editor language id */
export const LANGUAGE_OPTIONS = [
  { id: 'javascript', label: 'JavaScript', piston: { language: 'javascript', version: '18.15.0' }, ext: 'js' },
  { id: 'typescript', label: 'TypeScript', piston: { language: 'typescript', version: '5.0.3' }, ext: 'ts' },
  { id: 'python', label: 'Python', piston: { language: 'python', version: '3.10.0' }, ext: 'py' },
  { id: 'java', label: 'Java', piston: { language: 'java', version: '15.0.2' }, ext: 'java' },
  { id: 'cpp', label: 'C++', piston: { language: 'c++', version: '10.2.0' }, ext: 'cpp' },
  { id: 'c', label: 'C', piston: { language: 'c', version: '10.2.0' }, ext: 'c' },
];

export function getLanguageOption(monacoId) {
  return LANGUAGE_OPTIONS.find((l) => l.id === monacoId) || LANGUAGE_OPTIONS[0];
}

export function pistonFileName(option) {
  if (option.id === 'java') return 'Main.java';
  if (option.id === 'python') return 'main.py';
  if (option.id === 'cpp') return 'main.cpp';
  if (option.id === 'c') return 'main.c';
  if (option.id === 'typescript') return 'main.ts';
  return 'main.js';
}
