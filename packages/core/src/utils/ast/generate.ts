import * as t from '@babel/types';
import generator from '@babel/generator';

export default function generate(ast: t.File): string {
  return generator(ast, {
    retainLines: false,
    sourceMaps: false,
    decoratorsBeforeExport: true,
  }).code;
}
