'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { IconBrandFacebook, IconBrandGoogle, IconLoader2 } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { PasswordInput } from '../ui/passwordInput'
import { loginWithEmailPassword } from '@/server/auth.actions'
import { checkPasswordStrength } from '@/utils/auth.utils'



export default function LoginForm({borderless, className}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function resetForm() {
    setEmail('');
    setPassword('');
    setError('');
    setLoading(false)
  }
  

  let passwordScore = checkPasswordStrength(password);

  const handleEmailLogin = async(e) => {
    e.preventDefault()
    setLoading(true);
    
    if (passwordScore < 2) {
      setError("Password is too weak! Add numbers, special characters and minimum 8 digits with capital letters.");
      setLoading(false);
      return;
    }
      
    const error = await loginWithEmailPassword({email: email, password: password});

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    resetForm();
  }

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Google login')
  }

  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
    console.log('Facebook login')
  }

  return (
    <Card className={`w-full max-w-md ${borderless && "border-none shadow-none bg-background" } mx-auto ${className && className}`}>
        <CardHeader className="space-y-1">
          <Link href={"/"} className='mx-auto mb-4 mt-2'>
            <Image height={40} width={40} src="/icon.svg" alt="supabase" /> 
          </Link>
          <CardTitle className="text-2xl font-bold text-center">Login to spotpass</CardTitle>
          <CardDescription className="text-center">
            Choose your preferred login method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleGoogleLogin}
            >
              <IconBrandGoogle className='mr-2' />
              Login with Google
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleFacebookLogin}
            >
              <IconBrandFacebook className='mr-2' />
              Login with Facebook
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <form className='space-y-2' onSubmit={handleEmailLogin}>
            {error && <p className='text-xs text-destructive dark:text-red-500 text-center'>{error}</p>}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <div>
              <Button disabled={loading} type="submit" size="lg" className="w-full mt-4">
                {loading ? <IconLoader2 className='animate-spin' /> : "Login with Email"}
              </Button>
            </div>
            <div className="text-center text-sm mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center text-muted-foreground w-full">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
    </Card>
  )
}