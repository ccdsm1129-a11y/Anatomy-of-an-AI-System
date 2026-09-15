import maleSvg from '@ebi-gene-expression-group/anatomogram/lib/svg/homo_sapiens.male.svg?raw';
import brainSvg from '@ebi-gene-expression-group/anatomogram/lib/svg/homo_sapiens.brain.svg?raw';
import type { ViewId } from '../types';

export const SVG_RAW: Record<ViewId, string> = {
  full: maleSvg,
  brain: brainSvg,
};
