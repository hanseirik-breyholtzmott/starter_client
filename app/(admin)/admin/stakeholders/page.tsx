"use client";

import { useEffect, useState } from "react";
import { Investors, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

//Shadcn
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
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
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    primaryEmailAddress: "",
    primaryPhoneNumber: "",
    password: "",
    roles: [{ name: "user", permissions: [] }],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      primaryEmailAddress: "",
      primaryPhoneNumber: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string) => {
    setNewUser({ ...newUser, roles: [{ name: value, permissions: [] }] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement user creation logic
    console.log("New user data:", newUser);
  };

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
                className="space-y-8"
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
