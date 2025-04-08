export const buildValidatedPrompt = ({ name, message, pattern, error, initial = '', optional = false }) => {
    return {
      type: (prev, values) => {
        if (optional && values?.CUSTOMIZE_LICENSE === false) return null;
        return 'text';
      },
      name,
      message,
      initial,
      validate: pattern
        ? value =>
            !value && optional
              ? true
              : pattern.test(value)
              ? true
              : error || 'Invalid input'
        : undefined,
    };
};
  