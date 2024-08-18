'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      }
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    });

    if (error) {
      console.warn(error.message);
    }
  };

  const handleGetStarted = () => {
    setLoading(true);
    router.push('/generate');
  };

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#1e1e1e", minHeight: "100vh", color: "#c5c6c7", padding: "0", display: "flex", flexDirection: "column" }}>
      <Head>
        <title>Flashcards</title>
        <meta name="description" content="Create flashcards from your text" />
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
          my: { xs: 2, md: 4 },
          px: { xs: 2, md: 0 }
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ fontFamily: "monospace", color: "#61dafb", fontSize: { xs: "2rem", md: "3rem" } }}>
          Welcome to Flashcards
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: "monospace", fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
          The easiest way to make flashcards from your text
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, backgroundColor: "#61dafb", color: "#1e1e1e" }}
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </Box>

      <Box sx={{ my: { xs: 4, md: 6 }, textAlign: 'center', px: { xs: 2, md: 0 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: "monospace", color: "#61dafb", fontSize: { xs: "1.75rem", md: "2.5rem" } }}>
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
                color: "#c5c6c7",
                textAlign: 'left'
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "monospace", fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
                Easy Text Input
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: "monospace", fontSize: { xs: "1rem", md: "1.25rem" } }}>
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
                color: "#c5c6c7",
                textAlign: 'left'
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "monospace", fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
                Smart Flashcards
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: "monospace", fontSize: { xs: "1rem", md: "1.25rem" } }}>
                Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 5,
                border: '1px solid',
                borderColor: '#61dafb',
                borderRadius: 2,
                backgroundColor: "#282c34",
                color: "#c5c6c7",
                textAlign: 'left'
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "monospace", fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
                Accessible Anywhere
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: "monospace", fontSize: { xs: "1rem", md: "1.25rem" } }}>
                Access your flashcards from any device, at any time. Study on the go with ease.  
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: { xs: 4, md: 6 }, textAlign: 'center', px: { xs: 2, md: 0 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: "monospace", color: "#61dafb", fontSize: { xs: "1.75rem", md: "2.5rem" } }}>
          Pricing (BROKEN/DO NOT USE)
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
                color: "#c5c6c7",
                textAlign: 'left'
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "monospace", fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom sx={{p:2, fontFamily: "monospace", fontSize: { xs: "1rem", md: "1.25rem" } }}>
                $5 / month
              </Typography>
              <Typography sx={{ fontFamily: "monospace", fontSize: { xs: "0.875rem", md: "1rem" } }}>
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
                color: "#c5c6c7",
                textAlign: 'left'
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontFamily: "monospace", fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: "monospace", fontSize: { xs: "1rem", md: "1.25rem" } }}>
                $10 / month
              </Typography>
              <Typography sx={{ fontFamily: "monospace", fontSize: { xs: "0.875rem", md: "1rem" } }}>
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

      {/* This Box ensures the background color covers the entire height */}
      <Box sx={{ flexGrow: 1 }} />
    </Container>
  );
}
