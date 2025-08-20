import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email is required')
    .max(100, 'Email must be less than 100 characters'),
  
  projectType: z
    .string()
    .min(1, 'Please select a project type'),
  
  budget: z
    .string()
    .min(1, 'Please select a budget range'),
  
  timeline: z
    .string()
    .min(1, 'Please select a timeline'),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  
  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  
  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const projectTypes = [
  { value: 'brand-identity', label: 'Brand Identity' },
  { value: 'ui-ux-design', label: 'UI/UX Design' },
  { value: 'packaging-design', label: 'Packaging Design' },
  { value: 'motion-graphics', label: 'Motion Graphics' },
  { value: 'web-design', label: 'Web Design' },
  { value: 'consultation', label: 'Design Consultation' },
  { value: 'other', label: 'Other' },
];

export const budgetRanges = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: 'over-50k', label: 'Over $50,000' },
  { value: 'discuss', label: 'Let\'s discuss' },
];

export const timelines = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-2-weeks', label: '1-2 weeks' },
  { value: '1-month', label: '1 month' },
  { value: '2-3-months', label: '2-3 months' },
  { value: '3-months-plus', label: '3+ months' },
  { value: 'flexible', label: 'Flexible' },
];