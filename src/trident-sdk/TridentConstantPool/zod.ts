import { Fee } from '@sushiswap/base-sdk'
import { amountSchema } from '@sushiswap/currency'
import * as z from 'zod'

export const tridentConstantPoolSchema = z.object({
  reserve0: amountSchema,
  reserve1: amountSchema,
  fee: z.nativeEnum(Fee),
  twap: z.boolean(),
})

export type SerializedConstantPool = z.infer<typeof tridentConstantPoolSchema>
