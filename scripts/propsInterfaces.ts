import { writeFileSync } from 'fs'
import { toPropsInterfaces } from '../source-transforms/toPropsInterfaces'

writeFileSync(
  'src/state/propsInterfaces.ts',
  toPropsInterfaces()
)
