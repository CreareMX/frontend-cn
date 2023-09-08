// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeader = props => {
  const router = useRouter()

  // ** Props
  const { handleFilter, toggle, value } = props

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/* <Button color='secondary' variant='outlined' startIcon={<Icon icon='tabler:upload' />}>
        Export
      </Button> */}
      <Typography
                noWrap
                sx={{
                  fontSize:'22px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                Punto de venta
              </Typography>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4 }}
          placeholder='Buscar'
          onChange={e => handleFilter(e.target.value)}
        />
      </Box>
    </Box>
  )
}

export default TableHeader
