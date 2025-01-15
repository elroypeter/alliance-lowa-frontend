import React, { useRef } from 'react';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
export default function Editor(props) {
    const editorRef = useRef(null);

    const file_picker_callback = (callback) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.onchange = ($event) => {
            const file = $event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const id = 'blobid' + new Date().getTime();
                const blobCache = editorRef.current.editorUpload.blobCache;
                const base64 = reader.result.split(',')[1];
                const blobInfo = blobCache.create(id, file, base64);

                blobCache.add(blobInfo);
                callback(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
        };

        input.click();
    };

    return (
        <TinyEditor
            tinymceScriptSrc="/assets/tinymce/tinymce.min.js"
            value={props.value}
            onInit={(evt, editor) => {
                editorRef.current = editor;
            }}
            onEditorChange={(newValue) => props.onChange({ target: { value: newValue } })}
            init={{
                menubar: 'file edit view insert format tools table help',
                plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'help',
                    'wordcount',
                ],
                toolbar_sticky: true,
                toolbar:
                    'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | \
        outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | \
        insertfile image media template link anchor codesample | ltr rtl',
                image_title: true,
                automatic_uploads: true,
                file_picker_types: 'image',
                file_picker_callback: file_picker_callback,
            }}
        />
    );
}
