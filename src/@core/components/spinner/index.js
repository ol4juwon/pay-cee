// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = ({ sx }) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
   
      <svg width={82} height={56.375} viewBox='0 0 1920 1920' xmlns='http://www.w3.org/2000/svg'>
        <g fillRule='evenodd' clipRule='evenodd' stroke='none' fill={theme.palette.primary.main} strokeWidth='1'>
          <path d='M933.333 368.375C903.878 368.375 880 392.277 880 421.762C880 451.247 903.878 475.15 933.333 475.15C962.788 475.15 986.667 451.247 986.667 421.762C986.667 392.277 962.788 368.375 933.333 368.375Z' />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M0 213.55H517.333V632.308H624V0H1600V747.424H516.667L234.126 1633.06L337.468 1665.34L596.094 854.199H1920L1729.66 1789.36C1714.51 1865.08 1647.52 1920 1570.48 1920H162.318C72.8265 1920 0 1847.1 0 1757.52V213.55ZM773.333 421.762C773.333 333.307 844.968 261.6 933.333 261.6C1021.7 261.6 1093.33 333.307 1093.33 421.762C1093.33 510.217 1021.7 581.925 933.333 581.925C844.968 581.925 773.333 510.217 773.333 421.762ZM1200 368.375H1466.67V475.15H1200V368.375Z'
          />
        </g>
      </svg>
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
