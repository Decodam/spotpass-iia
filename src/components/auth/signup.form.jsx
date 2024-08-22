'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { IconBrandFacebook, IconBrandGoogle, IconLoader2, IconUpload } from '@tabler/icons-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import Link from 'next/link'
import { PasswordInput } from '../ui/passwordInput'
import { checkPasswordStrength } from '@/utils/auth.utils'
import { signupWithEmailPassword } from '@/server/auth.actions'

export default function SignupForm({ borderless, className }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const fileInputRef = useRef(null)
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function resetForm() {
    setFullName('');
    setEmail('');
    setPassword('');
    setPassword2('');
    setProfileImage(null);
    setError('');
    setLoading(false)
    
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  }
  

  let passwordScore = checkPasswordStrength(password);

  const handleSignup = async(e) => {
    e.preventDefault();
    setLoading(true);
    
    if (passwordScore < 2) {
      setError("Password is too weak! Add numbers, special characters and minimum 8 digits with capital letters.");
      setLoading(false);
      return;
    }
    
    if (password != password2) {
      setError("Passwords dont match!");
      setLoading(false);
      return;
    }

    const error = await signupWithEmailPassword({email: email, password: password, name: fullName});

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    resetForm();
    
  }

  const handleGoogleSignup = () => {
    // Handle Google signup logic here
    console.log('Google signup')
  }

  const handleFacebookSignup = () => {
    // Handle Facebook signup logic here
    console.log('Facebook signup')
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className={`w-full max-w-md ${borderless && "border-none shadow-none bg-background"} mx-auto ${className && className}`}>
      <CardHeader className="space-y-1">
        <Link href={"/"} className="mx-auto mb-4 mt-2">
          <Image height={40} width={40} src="/icon.svg" alt="supabase" />
        </Link>
        <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
        <CardDescription className="text-center">
          Sign up to get started with spotpass
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className='space-y-2' onSubmit={handleSignup}>
          {error && <p className='text-xs text-destructive dark:text-red-500 text-center'>{error}</p>}
          <div className="space-y-1">
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName" 
              type="text" 
              placeholder="John Doe" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required 
            />
          </div>
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

          {passwordScore > 0 && (
            <div className='flex gap-2'>
              <div className={`flex-1 h-1 rounded-full ${passwordScore > 0 ? "bg-primary" : "bg-muted"}`} />
              <div className={`flex-1 h-1 rounded-full ${passwordScore > 1 ? "bg-primary" : "bg-muted"}`} />
              <div className={`flex-1 h-1 rounded-full ${passwordScore > 2 ? "bg-primary" : "bg-muted"}`} />
              <div className={`flex-1 h-1 rounded-full ${passwordScore > 3 ? "bg-primary" : "bg-muted"}`} />
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="password2">Confirm Password</Label>
            <PasswordInput
              id="password2" 
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required 
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="profileImage">Profile Picture</Label>
            <div className="flex items-center space-x-2">
              {profileImage && (
                <Avatar>
                  <AvatarImage className="aspect-auto" src={profileImage} />
                  <AvatarFallback>{}</AvatarFallback>
                </Avatar>
              )}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
              >
                <IconUpload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
          <div>
            <Button disabled={loading} type="submit" className="w-full mt-4">
              {loading ? <IconLoader2 className='animate-spin' /> : "Sign Up with Email"}
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or sign up with
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleGoogleSignup}
          >
            <IconBrandGoogle className="mr-2" />
            Sign up with Google
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleFacebookSignup}
          >
            <IconBrandFacebook className="mr-2" />
            Sign up with Facebook
          </Button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-center text-muted-foreground w-full">
          By signing up, you agree to our{" "}
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
