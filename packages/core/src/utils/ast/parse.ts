import * as parser from '@babel/parser';
import type { ParserPlugin } from '@babel/parser';
import * as t from '@babel/types';

export default function parse(
  code: string,
  opts: {
    excludePlugins?: ParserPlugin[];
    includePlugins?: ParserPlugin[];
  } = {},
): t.File {
  const excludePlugins = opts.excludePlugins || [];
  const includePlugins = opts.includePlugins || [];
  const plugins = (
    [
      'jsx',
      'typescript',
      'classProperties',
      'dynamicImport',
      'exportDefaultFrom',
      'exportNamespaceFrom',
      'functionBind',
      'nullishCoalescingOperator',
      'objectRestSpread',
      'optionalChaining',
      'decorators-legacy',
      ...includePlugins,
    ] as ParserPlugin[]
  ).filter((p) => {
    return !excludePlugins.includes(p);
  });
  return parser.parse(code, {
    sourceType: 'module',
    plugins,
    allowAwaitOutsideFunction: true,
  });
}
