"use client";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Wallet, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { prisma } from "@/lib/prisma";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserDrop } from "@/components/user-dropdown";

export default function Page() {
  const metrics = [
    {
      title: "Total Income",
      amount: "₱24,500",
      change: "+12.5%",
      isPositive: true,
      icon: <ArrowUpRight className="h-5 w-5 text-emerald-500" />,
    },
    {
      title: "Total Expenses",
      amount: "₱12,800",
      change: "+8.2%",
      isPositive: false,
      icon: <ArrowDownRight className="h-5 w-5 text-rose-500" />,
    },
    {
      title: "Current Balance",
      amount: "₱11,700",
      change: "+4.3%",
      isPositive: true,
      icon: <Wallet className="h-5 w-5 text-blue-500" />,
    },
  ];

  const chartData = [
    { month: "Jan", income: 4000, expenses: 2400 },
    { month: "Feb", income: 3000, expenses: 1398 },
    { month: "Mar", income: 2000, expenses: 9800 },
    { month: "Apr", income: 2780, expenses: 3908 },
    { month: "May", income: 1890, expenses: 4800 },
    { month: "Jun", income: 2390, expenses: 3800 },
  ];

  // Sample initial transactions
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "income",
      description: "Client Payment",
      amount: 2500,
      date: "2025-01-31",
    },
    {
      id: 2,
      type: "expense",
      description: "Office Supplies",
      amount: 150,
      date: "2025-01-30",
    },
    {
      id: 3,
      type: "income",
      description: "Consulting Fee",
      amount: 1200,
      date: "2025-01-29",
    },
  ]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Home</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <UserDrop />
        </header>
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {metrics.map((metric) => (
              <Card
                key={metric.title}
                className="flex-1 p-4 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {metric.icon}
                    <h3 className="font-medium text-sm text-muted-foreground">
                      {metric.title}
                    </h3>
                  </div>
                  <span
                    className={`text-sm ${
                      metric.isPositive ? "text-emerald-500" : "text-rose-500"
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
                <p className="mt-3 text-2xl font-semibold">{metric.amount}</p>
              </Card>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-5 p-4">
          <Card className="md:col-span-3 p-4">
            <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    dataKey="income"
                    stroke="#10b981"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    dataKey="expenses"
                    stroke="#ef4444"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="md:col-span-2 p-4">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <ScrollArea className="h-[400px] w-full">
              <div className="flex flex-col gap-3">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      {transaction.type === "income" ? (
                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-rose-500" />
                      )}
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-semibold ${
                        transaction.type === "income"
                          ? "text-emerald-500"
                          : "text-rose-500"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}$
                      {transaction.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
