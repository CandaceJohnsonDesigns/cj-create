const PROTECTED_GLOBAL_ROLES = ['super-admin'];

export const validateUserRoles = (roles) => {
  if (roles?.global) {
    for (const role of Object.keys(roles.global)) {
      if (!PROTECTED_GLOBAL_ROLES.includes(role)) {
        throw new Error(`Illegal role assignment: ${role}`);
      }
    }
  }
};

