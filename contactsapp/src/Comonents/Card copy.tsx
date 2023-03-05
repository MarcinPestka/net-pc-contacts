import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { contactData } from '../model/shortData';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, Col, Container, Row } from 'react-bootstrap';

export default function BasicCard2() {

  return (
    <>
      <Card>
        <Card.Body>
          <Container>
            <Row>
              <Col>Imie</Col>
              <Col>Nazwisko</Col>
            </Row>
            <Row>
              <Col>Test</Col>
              <Col>Test2</Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  )
}