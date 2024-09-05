"use client";

import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAuthContext } from '@/app/hooks/AuthContext'
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
  token?: string;
}

//Shadn
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from "@/components/ui/input-otp"
import { useRouter, useSearchParams } from 'next/navigation'

const FormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  })

type Props = {}

const Verification = (props: Props) => {
    const { verifyEmail } = useAuthContext()
    const router = useRouter()
    const searchParams = useSearchParams()
    

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          pin: "",
        },
      })

      
    useEffect(() => {
        //Get the token from the URL query parameters
        const token = searchParams.get('token')
        

        // Ensure token is a string
        const authToken = Array.isArray(token) ? token[0] : token;

        //If a token is present, automatically verify the user
        if(authToken && token) {
            //verify token 
            const decoded = jwt.decode(authToken) as DecodedToken
            console.log(decoded)
            
            //Api to verify Email
            verifyEmail(decoded.token as string)
            
        }
    }, [])

    

    function onSubmit(data: z.infer<typeof FormSchema>) {    
        verifyEmail(data.pin)
    }
  return (
    <section className='flex justify-center min-h-screen items-center'>
        <div className='w-full max-w-[560px] mx-auto border p-4 rounded-lg'>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 flex flex-col mx-auto justify-center text-center space-y-8">
                <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                    <FormItem className='mx-auto'>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                        <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className='mx-auto'>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                        </InputOTP>
                    </FormControl>
                    <FormDescription>
                        Please enter the one-time password sent to your email.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
        
                <Button type="submit">Verify Code</Button>
            </form>
            </Form>
        </div>
    </section>
    
  )
}

export default Verification