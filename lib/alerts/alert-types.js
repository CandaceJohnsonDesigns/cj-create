export const ALERT_TYPES = [
    {
      label: 'TODO!',
      pattern: /\/\/\s*TODO!:(.*)/i,
      level: 'required',
    },
    {
      label: 'TODO',
      pattern: /\/\/\s*TODO:(.*)/i,
      level: 'optional',
    },
    {
      label: 'FIXME!',
      pattern: /\/\/\s*FIXME!:(.*)/i,
      level: 'required',
    },
    {
      label: 'FIXME',
      pattern: /\/\/\s*FIXME:(.*)/i,
      level: 'optional',
    },
    // Add more types as needed
  ];
  