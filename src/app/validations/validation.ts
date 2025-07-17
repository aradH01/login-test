import { z } from 'zod';

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, 'شماره تلفن الزامی است')
    .refine((value) => {

      const iranPhoneRegex = /^(\+98|0)?9\d{9}$/;
      return iranPhoneRegex.test(value.replace(/[\s\-\(\)]/g, ''));
    }, 'شماره تلفن معتبر نیست (فرمت ایران)'),
});

export type PhoneFormData = z.infer<typeof phoneSchema>;
