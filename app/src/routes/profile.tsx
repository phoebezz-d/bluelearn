import { createFileRoute } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import tableData from "@/data/tableData.json";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-[1280px] border-x bg-background">
      <section className="border-b px-8 py-10 lg:px-16">
        <div className="mb-6 flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-center">
          <div className="flex flex-col items-center sm:w-1/4">
            <Avatar className="size-30 bg-gray-500">
              <AvatarImage
                src="https://github.com/shdcn.png"
                alt="@shadcn"
                className="grayscale"
              />
              <AvatarFallback className="bg-gray-300 text-2xl font-bold text-black">
                JD
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-3 mb-3 text-xl font-bold">John_Doe</h2>
            <h3 className="text-sm text-gray-600">Admin</h3>
          </div>
          <div className="w-1/4">
            <ul className="grid grid-cols-2 grid-rows-2 gap-y-8">
              <li className="flex flex-col items-center">
                <h3 className="text-sm font-semibold">UPVOTES</h3>
                <p className="font-semibold">27</p>
              </li>
              <li className="flex flex-col items-center">
                <h3 className="text-sm font-semibold">DOWNVOTES</h3>
                <p className="font-semibold">27</p>
              </li>
              <li className="flex flex-col items-center">
                <h3 className="text-sm font-semibold">UPVOTES</h3>
                <p className="font-semibold">27</p>
              </li>
              <li className="flex flex-col items-center">
                <h3 className="text-sm font-semibold">UPVOTES</h3>
                <p className="font-semibold">27</p>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8 bg-border" />
        <div className="overflow-x-auto">
          <Table className="mx-auto w-full max-w-5xl">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-3 text-base">Type</TableHead>
                <TableHead className="px-4 py-3 text-base">Title</TableHead>
                <TableHead className="px-4 py-3 text-base">
                  Change Summary
                </TableHead>
                <TableHead className="px-4 py-3 text-base">Date</TableHead>
                <TableHead className="px-4 py-3 text-base">Status</TableHead>
                <TableHead className="px-4 py-3 text-base">
                  Review Case
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((data) => (
                <TableRow key={data.type}>
                  <TableCell className="px-4 py-3">{data.type}</TableCell>
                  <TableCell className="px-4 py-3">{data.title}</TableCell>
                  <TableCell className="px-4 py-3">
                    {data.change_summary}
                  </TableCell>
                  <TableCell className="px-4 py-3">{data.date}</TableCell>
                  <TableCell className="px-4 py-3">{data.status}</TableCell>
                  <TableCell className="px-4 py-3">
                    <Button className="bg-gray-400 text-black uppercase">
                      {data.review_case}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
