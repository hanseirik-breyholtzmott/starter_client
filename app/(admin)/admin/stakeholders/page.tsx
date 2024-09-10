"use client";

import { useEffect, useState } from "react";
import { Investors, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { format } from "date-fns";
import axiosInstance from "@/lib/axiosInstance";

//Shadcn
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//Form
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  primaryEmailAddress: z.string().email(),
  primaryPhoneNumber: z.string().min(8).max(15),
  password: z.string().min(8).max(50),
  ssn: z.string().min(9).max(11),
  role: z.string(),
  earlyInvestmentShares: z.number().min(0),
  transactionDate: z.date(),
  recommendedPurchase: z.number().min(0),
  purchaseRight: z.number().min(0),
});

const capTableData = [
  {
    id: 1,
    name: "John Doe",
    role: "Founder",
    shares: 1000000,
    ownership: 25,
    value: "$250,000",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Investor",
    shares: 2000000,
    ownership: 50,
    value: "$500,000",
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Employee",
    shares: 1000000,
    ownership: 25,
    value: "$250,000",
  },
];

type Props = {};

const Page = (props: Props) => {
  const [data, setData] = useState<Investors[]>([]);
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      primaryEmailAddress: "",
      primaryPhoneNumber: "",
      password: "",
      earlyInvestmentShares: 0,
      recommendedPurchase: 0,
      purchaseRight: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axiosInstance.post(
        "/api/create-user-with-shares",
        values
      );
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Stakeholder created successfully",
          duration: 3000,
        });
        form.reset();
      }
    } catch (error) {
      console.error("Error creating stakeholder:", error);
    }
  }

  useEffect(() => {
    setData(capTableData);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Stakeholders</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Legg til ny investor</Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-[900px]">
            <SheetHeader>
              <SheetTitle>Add New User</SheetTitle>
              <SheetDescription>
                Enter the details for the new user.
              </SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Hans-Eirik" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Breyholtz-Mott" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="primaryEmailAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="epost@folkekraft.no"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="primaryPhoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+47 900 00 000" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="ssn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SSN</FormLabel>
                          <FormControl>
                            <Input placeholder="000000000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="password" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-lg font-bold">Shares</h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="earlyInvestmentShares"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Antall aksjer fra Folkeinvest</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Antall aksjer"
                              type="number"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value
                                  ? parseInt(e.target.value, 10)
                                  : 0;
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="transactionDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of transaction</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormField
                      control={form.control}
                      name="recommendedPurchase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Anbefalt kjøp av aksjer</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Antall aksjer"
                              type="number"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value
                                  ? parseInt(e.target.value, 10)
                                  : 0;
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="purchaseRight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Forkjøpsrett</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Rett på aksjer antall"
                              type="number"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value
                                  ? parseInt(e.target.value, 10)
                                  : 0;
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit">Create User</Button>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
