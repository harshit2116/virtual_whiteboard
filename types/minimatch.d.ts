// This file provides type definitions for minimatch to resolve compilation errors
declare module 'minimatch' {
  interface IOptions {
    debug?: boolean;
    nobrace?: boolean;
    noglobstar?: boolean;
    dot?: boolean;
    noext?: boolean;
    nocase?: boolean;
    nonull?: boolean;
    matchBase?: boolean;
    nocomment?: boolean;
    nonegate?: boolean;
    flipNegate?: boolean;
  }

  function minimatch(target: string, pattern: string, options?: IOptions): boolean;
  
  namespace minimatch {
    export function filter(pattern: string, options?: IOptions): (element: string) => boolean;
    export function match(list: string[], pattern: string, options?: IOptions): string[];
    export class Minimatch {
      constructor(pattern: string, options?: IOptions);
      match(fname: string): boolean;
    }
  }
  
  export = minimatch;
}

// Global type declaration to prevent TypeScript from looking for @types/minimatch
declare global {
  namespace NodeJS {
    interface Global {
      minimatch?: any;
    }
  }
}
