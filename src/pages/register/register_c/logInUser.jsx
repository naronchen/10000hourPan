import { supabase } from "../../../client/supabaseClient";

export async function logInUser(username, password) {
    const dummyEmail = `${username}@10000hourplan.com`;

    const { user, error } = await supabase.auth.signInWithPassword({
        email: dummyEmail,
        password: password,
    });

    if (error && !user) throw new Error(error.message);

    return user;
}