import MDX from "@mdx-js/runtime"

import Layout from '../components/Layout'


export default function Testpages() {

    const data = "# EasyMDE \nGo ahead, play around with the editor! Be sure to check out **bold**, *italic* and ~~strikethrough~~ styling, [links](https://google.com) and all the other features. You can type the Markdown syntax, use the toolbar, or use shortcuts like `ctrl-b` or `cmd-b`.\n\n<h1>hi</h1>\n<h2>hi</h2>\n<h6>hi</h6>\n\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/3uGYIabvpZ8\" title=\"YouTube video player\" frameBorder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowFullScreen></iframe>\n"
    //const data = "# Hi\n\n##  Title \n\nDescuosdionipoe ieiwueo ueoiweweuwioeu weiweu wieowje woiewhe oudhdjhd skjdd sdjhdsjdh\n\n\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n\n\n\n-----\n\n\n[google](https://google.com)\n\n1. itme 1\n2. item 2\n\n*  opriton 1\n*  option 2\n\n> ojsojwdw\n> jwoe\n> wojeowje\n> owjeowejw\n\n```js\nimport msoaoi 0 aopis oai oais \n```\n"
    //const data = "# Hi\n\n##  Title \n\nDescuosdionipoe ieiwueo ueoiweweuwioeu weiweu wieowje woiewhe oudhdjhd skjdd sdjhdsjdh\n\n\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n\n\n\n-----\n\n\n[google](https://google.com)\n\n1. itme 1\n2. item 2\n\n*  opriton 1\n*  option 2\n\n> ojsojwdw\n> jwoe\n> wojeowje\n> owjeowejw\n\n```js\nimport msoaoi 0 aopis oai oais \n```\n\n![word cloud](https://res.cloudinary.com/dvxrsopw3/image/upload/v1650286836/yeqfvb9ttclor3iptwrr.png)"

    return (
        <div>
            <h1>h1 Tag</h1>
            <MDX>{data}</MDX>

        </div>
    );
}

