import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useContext } from "react";
import { ThemeContext } from "../providers/themeProvider";

export const Editor = ({ content, onChange, editable }) => {
   const parsedContent = content ? content : undefined;
   const editor = useCreateBlockNote({
      initialContent: parsedContent,
   });
   const { theme } = useContext(ThemeContext);

   function handleChange() {
      onChange(editor?.document);
   }

   return (
      <BlockNoteView
         editor={editor}
         theme={theme}
         editable={editable}
         onChange={handleChange}
         data-theming-css-variables-demo
      />
   );
};
