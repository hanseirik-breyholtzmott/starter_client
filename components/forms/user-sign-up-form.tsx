"use client"
 
import { z } from "zod"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAuthContext } from "@/app/hooks/AuthContext"

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
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
 
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
})

type Props = {}

const UserSignUpForm = (props: Props) => {
    const { toast } = useToast()
    const { register } = useAuthContext()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
          firstname: "",
          lastname: ""
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        

          register(values.firstname, values.lastname, values.email, values.password)

        
      }
  return (
    <div className="flex w-full">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col w-full relative">

                <div className="flex flex-row gap-4">
                <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                        <Input placeholder="First name" type="text" className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Last Name" type="text" className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                </div>
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="your@email.com" type="email" className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input placeholder="password" type="password" {...field} />
                    </FormControl>

                    <FormMessage />
                    </FormItem>
                )}
                />
                </div>
                
                
                
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    </div>
  )
}

export default UserSignUpForm