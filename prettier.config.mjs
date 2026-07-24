/**
 * Prettier: единый стиль форматирования для TS/Vue/CSS/JSON
 * @type {import('prettier').Config}
 */
export default {
  // Без точек с запятой — как в типичном Vue/TS стиле проекта
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  // Шире дефолтных 80 — меньше шумных переносов в Vue-шаблонах
  printWidth: 100,
  tabWidth: 2,
  // LF на всех ОС, чтобы не было диффов из-за CRLF
  endOfLine: 'lf',
  vueIndentScriptAndStyle: false,
}
