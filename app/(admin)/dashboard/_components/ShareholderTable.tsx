import React from "react";

//Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  shareholderData: any[];
};

export default function ShareholderTable({ shareholderData }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shareholder Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shareholder</TableHead>
              <TableHead>Share Class</TableHead>
              <TableHead>Shares</TableHead>
              <TableHead>Ownership %</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shareholderData.map((shareholder) => (
              <TableRow key={shareholder.id}>
                <TableCell>{shareholder.name}</TableCell>
                <TableCell>{shareholder.shareClass}</TableCell>
                <TableCell>{shareholder.shares.toLocaleString()}</TableCell>
                <TableCell>{shareholder.ownership}</TableCell>
                <TableCell>{shareholder.value}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        ...
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
