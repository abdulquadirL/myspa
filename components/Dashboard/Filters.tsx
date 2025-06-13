"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";

type FiltersProps = {
  selectedService?: string;
  selectedDate?: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  serviceFilter: string;
  setServiceFilter: React.Dispatch<React.SetStateAction<string>>;
  dateFilter: string;
  setDateFilter: React.Dispatch<React.SetStateAction<string>>;
  onExportCSV: () => void;
  filters: any; // You may want to type this more strictly
  onChange: () => void;
};

const Filters: React.FC<FiltersProps> = ({ selectedService, selectedDate }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [service, setService] = useState(searchParams.get("service") || "");
  const [date, setDate] = useState(searchParams.get("date") || "");
  const [services, setServices] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setServices(data.map((s) => s.name));
        }
      });
  }, []);

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (service) params.set("service", service);
    if (date) params.set("date", date);

    router.push(`/admin/dashboard?${params.toString()}`);
  };

  const resetFilters = () => {
    setService("");
    setDate("");
    router.push("/admin/dashboard");
  };

  return (
    <div className="flex flex-wrap gap-4 items-end justify-between mb-6">
      <div className="flex flex-col">
        <label htmlFor="service" className="text-sm font-medium">Service</label>
        <select
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white"
        >
          <option value="">All</option>
          {services.map((svc) => (
            <option key={svc} value={svc}>
              {svc}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="date" className="text-sm font-medium">Date</label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={applyFilters}>Apply Filters</Button>
        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default Filters;
