import { useState } from 'react'
import { Box, Container, Typography, TextField, Button, Paper, Snackbar, CircularProgress } from '@mui/material'
import Alert from '@mui/material/Alert'
import axios from 'axios'

const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | success | error
  const [toastOpen, setToastOpen] = useState(false)
  const [toastSeverity, setToastSeverity] = useState('success') // 'success' | 'error'
  const [toastMessage, setToastMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setToastSeverity('error')
      setToastMessage('Please enter a valid email')
      setToastOpen(true)
      return
    }

    try {
      setIsSubmitting(true)
      await axios.post('https://nextface-api.onrender.com/api/subscription', { email })
      setStatus('success')
      setEmail('')
      setToastSeverity('success')
      setToastMessage('You subscribed successfully')
      setToastOpen(true)
    } catch (err) {
      setToastSeverity('error')
      console.log(err)
      const apiMessage = err.response.data || 'Subscription failed. Please try again.'
      setToastMessage(apiMessage)
      setToastOpen(true)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const handleToastClose = (_event, reason) => {
    if (reason === 'clickaway') return
    setToastOpen(false)
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', borderRadius: 3, border: '1px solid #e0e0e0' }}>
          <Typography variant="h2" color="primary" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, mb: 2 }}>
            Subscribe to our newsletter
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            Get the latest updates about NextFace events, speakers, and announcements.
          </Typography>
          <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center' }}>
            <TextField
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={status === 'error'}
              sx={{ flex: 1, minWidth: { xs: '100%', sm: 320 } }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ px: 4 }} disabled={isSubmitting} startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : null}>
              {'Subscribe'}
            </Button>
          </Box>
          <Snackbar
            open={toastOpen}
            autoHideDuration={3000}
            onClose={handleToastClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleToastClose} severity={toastSeverity} variant="filled" sx={{ width: '100%' }}>
              {toastMessage}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </Box>
  )
}

export default NewsletterSection


