import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { shortData } from '../model/shortData';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { IconButton } from '@mui/material';

export default function BasicCard(props:{dane:shortData[],selectContact:(id:string) => void}) {
    const cards = props.dane.map((text) =>(
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
      <IconButton aria-label="settings" onClick={()=>props.selectContact(text.id)}>
            <ReadMoreIcon />
          </IconButton>
      </Grid>
      </Grid>
        </CardContent>
      </Card>
      
    ));
    return(
      <>
        {cards}
      </>
    )
}