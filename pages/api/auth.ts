import { NextApiRequest, NextApiResponse} from 'next'
import { supabaseClient } from '../../lib/supabase'

export default function handler(req: NextApiRequest , res: NextApiResponse) {
    supabaseClient.auth.api.setAuthCookie(req, res)
}
