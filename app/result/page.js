'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Box, CircularProgress, Container, Typography } from "@mui/material"

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchCheckoutSession = async ()=>{
            if(!session_id) return

            try{
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()
                if (res.ok){
                    setSession(sessionData)
                }else{
                    setError(sessionData.error)
                }
            } catch (err) {
                setError('An error occurred')
            } finally {
                setLoading(false)
            }
        }

        fetchCheckoutSession()
    }, [session_id])

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#1e1e1e",
                }}
            >
                <CircularProgress sx={{ color: "#61dafb" }} />
            </Box>
        )
    }

    if (error) {
        return (
            <Container sx={{ backgroundColor: "#1e1e1e", color: "#c5c6c7", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h4" sx={{ fontFamily: "monospace", mb: 4 }}>
                    {error}
                </Typography>
            </Container>
        )
    }

    return (
        <Container sx={{ backgroundColor: "#1e1e1e", color: "#c5c6c7", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h4" sx={{ fontFamily: "monospace", mb: 4 }}>
                {session ? 'Payment Successful' : 'Payment Status'}
            </Typography>
            <Typography variant="h6" sx={{ fontFamily: "monospace" }}>
                {session ? `Thank you for your payment, ${session.customer_details.name}` : 'We couldn\'t find the payment session.'}
            </Typography>
        </Container>
    )
}

export default ResultPage
