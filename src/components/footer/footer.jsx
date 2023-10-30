import { Box, Container, Button, Typography, Paper } from "@mui/material"
import { Link } from "react-router-dom";

function Footer() {
    const footerItems = [
        { text: 'Home', path: '/' },
        { text: 'Favorite books', path: '/favorite-books' },
    ];

    return (
        <Box component="footer" sx={{ backgroundColor: '#174d5e', marginTop: '20px' }}>
            <Paper>
                <Container
                    maxWidth='lg'
                    sx={{
                        padding: '60px 20px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {footerItems.map((item, i) => (
                            <Link key={i} style={{ color: 'white' }} to={item.path}>
                                <Button key={item.text} variant='text' color='inherit'>
                                    {item.text}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography color='inherit'>Powered by &nbsp;
                            <a href="https://www.google.com/"
                                target="_blank"
                            >Gres Maxim</a></Typography>
                    </Box>
                </Container>
            </Paper>
        </Box>
    )
}

export default Footer