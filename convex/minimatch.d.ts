// Type declaration for minimatch to resolve compilation errors in Convex
declare module 'minimatch' {
  function minimatch(target: string, pattern: string, options?: any): boolean;
  namespace minimatch {
    function filter(pattern: string, options?: any): (target: string) => boolean;
    function match(list: string[], pattern: string, options?: any): string[];
    function makeRe(pattern: string, options?: any): RegExp | false;
  }
  export = minimatch;
}
