// ** React Imports
import { memo, useEffect, useMemo, useState } from 'react'

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
import { addUser, fetchUsers } from 'src/store/apps/user'

import { chargeCard, initiatePayout } from 'src/store/apps/transactions'
import { fetchCards } from 'src/store/apps/cards'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  cardId: yup.string().required(),
  amount: yup.string().required(),
  narration: yup.string().required()
})

const defaultValues = {
  cardId: '',
  amount: '',
  narration: ''
}

const InitiatePayoutSideBar = props => {
  // ** Props
  const { open, toggle } = props

  const cards = useSelector(state => state.cards)

  // ** State

  // ** Hooks
  const dispatch = useDispatch()

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
    if (data.cardId) {


      if (data.cardId == 'new_card')
        dispatch(initiatePayout({ ...data }))
      else
        dispatch(chargeCard({ ...data }))

      toggle()
      reset()
    }
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  useEffect(() => {
    let done = false
    if (done == false) {
      dispatch(fetchUsers({ all: true, page: 1, limit: 100, orderBy: 'firstName', sort: 'Desc' }))
    }

    return () => {
      done = true
    }
  }, [])
  useEffect(() => {
    let done = false
 
    if (done == false) {
      dispatch(fetchCards({}))
    }

    return () => {
      done = true
    }
  }, [dispatch])
  
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
        <Typography variant='h6'>Initiate Transaction</Typography>
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
            <InputLabel id='select-merchant'>Select Method</InputLabel>
            <Controller
              name='cardId'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <>
                  <Select
                    fullWidth
                    name='cardId'
                    value={value}
                    required
                    id='select-merchant'
                    label='Select Card'
                    labelId='select-merchant'
                    onChange={onChange}
                    inputProps={{ placeholder: 'Select Card' }}
                  >
                    <MenuItem key="new_card" value={"new_card"}>
                     + Add Card
                    </MenuItem>
                    {cards?.cards && cards?.cards?.map((item, index) => (
                      <MenuItem key={index} value={`${item.cardID}`}>
                        **********{item.last4} -{item.bank}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            />
            {errors.recipientId && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.recipientId.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='amount'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Amount'
                  onChange={onChange}
                  placeholder='NGN 0000.00'
                  error={Boolean(errors.amount)}
                />
              )}
            />
            {errors.amount && <FormHelperText sx={{ color: 'error.main' }}>{errors.amount.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='narration'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='description'
                  value={value}
                  rows={4}
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

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default memo(InitiatePayoutSideBar)
