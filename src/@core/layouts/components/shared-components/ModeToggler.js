// ** MUI Imports
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ModeToggler = props => {
  // ** Props
  const { settings, saveSettings } = props

  const handleModeChange = mode => {
    saveSettings({ ...settings, mode: mode })
  }

  const handleModeToggle = () => {
    if (settings.mode === 'semi-dark') {
      handleModeChange('dark')
    } else {
      handleModeChange('semi-dark')
    }
  }

  return (
    <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
      <Icon fontSize='1.5rem' icon={settings.mode === 'dark' ? 'tabler:sun' : 'tabler:moon-stars'} />
    </IconButton>
  )
}

export default ModeToggler
