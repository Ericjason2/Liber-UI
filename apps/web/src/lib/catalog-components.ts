import { TAILWINDFLEX_COMPONENTS } from "../data/tailwindflex-components";
import {
  BASE_COMPONENTS,
  SAMPLE_BLOCKS,
  TOTAL_COMPONENTS_COUNT,
  type BlockItem,
  type ComponentItem,
} from "./catalog-components-base";

export {
  BASE_COMPONENTS,
  SAMPLE_BLOCKS,
  TOTAL_COMPONENTS_COUNT,
  type BlockItem,
  type ComponentItem,
};

export const SAMPLE_COMPONENTS: ComponentItem[] = [
  ...TAILWINDFLEX_COMPONENTS.filter(
    (tf) => !BASE_COMPONENTS.some((base) => base.slug === tf.slug)
  ),
  ...BASE_COMPONENTS,
];
