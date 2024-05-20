import {z} from 'zod'

export const clubSchema = z.object({
    title: z.string().min(3, 'Title must be atleast 3 characters').max(50,'Title must be maximum 50 characters'),
    description: z.string().min(3,'Description must be atleast 3 characters').max(1000,'Description can be atmost 500 characters'),
    thumbnail:z.string(),
    category:z.string(),
  })