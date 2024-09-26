import React, { useState, useEffect, useRef } from "react";

//Nextjs
import Link from "next/link";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

//Form
import { UseFormReturn } from "react-hook-form";

//Icons
import { HelpCircle, Zap, X, User, Phone, Mail, House } from "lucide-react";

type Props = {
  form: UseFormReturn<any>;
  handleRefresh: (e: React.MouseEvent) => void;
  formValues: any;
};

export default function StepFive({ form, handleRefresh, formValues }: Props) {
  return (
    <div className="max-w-2xl w-full space-y-6 mx-auto">
      <div className="w-full  space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-between">
            <Link href="#" onClick={handleRefresh}>
              <X size={44} className="text-gray-400 cursor-pointer mr-4" />
            </Link>
            <Progress value={80} className="w-full bg-[#59C9B9]" />
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            Ser alt riktig ut?
          </h2>
          <p className="text-gray-400">Snart blir du medeier i Folkekraft!</p>
        </div>

        {/* Form */}
        <div className="w-full">
          <Table className="w-full">
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <User size={30} />
                </TableCell>
                <TableCell>
                  <div>
                    {formValues.firstName} {formValues.lastName}
                    <br />
                    {formValues.ssn}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <Phone size={30} />
                </TableCell>
                <TableCell>{formValues.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <Mail size={30} />
                </TableCell>
                <TableCell>{formValues.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <House size={30} />
                </TableCell>
                <TableCell>
                  <div>
                    {formValues.address} <br />
                    {formValues.postalCode} {formValues.city}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
