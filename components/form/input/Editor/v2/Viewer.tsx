"use client";

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { useMantineColorScheme } from "@mantine/core";
import { transformContentToBlock } from "../../../lib/editorV2";
import { EditorV2Output } from "../../../types/FormType";

export default function EditorV2Viewer({ state }: { state: EditorV2Output }) {
  const editorV2: BlockNoteEditor = useBlockNote({
    // Set initial state of the editor (internal state)
    async onEditorReady(editor) {
      const editorBlocks = await transformContentToBlock(editor, state);

      editor.replaceBlocks(editor.topLevelBlocks, editorBlocks as any);
    },
    editable: false,
  });

  const { colorScheme } = useMantineColorScheme();

  return (
    <div className="mb-3 mt-3 max-w-[90vw] md:max-w-[60vw]">
      <BlockNoteView editor={editorV2} theme={colorScheme} />
    </div>
  );
}
