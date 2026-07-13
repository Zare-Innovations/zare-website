import { z } from 'zod';

const baseUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required').max(30),
  role: z.string().min(1, 'Role is required').max(50),
  organizationName: z.string().min(1, 'Organization is required').max(120),
  bankAccount: z.string().min(1, 'Bank account is required').max(120),
  profilePicture: z.string().min(1, 'Profile picture is required'),
});

export const createUserSchema = baseUserSchema.extend({
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Edit mode: password is optional (empty means "don't change").
export const editUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .refine((v) => v === '' || v.length >= 6, {
      message: 'Password must be at least 6 characters',
    }),
});

export type UserFormData = z.infer<typeof createUserSchema>;
