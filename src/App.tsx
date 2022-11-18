import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>Hi H1</h1>}></Route>
        <Route path="/new" element={<h1>New </h1>}></Route>
        <Route path="/:id">
          <Route index element={<h1>Show</h1>}></Route>
          <Route path="edit" element={<h1>Edit</h1>}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
