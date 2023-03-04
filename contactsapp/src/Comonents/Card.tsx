import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { contactData } from '../model/shortData';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BasicCard(props: { contacts: contactData[], selectContact: (id: string) => void, deleteContact: (id: string) => void, refresh: () => void }) {
  const cards = props.contacts.map((text) => (
    <Card sx={{ minWidth: 275 }} id="card" key={text.id}>
      <CardContent>
        <Grid container rowSpacing={1}>
          <Grid item xs={5}>
            <p id="card-title">Imie</p>
            <h3 id="card-text-value">{text.firstName}</h3>
          </Grid>
          <Grid item xs={5}>
            <p id="card-title">Nazwisko</p>
            <h3 id="card-text-value">{text.lastName}</h3>
          </Grid>
          <Grid item xs={2}>
            <IconButton aria-label="settings" onClick={() => props.selectContact(text.id)}>
              <ReadMoreIcon />
            </IconButton>
            <IconButton aria-label="settings" onClick={() => { props.deleteContact(text.id); props.refresh(); }}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

  ));
  return (
    <>
      {cards}
    </>
  )
}