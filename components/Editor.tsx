import React, {useMemo, useState} from "react";
import SimpleMDEditor from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios'
import Layout from "../components/Layout";

type ImageUploadType = {
  (image: File,
   onSuccess: (url: string) => void,
   onError: (errorMessage: string) => void): void
}

const Editor = () => {
  const [value, setValue] = useState("");

  const onChange = (value: string) => {
    setValue(value);
  };

  // Upload image
  const imageUpload: ImageUploadType = async (image, onSuccess, onError) => {
    try {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'igtpzjq7');
      const res = await axios.post('https://api.cloudinary.com/v1_1/dvxrsopw3/image/upload', data);
      const {secure_url} = res.data;
      onSuccess(secure_url)
    } catch (error) {
      console.error(error)
    }
  }

  const newOptions = useMemo(() => {
    return {
      spellChecker: true,
      showIcons: ["strikethrough", "table", "code", "upload-image", "horizontal-rule"],
      hideIcons: ["image"],
      uploadImage: true,
      autofocus: true,
      //TODO: Setup based on user id
      // autosave: {
      //   enabled: true,
      //   uniqueId: {user.id}
      //   delay: 1000,
      // },
      /*toolbar: [
        "bold",
        "italic",
        "strikethrough",
        "heading",
        "|",
        "code",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
        "table",
        "horizontal-rule",
        "|",
        "preview",
        "side-by-side",
        "fullscreen",
        "|",
        "guide",
      ],*/
      promptURLs: true,
      codeSyntaxHighlighting: true,
      imageUploadFunction: imageUpload,
    };
  }, []);


  return (
      <Layout useBackdrop={false} usePadding={true}>
        <SimpleMDEditor
            id="editor"
            value={value}
            onChange={onChange}
            options={newOptions}
        />
        <button onClick={() => {
          console.log(JSON.stringify(value))
        }}>
          Create Post
        </button>
      </Layout>
  )
}


export default Editor;