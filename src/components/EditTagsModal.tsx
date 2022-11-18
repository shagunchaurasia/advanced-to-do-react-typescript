import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Tag } from "../App";

interface EditTagsModalProps {
  availableTags: Tag[];
  handleClose: () => void;
  show: boolean;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
}

export const EditTagsModal = ({ availableTags,handleClose,show,updateTag, deleteTag }: EditTagsModalProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => {
              return (
                <Row key={tag.id}>
                  <Col>
                    <Form.Control type="text" value={tag.label} onChange={(e)=> updateTag(tag.id, e.target.value)}></Form.Control>
                  </Col>
                  <Col xs="auto">
                    <Button variant="outline-danger" onClick={()=> deleteTag(tag.id)}>&times;</Button>
                  </Col>
                </Row>
              );
            })}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
