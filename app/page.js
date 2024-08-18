'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from "next/head";

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      }
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <Container maxWidth="100vw" sx={{ backgroundColor: "#1e1e1e", minHeight: "100vh", color: "#c5c6c7", padding: "0" }}>
      <Head>
        <title>Flashcards</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>

      <AppBar position="static" sx={{ backgroundColor: "#282c34" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: "monospace" }}>
            Flashcards
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ color: "#61dafb" }}>
              Login
            </Button>
            <Button color="inherit" href="/sign-up" sx={{ color: "#61dafb" }}>
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          textAlign: 'center',
          my: 4,
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ fontFamily: "monospace", color: "#61dafb" }}>
          Welcome to Flashcards
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: "monospace" }}>
          The easiest way to make flashcards from your text
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, backgroundColor: "#61dafb", color: "#1e1e1e" }}
        >
          Get Started
        </Button>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: "monospace", color: "#61dafb" }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#61dafb',
                borderRadius: 2,
                backgroundColor: "#282c34",
                color: "#c5c6c7"
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "monospace" }}>
                Easy Text Input
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: "monospace" }}>
                Simply input your text and let our software do the rest. Creating flashcards has never been easier.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#61dafb',
                borderRadius: 2,
                backgroundColor: "#282c34",
                color: "#c5c6c7"
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "monospace" }}>
                Smart Flashcards
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: "monospace" }}>
                Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#61dafb',
                borderRadius: 2,
                backgroundColor: "#282c34",
                color: "#c5c6c7"
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "monospace" }}>
                Accessible Anywhere
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: "monospace" }}>
                Access your flashcards from any device, at any time. Study on the go with ease.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: "monospace", color: "#61dafb" }}>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#61dafb',
                borderRadius: 2,
                backgroundColor: "#282c34",
                color: "#c5c6c7"
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "monospace" }}>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: "monospace" }}>
                $5 / month
              </Typography>
              <Typography sx={{ fontFamily: "monospace" }}>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, backgroundColor: "#61dafb", color: "#1e1e1e" }}
              >
                Choose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: '#61dafb',
                borderRadius: 2,
                backgroundColor: "#282c34",
                color: "#c5c6c7"
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "monospace" }}>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: "monospace" }}>
                $10 / month
              </Typography>
              <Typography sx={{ fontFamily: "monospace" }}>
                Access to unlimited flashcards and storage, with priority support.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, backgroundColor: "#61dafb", color: "#1e1e1e" }}
                onClick={handleSubmit}
              >
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
