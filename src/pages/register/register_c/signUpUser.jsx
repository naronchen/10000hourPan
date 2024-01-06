import { supabase } from '../../../client/supabaseClient'

export async function signUpUser(username, password, confirmPassword){
    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }
    const dummyEmail = `${username}@10000hourplan.com`;

    const {user, error} = await supabase.auth.signUp({
        email: dummyEmail,
        password: password,
    });

    if (user)  throw new Error('Username already exists');
    if (error && !user) throw new Error(error.message);

    return user;

}