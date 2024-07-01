"use client";

import React, { ReactElement } from "react";

// Components
import {
  TextInput,
  Input,
  useMantineColorScheme,
} from "../../../../components";

// Hooks
import useForm from "../../../hooks/useForm";

// Types
import { EditorV3Input, ShortText } from "../../../types/FormType";
import { FormBuilder } from "../../../types/Form";

// Tiptap
import { RichTextEditor, Link } from "@mantine/tiptap";
import { BubbleMenu, useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";

function EditorV3Input({
  formElement,
  basePath,
  formKey,
  formBuilderSchema,
}: {
  formElement: EditorV3Input;
  basePath: string;
  formKey: string;
  formBuilderSchema: FormBuilder;
}): ReactElement {
  const {
    inputState,
    captureEditorV3InputChange,
    error,
    visible,
    setBlur,
    setKeyDown,
  } = useForm({
    formElement,
    basePath,
    formKey,
    formBuilderSchema,
  });
  const { colorScheme } = useMantineColorScheme();
  const editor = useEditor({
    extensions: [
      StarterKit as any,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Placeholder.configure({ placeholder: formElement.placeholder as string }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    onBlur: ({ editor }) => {
      captureEditorV3InputChange(editor.getHTML());
    },
  });

  return (
    <React.Fragment>
      {visible && (
        <div className="mb-3 mt-3">
          <Input.Label
            className="font-bold"
            required={(formElement.required as boolean) || false}
          >
            {formElement.label}
          </Input.Label>
          <Input.Description>{formElement.description}</Input.Description>
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            {editor && (
              <BubbleMenu
                className={`${colorScheme == "dark" ? "bg-black" : "bg-white"}`}
                editor={editor}
              >
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.Link />
                  <RichTextEditor.Highlight />
                </RichTextEditor.ControlsGroup>
              </BubbleMenu>
            )}
            <RichTextEditor.Content />
          </RichTextEditor>
          <Input.Error className="mt-1">{error}</Input.Error>
        </div>
      )}
    </React.Fragment>
  );
}

export default EditorV3Input;
