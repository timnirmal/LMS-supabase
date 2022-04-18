import MDX from "@mdx-js/runtime"

import Layout from '../components/Layout'
import {useEffect, useState} from "react";
import {getServiceSupabase} from "../lib/supabase";


export default function Testpages() {

    const [content, setContent] = useState('')
    const data = "# EasyMDE \nGo ahead, play around with the editor! Be sure to check out **bold**, *italic* and ~~strikethrough~~ styling, [links](https://google.com) and all the other features. You can type the Markdown syntax, use the toolbar, or use shortcuts like `ctrl-b` or `cmd-b`.\n\n<h1>hi</h1>\n<h2>hi</h2>\n<h6>hi</h6>\n\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/3uGYIabvpZ8\" title=\"YouTube video player\" frameBorder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowFullScreen></iframe>\n"

    return (
        <Layout useBackdrop={false} usePadding={true}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <MDX>{data}</MDX>
        </Layout>
    );
}

