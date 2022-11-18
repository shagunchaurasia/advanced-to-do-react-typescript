import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note } from "../App";

type NoteLayoutProps = {
  notes: Note[];
};
export const NoteDisplay = ({ notes }: NoteLayoutProps) => {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);
  if (note == null) {
    return <Navigate to="/" replace></Navigate>;
  }
  return <Outlet context={note}></Outlet>;
};

export function useNote(){
  return useOutletContext<Note>()
}