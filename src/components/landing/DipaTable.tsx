"use client";

import { DipaFacultyRow } from "@/types/landing";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DipaTableProps {
  data: {
    year: number;
    title: string;
    rows: DipaFacultyRow[];
  };
}

export function DipaTable({ data }: DipaTableProps) {
  // Hitung total dari seluruh fakultas
  const totalPenelitian = data.rows.reduce((sum, row) => sum + row.penelitian, 0);
  const totalPKM = data.rows.reduce((sum, row) => sum + row.pkm, 0);
  const grandTotal = data.rows.reduce((sum, row) => sum + row.total, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-200 bg-neutral-50 flex flex-col md:flex-row items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-neutral-900">{data.title} ({data.year})</h3>
        <div className="text-sm px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-medium shrink-0">
          Total: {grandTotal} Usulan
        </div>
      </div>
      
      <Tabs defaultValue="chart" className="w-full">
        <div className="px-6 pt-4">
          <TabsList className="bg-neutral-100">
            <TabsTrigger value="chart">Tampilan Grafik</TabsTrigger>
            <TabsTrigger value="table">Tampilan Tabel</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chart" className="p-6">
          <div className="h-[450px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.rows} margin={{ top: 20, right: 30, left: 0, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="facultyName" tick={{ fontSize: 12 }} stroke="#94a3b8" angle={-45} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', bottom: -10 }} />
                <Bar dataKey="penelitian" name="Penelitian" fill="var(--primary-600)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pkm" name="Pengabdian (PKM)" fill="var(--warning)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="table" className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-neutral-50 hover:bg-neutral-50">
                  <TableHead className="w-[50px] text-center">No</TableHead>
                  <TableHead>Fakultas</TableHead>
                  <TableHead className="text-center">Penelitian</TableHead>
                  <TableHead className="text-center">Pengabdian (PKM)</TableHead>
                  <TableHead className="text-center font-bold">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.rows.map((row) => (
                  <TableRow key={row.no}>
                    <TableCell className="text-center font-medium text-neutral-500">{row.no}</TableCell>
                    <TableCell className="font-medium">{row.facultyName}</TableCell>
                    <TableCell className="text-center">{row.penelitian}</TableCell>
                    <TableCell className="text-center">{row.pkm}</TableCell>
                    <TableCell className="text-center font-bold">{row.total}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-primary-50/50 hover:bg-primary-50/50 font-bold">
                  <TableCell colSpan={2} className="text-right">TOTAL KESELURUHAN</TableCell>
                  <TableCell className="text-center text-primary-700">{totalPenelitian}</TableCell>
                  <TableCell className="text-center text-primary-700">{totalPKM}</TableCell>
                  <TableCell className="text-center text-primary-700 text-lg">{grandTotal}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
