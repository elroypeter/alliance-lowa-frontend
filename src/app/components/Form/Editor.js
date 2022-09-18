import React from "react";
import { Editor as TinyEditor } from "@tinymce/tinymce-react";

export default function Editor(props) {
    return (
        <TinyEditor
            tinymceScriptSrc="/assets/tinymce/tinymce.min.js"
            value={props.value}
            onEditorChange={(newValue) =>
                props.onChange({ target: { value: newValue } })
            }
        />
    );
}
