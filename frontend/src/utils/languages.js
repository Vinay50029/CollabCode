/** Monaco editor language id */
export const LANGUAGE_OPTIONS = [
  {
    id: 'javascript',
    label: 'JavaScript',
    piston: {
      language: 'javascript',
      version: '18.15.0',
    },
    ext: 'js',
  },

  {
    id: 'typescript',
    label: 'TypeScript',
    piston: {
      language: 'typescript',
      version: '5.0.3',
    },
    ext: 'ts',
  },

  {
    id: 'python',
    label: 'Python',
    piston: {
      language: 'python',
      version: '3.10.0',
    },
    ext: 'py',
  },

  {
    id: 'java',
    label: 'Java',
    piston: {
      language: 'java',
      version: '15.0.2',
    },
    ext: 'java',
  },

  {
    id: 'cpp',
    label: 'C++',
    piston: {
      language: 'cpp',
      version: '10.2.0',
    },
    ext: 'cpp',
  },

  {
    id: 'c',
    label: 'C',
    piston: {
      language: 'c',
      version: '10.2.0',
    },
    ext: 'c',
  },
];

export function getLanguageOption(monacoId) {
  return (
    LANGUAGE_OPTIONS.find((l) => l.id === monacoId) ||
    LANGUAGE_OPTIONS[0]
  );
}

export function pistonFileName(option) {
  switch (option.id) {
    case 'java':
      return 'Main.java';

    case 'python':
      return 'main.py';

    case 'cpp':
      return 'main.cpp';

    case 'c':
      return 'main.c';

    case 'typescript':
      return 'main.ts';

    default:
      return 'main.js';
  }
}