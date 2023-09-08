// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import Form from 'src/views/apps/receivable/form'

const FormLayouts = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
       
        <Grid item xs={12}>
          <Form />
        </Grid>
       
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
