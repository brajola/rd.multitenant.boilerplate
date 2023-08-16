import { ValidationError } from '@nestjs/common';

export const stringified = (errors: ValidationError[]): string => {
  return JSON.stringify(errors);
};
