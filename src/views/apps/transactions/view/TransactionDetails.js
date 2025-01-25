// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addUser } from 'src/store/apps/user'
import { Switch } from '@mui/material'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  name: yup.string().required(),
})



const TransactionDetails = props => {
  // ** Props
  const { open, toggle, details } = props

  // const users = useSelector(state => state.user)

  // ** State
  const [role, setRole] = useState('USER')

  // ** Hooks
  const dispatch = useDispatch()

  const defaultValues = {
    name: details?.id,
    amount: details?.amount,
    channel: details?.channel,
    narration: details?.status
  }

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    dispatch(addUser({ ...data, role }))

    toggle()
    reset()
  }

  const handleClose = () => {
    setRole('USER')
    toggle()
    reset()
  }

  // useEffect(() => {
  //   let done = false
  //   if (done == false) {

  //   }

  //   return () => {
  //     done = true
  //   }
  // }, [users.loading])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Transaction details</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{ borderRadius: 1, color: 'text.primary', backgroundColor: 'action.selected' }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='ID'
              disabled
                  onChange={onChange}
                  placeholder='Sterling Bank'
                  error={Boolean(errors.fullName)}
                />
              )}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='amount'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  disabled
                  label='Amount'
                  onChange={onChange}
                  placeholder='gtb'
                  error={Boolean(errors.amount)}
                />
              )}
            />
            {errors.amount && <FormHelperText sx={{ color: 'error.main' }}>{errors.amount.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='channel'
              control={control}
           

              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Channel'
                  disabled
                  onChange={onChange}
                  placeholder='gtb'
                  error={Boolean(errors.channel)}
                />
              )}
            />
            {errors.channel && <FormHelperText sx={{ color: 'error.main' }}>{errors.channel.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='narration'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='narration'
                  value={value}
                  rows={2}   
                  disabled
                  multiline
                  label='Narration'
                  onChange={onChange}
                  placeholder='Lorem ipsum'
                  error={Boolean(errors.narration)}
                />
              )}
            />
            {errors.narration && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.narration.message}</FormHelperText>
            )}
          </FormControl>
        </form>
      </Box>
    </Drawer>
  )
}

export default TransactionDetails
