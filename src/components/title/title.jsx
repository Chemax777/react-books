import { Typography } from '@mui/material'

function Title({ text }) {
    return (
        <Typography component="h3" color='primary' variant="h3" sx={{ textAlign: 'center' }}>{text}</Typography>
    )
}

export default Title