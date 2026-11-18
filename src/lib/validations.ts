import { z } from 'zod';

export const bookingFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z
    .string()
    .min(10, 'Valid 10-digit phone number is required')
    .max(15)
    .regex(/^[0-9+\s\-()]{10,15}$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  dob: z.string().optional().or(z.literal('')),
  birthTime: z.string().optional().or(z.literal('')),
  birthPlace: z.string().optional().or(z.literal('')),
  serviceId: z.coerce.number().optional().nullable(),
  serviceName: z.string().optional().or(z.literal('')),
  preferredDate: z.string().optional().or(z.literal('')),
  preferredTimeSlot: z.string().optional().or(z.literal('')),
  selectedProblem: z.string().optional().or(z.literal('')),
  message: z.string().max(1000, 'Message cannot exceed 1000 characters').optional().or(z.literal('')),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;

export const serviceSchema = z.object({
  title: z.string().min(2, 'Title is required').max(150),
  slug: z.string().min(2, 'Slug is required').max(100),
  shortDescription: z.string().max(255).optional().or(z.literal('')),
  description: z.string().min(10, 'Description is required'),
  icon: z.string().default('Sparkles'),
  imageUrl: z.string().optional().or(z.literal('')),
  price: z.coerce.number().min(0, 'Price must be 0 or more'),
  currency: z.string().default('INR'),
  durationMinutes: z.coerce.number().min(5, 'Duration must be at least 5 mins'),
  consultationMethod: z.string().default('Online Video / Voice Call'),
  displayOrder: z.coerce.number().default(0),
  isActive: z.coerce.boolean().default(true),
  isFeatured: z.coerce.boolean().default(false),
});

export const problemCategorySchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  slug: z.string().min(2, 'Slug is required').max(100),
  description: z.string().optional().or(z.literal('')),
  icon: z.string().default('Compass'),
  displayOrder: z.coerce.number().default(0),
  isActive: z.coerce.boolean().default(true),
});

export const problemQuestionSchema = z.object({
  categoryId: z.coerce.number().min(1, 'Category is required'),
  serviceId: z.coerce.number().optional().nullable(),
  question: z.string().min(5, 'Question is required').max(255),
  description: z.string().optional().or(z.literal('')),
  inquiryBtnLabel: z.string().default('Inquiry'),
  displayOrder: z.coerce.number().default(0),
  isActive: z.coerce.boolean().default(true),
});

export const testimonialSchema = z.object({
  clientName: z.string().min(2, 'Client name is required').max(150),
  location: z.string().optional().or(z.literal('')),
  serviceName: z.string().optional().or(z.literal('')),
  rating: z.coerce.number().min(1).max(5).default(5),
  reviewText: z.string().min(10, 'Review text is required'),
  clientPhotoUrl: z.string().optional().or(z.literal('')),
  videoUrl: z.string().optional().or(z.literal('')),
  isFeatured: z.coerce.boolean().default(false),
  isApproved: z.coerce.boolean().default(true),
  isPublished: z.coerce.boolean().default(true),
  displayOrder: z.coerce.number().default(0),
});

export const adminUserSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  roleId: z.coerce.number().min(1, 'Role is required'),
  phone: z.string().optional().or(z.literal('')),
  isActive: z.coerce.boolean().default(true),
});

export const astrologerProfileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  title: z.string().min(2, 'Title is required'),
  shortBio: z.string().optional().or(z.literal('')),
  biography: z.string().min(10, 'Biography is required'),
  experienceYears: z.coerce.number().min(0),
  consultationsCount: z.coerce.number().min(0),
  qualifications: z.union([z.array(z.string()), z.string()]),
  specialisations: z.union([z.array(z.string()), z.string()]),
  personalJourney: z.string().optional().or(z.literal('')),
  philosophy: z.string().optional().or(z.literal('')),
  values: z.string().optional().or(z.literal('')),
  ethicsPledge: z.string().optional().or(z.literal('')),
  contactNumber: z.string(),
  whatsappNumber: z.string(),
  location: z.string(),
});
