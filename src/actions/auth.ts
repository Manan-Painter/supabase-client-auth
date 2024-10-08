"use server";

import { getAuth } from "@/supabase/auth/server";

export const loginAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const auth = await getAuth();

    const { error } = await auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: "Something went wrong" };
  }
};

export const signOutAction = async () => {
  try {
    const auth = await getAuth();

    const { error } = await auth.signOut();

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: "Something went wrong" };
  }
};

export const signupAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const auth = await getAuth();

    const { error } = await auth.signUp({
      email,
      password,
    });

    console.log(error)

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    console.log(error)
    return { errorMessage: "Something went wrong" };
  }
};