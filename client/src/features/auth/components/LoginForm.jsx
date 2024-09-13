import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const LoginForm = () => {
  const [passkey, setPasskey] = useState('')
  const { login, isLoading, error } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(passkey)
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your passkey to access your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="passkey"
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter passkey"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Error: {error.message}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}

export default LoginForm