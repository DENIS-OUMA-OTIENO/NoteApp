import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import TextInputField from "./form/TextInputField";

interface AddNoteDialogProps {
  NoteToEdit?: Note,
  onDismiss: () => void;
  onNoteSave: (note: Note) => void;
}
const AddNoteEditDialog = ({ NoteToEdit, onDismiss, onNoteSave }: AddNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: NoteToEdit?.title || "",
      text: NoteToEdit?.text || ""
    }
  });

  async function onSubmitNote(input: NoteInput) {
    try {
      let noteResponse: Note;
      if(NoteToEdit) {
        noteResponse = await NotesApi.updateNote(NoteToEdit._id, input);

      } else {
        noteResponse = await NotesApi.createNote(input);
      }

      onNoteSave(noteResponse);
    } catch (error) {
      alert(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{NoteToEdit ? "Edit Note" : "Add Note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmitNote)}>
          <TextInputField
         name="title"
         label="Title"
         type="text"
         placeholder="Title"
         register={register} 
         registerOptions={{required: "Required"}}
         error={errors.title}
          />

          <TextInputField 
          name="text"
          label="Note"
          placeholder="note"
          as="textarea"
          rows={5}
          register={register}
          />
        
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNoteEditDialog;
