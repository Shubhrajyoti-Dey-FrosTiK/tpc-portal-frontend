import React from "react";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";

function Viewer({ content }: { content: string }) {
  const editor = useEditor({
    content,
    extensions: [
      StarterKit as any,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editable: false,
  });

  return (
    <div>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Content />
      </RichTextEditor>
    </div>
  );
}

export default Viewer;
