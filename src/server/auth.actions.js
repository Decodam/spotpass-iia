'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/server.supa' 



export async function loginWithEmailPassword(formData) {
  const supabase = createClient()

  const { email, password } = formData

  if (!email || !password) {
    return { message: 'Email and password are required.' }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { message: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}


export async function signupWithEmailPassword(formData) {
  const supabase = createClient();

  const { email, password, name } = formData;

  if (!email || !password || !name) {
    return { message: 'Email, password, and full name are required.' };
  }

  const { error, data: { user } } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { message: error.message};
  }

  if (!user) {
    return { message: 'Sign up was successful, but user data is not available.' };
  }


  // Use upsert to insert or update the profile
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({ id: user.id, full_name: name, email }, { onConflict: ['id'] });

  if (profileError) {
    return { message: profileError.message};
  }

  revalidatePath('/', 'layout');
  redirect('/');
}


export async function logoutCurrentUser() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { message: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/login');
}