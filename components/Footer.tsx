import { TITLE } from '@/config/constants'
import { Box, Container, Grid, Typography } from '@mui/material'
import React, { FC, ReactElement } from 'react'

const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'background.default',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        position: 'fixed',
        bottom: 0,
        left: 0
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              {`${new Date().getFullYear()}`} © {TITLE}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
