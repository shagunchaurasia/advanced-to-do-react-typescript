import React, { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NewNote } from "./components/NewNote";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import { NoteList } from "./components/NoteList";
import { NoteDisplay } from "./components/NoteDisplay";
import { Note } from "./components/Note";
import { EditNote } from "./components/EditNote";

export type Tag = {
  id: string;
  label: string;
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((previousNotes) => {
      return [
        ...previousNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((previousNotes) => {
      return previousNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  };
  const addTag = (tag: Tag) => {
    setTags((previousState) => [...previousState, tag]);
  };

  const updateTag = (id: string, label: string) => {
    setTags((previousState) => {
      return previousState.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  };

  const deleteTag = (id: string) => {
    setTags((previousState) => {
      return previousState.filter((tag) => tag.id !== id);
    });
  };

  const onDeleteNote = (id: string) => {
    setNotes((previousState) => {
      return previousState.filter((note) => note.id !== id);
    });
  };

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList availableTags={tags} notes={notesWithTags} updateTag={updateTag} deleteTag={deleteTag}/>}
        ></Route>
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        ></Route>
        <Route path="/:id" element={<NoteDisplay notes={notesWithTags} />}>
          <Route index element={<Note onDeleteNote={onDeleteNote} />}></Route>
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          ></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
