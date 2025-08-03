import { z } from 'zod';

export const jobSchema = z
  .object({
    title: z.string().min(2).max(100).nonempty(),
    yearsOfExperience: z.number().min(0).max(50).int(),
    location: z.string().min(2).max(100).nonempty(),
    type: z.enum(['Remote', 'On-site', 'Hybrid']),
    workType: z.enum(['Full-Time', 'Part-Time', 'Contract', 'Freelance']),
    skills: z.array(z.string()).min(1).max(10),
    startDate: z.preprocess(
      (val) => (val instanceof Date ? val : null),
      z.date().refine((date) => date >= new Date(), {
        message: 'Start date cannot be in the past',
      })
    ),
    endDate: z.preprocess(
      (val) => (val instanceof Date ? val : null),
      z.date()
    ),
    description: z.string().min(10).nonempty(),
  })
  .refine((data) => data.endDate > data.startDate, {
    path: ['endDate'],
    message: 'End date must be after start date',
  });

export type JobFormData = z.infer<typeof jobSchema>;
