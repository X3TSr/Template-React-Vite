/**
 * A collection of utilities for converting strings to different case formats.
 */
export const StringUtils = {
  /**
   * Convert a string to sentence case (capitalize the first letter).
   * @example StringUtils.toSentenceCase("hello world") // "Hello world"
   */
  toSentenceCase(str: string): string {
    return str
      .replace(/[a-z]/i, (letter: string) => letter.toUpperCase())
      .trim();
  },

  /**
   * Convert a string to title case (insert spaces before capitals, capitalize first letter).
   * @example StringUtils.toTitleCase("helloWorld") // "Hello World"
   */
  toTitleCase(str: string): string {
    return StringUtils.toSentenceCase(str)
      .replace(/[A-Z]/g, (text: string) => " " + text)
      .trim();
  },

  /**
   * Convert a string to camelCase.
   * @example StringUtils.toCamelCase("Hello world") // "helloWorld"
   * @example StringUtils.toCamelCase("hello_world") // "helloWorld"
   */
  toCamelCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\s+(.)/g, (_match: string, letter: string) => letter.toUpperCase())
      .replace(/^\w/, (letter: string) => letter.toLowerCase())
      .replace(/[-_]/g, "");
  },

  /**
   * Convert a string to PascalCase.
   * @example StringUtils.toPascalCase("hello world") // "HelloWorld"
   * @example StringUtils.toPascalCase("hello_world") // "HelloWorld"
   */
  toPascalCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\s+(.)/g, (_match: string, letter: string) => letter.toUpperCase())
      .replace(/^\w/, (letter: string) => letter.toUpperCase())
      .replace(/[-_]/g, "");
  },

  /**
   * Convert a string to kebab-case.
   * @example StringUtils.toKebabCase("helloWorld") // "hello-world"
   * @example StringUtils.toKebabCase("Hello World") // "hello-world"
   */
  toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/\s+/g, "-")
      .replace(/_+/g, "-")
      .replace(/&/g, "")
      .toLowerCase()
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");
  },

  /**
   * Convert a string to snake_case.
   * @example StringUtils.toSnakeCase("helloWorld") // "hello_world"
   * @example StringUtils.toSnakeCase("Hello World") // "hello_world"
   */
  toSnakeCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .replace(/\s+/g, "_")
      .replace(/-/g, "_")
      .replace(/&/g, "")
      .toLowerCase()
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");
  }
} as const;
