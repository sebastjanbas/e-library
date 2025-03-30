'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { LoginScema } from '@/schemas'

export async function login(values: z.infer<typeof LoginScema>) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const data = {
    email: values.username,
    password: values.password
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log('ERROR: ', error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(values: z.infer<typeof LoginScema>) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: values.username,
    password: values.password
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log('ERROR: ', error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
} 

export const logout = async () => {

  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error){
    console.log("LOGOUT ERROR: ", error)
  }
}
