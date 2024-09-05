"use client"

import React from 'react'
import { cn } from "@/lib/utils";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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

//Magic ui
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";

//Icons
import { ChevronRight } from "lucide-react";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

//Form
const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email."
    })
  })

type Props = {}

const ComingSoon = (props: Props) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
        },
      })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

  return (
    <main className='flex flex-col items-center'>
        <AnimatedGradientText>
        🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
          Introducing Magic UI
        </span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
      
        <h1 className='uppercase text-5xl font-semibold mt-9'>
            <GradualSpacing
            className="font-display text-center text-4xl font-bold tracking-[-0.1em]  text-black dark:text-white md:text-7xl md:leading-[5rem]"
            text="Under Construction"
            />
        </h1>
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className='flex flex-col z-10 relative mt-8 items-center space-y-2'>
                <FormField
                control={form.control}
                name="email"
                
                render={({ field }) => (
                    <FormItem >
                    
                    <FormControl>
                        <Input className='bg-white z-10' placeholder="Enter your email" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                    </FormItem>
                )}
                />
                <button type='submit'>
                    <AnimatedSubscribeButton
                        buttonColor="#000000"
                        buttonTextColor="#ffffff"
                        subscribeStatus={false}
                        initialText={
                            <span className="group inline-flex items-center">
                            Subscribe{" "}
                            <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        }
                        changeText={
                            <span className="group inline-flex items-center">
                            <CheckIcon className="mr-2 h-4 w-4" />
                            Subscribed{" "}
                            </span>
                        }
                    />
                </button>
                
                
            </div>
            
            </form>
        </Form>
    </main>
  )
}

export default ComingSoon