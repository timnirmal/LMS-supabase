import {supabaseClient, getServiceSupabase} from "../../lib/supabase";

export const insertPost = async () => {
    const {data, error} = await supabaseClient
        .from('posts')
        .insert([
            {some_column: 'someValue', other_column: 'otherValue'},
        ])
}

export const getAllPosts = async () => {
    getServiceSupabase()
        .from("posts")
        .select("*")
        .order("inserted_at", { ascending: false })
        .then(({ data, error }) => {
            if (data) {return data}
        });
}
