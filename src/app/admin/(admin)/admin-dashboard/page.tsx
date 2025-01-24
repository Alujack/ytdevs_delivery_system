"use client"
import React, { useEffect, useState } from "react";
import { 
  Calendar, 
  PieChart, 
  BarChart, 
  Users, 
  Truck, 
  Package, 
  Building 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'custom'>('day');
  const [dateRange, setDateRange] = useState<{ from: Date; to?: Date }>({
    from: new Date(),
    to: undefined
  });
  const [counts, setCounts] = useState({
    totalCompanies: 42,
    totalDrivers: 156,
    totalCustomers: 1024,
    totalDeliveries: 3752
  });

  const fetchCounts = async () => {
    try {
      const params = new URLSearchParams({ 
        period, 
        startDate:'2025-01-01',
        endDate: '2025-01-21'
      });
      const response = await fetch(`/api/dashboard/admin?${params.toString()}`);
      const data = await response.json();
      
      setCounts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [period, dateRange]);

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    link 
  }: { 
    icon: React.ElementType, 
    title: string, 
    value: number, 
    link: string 
  }) => (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground hover:text-primary">
          View Details
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard 
          icon={Building} 
          title="Total Companies" 
          value={counts.totalCompanies} 
          link="/admin/admin-dashboard/total-company" 
        />
        <StatCard 
          icon={Users} 
          title="Total Drivers" 
          value={counts.totalDrivers} 
          link="/admin/admin-dashboard/total-driver" 
        />
        <StatCard 
          icon={Truck} 
          title="Total Customers" 
          value={counts.totalCustomers} 
          link="/admin/admin-dashboard/total-customer" 
        />
        <StatCard 
          icon={Package} 
          title="Total Deliveries" 
          value={counts.totalDeliveries} 
          link="/admin/admin-dashboard/total-delivery" 
        />
      </div>
    </div>
  );
};

export default Dashboard;