'use server'
import {z} from 'zod';


const formSchema = z.object({
    full_name: z.string().min(3, 'Full name is required'),
    email: z.string().email(),
});
export async function saveForm(prevState, formData) {
    
    const rawdata = {
        full_name: formData.get('full_name'),
        'email': formData.get('email')
    };
    //validate forma data
    const validData = formSchema.safeParse(rawdata);
    if(!validData.success){
        return {   
            ...prevState,
            data:{...prevState, ...rawdata},
            zodError: validData.error.flatten().fieldErrors
        }
    }
    return {
        ...prevState,
        zodError: null,
        message: 'form saved successfully',
      }
}