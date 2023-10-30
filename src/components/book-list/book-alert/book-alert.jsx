import Alert from '@mui/material/Alert';

function BookAlert({ isSuccess }) {
    return (
        <>
            {
                isSuccess ? (
                    <Alert
                        sx={{ position: 'fixed', bottom: 0 }}
                        severity="success"
                    > Book has been added to favorite!</Alert >
                ) : (
                    <Alert
                        sx={{ position: 'fixed', bottom: 0 }}
                        severity="info"
                    >Book has been deleted from favorite!</Alert>
                )
            }
        </>
    )
}

export default BookAlert