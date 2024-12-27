"use server";
import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  content: z.string().min(50, { message: 'Must be 50 or more characters long' }),
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: 'File cannot be empty' })
    .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'File size must not exceed 5MB' })
    .refine(
      (file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
      { message: 'Unsupported file type. Only JPEG, JPG, and PNG are allowed' }
    ),
});

export async function saveBlog(prevState, formData) {
  // Create rawData object for validation
  
  const rawData = {
    title: formData.get('title'),
    content: formData.get('content'),
    file: formData.get('file'),
  };
  
  // Validate the rawData against the schema
  const validateSchema = blogSchema.safeParse(rawData);
  //console.log(validateSchema);
  if (!validateSchema.success) {
    return {
      ...prevState,
      zodError: validateSchema.error.flatten().fieldErrors,
      data: { ...prevState, ...rawData },
    };
  }

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${API_URL}posts`, {
      method: 'POST',
      body: formData, // Directly pass FormData
    });

    if (!response.ok) {
      throw new Error('Failed to save blog');
    }

    const result = await response.json();
    return {
      ...prevState,
      data: result,
      success: true,
    };
  } catch (error) {
    return {
      ...prevState,
      error: error.message,
      success: false,
    };
  }
}
