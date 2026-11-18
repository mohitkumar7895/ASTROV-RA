'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

interface ChartProps {
  monthlyTrends: { month: string; enquiries: number; confirmed: number }[];
  statusDistribution: { name: string; value: number }[];
  servicePopularity: { name: string; count: number }[];
}

const STATUS_COLORS: Record<string, string> = {
  New: '#3B82F6',
  Contacted: '#A855F7',
  Pending: '#F59E0B',
  Confirmed: '#10B981',
  Completed: '#D6B56D',
  Cancelled: '#EF4444',
};

const DEFAULT_COLORS = ['#D6B56D', '#3B82F6', '#10B981', '#F59E0B', '#A855F7', '#EC4899'];

export function DashboardCharts({
  monthlyTrends = [],
  statusDistribution = [],
  servicePopularity = [],
}: ChartProps) {
  return (
    <div className="space-y-8">
      {/* Top 2 Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Enquiry Trends (Area Chart - 7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-astro-navy/60 border border-astro-border p-6 shadow-navyGlow">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-heading text-base font-bold text-astro-ivory">
                Consultation Enquiries Trend
              </h3>
              <p className="text-astro-slate text-xs mt-0.5">
                Monthly enquiry volume &amp; confirmed bookings
              </p>
            </div>
            <span className="text-[11px] font-accent text-astro-gold uppercase tracking-wider px-3 py-1 rounded-full bg-astro-midnight border border-astro-border">
              Last 6 Months
            </span>
          </div>

          <div className="h-72 w-full">
            {monthlyTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends}>
                  <defs>
                    <linearGradient id="colorEnq" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stop-color="#D6B56D" stop-opacity={0.4} />
                      <stop offset="95%" stop-color="#D6B56D" stop-opacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorConf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stop-color="#10B981" stop-opacity={0.4} />
                      <stop offset="95%" stop-color="#10B981" stop-opacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0C1433',
                      borderColor: 'rgba(214, 181, 109, 0.4)',
                      borderRadius: '12px',
                      color: '#F5F0E6',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area
                    type="monotone"
                    dataKey="enquiries"
                    name="Total Enquiries"
                    stroke="#D6B56D"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorEnq)"
                  />
                  <Area
                    type="monotone"
                    dataKey="confirmed"
                    name="Confirmed / Completed"
                    stroke="#10B981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorConf)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-astro-slate text-xs">
                No trend data available yet
              </div>
            )}
          </div>
        </div>

        {/* Enquiry Status Distribution (Pie Chart - 5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-astro-navy/60 border border-astro-border p-6 shadow-navyGlow flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="font-heading text-base font-bold text-astro-ivory">
              Booking Status Distribution
            </h3>
            <p className="text-astro-slate text-xs mt-0.5">
              Live breakdown of client consultation statuses
            </p>
          </div>

          <div className="h-64 w-full">
            {statusDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={4}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={STATUS_COLORS[entry.name] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0C1433',
                      borderColor: 'rgba(214, 181, 109, 0.4)',
                      borderRadius: '12px',
                      color: '#F5F0E6',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-astro-slate text-xs">
                No status data available
              </div>
            )}
          </div>

          {/* Status Legend Pills */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-astro-border/30 justify-center">
            {statusDistribution.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-astro-midnight text-[11px] font-accent text-astro-slate"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: STATUS_COLORS[item.name] || '#D6B56D',
                  }}
                />
                <span>
                  {item.name}: <strong className="text-astro-ivory">{item.value}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Popularity Bar Chart */}
      <div className="rounded-3xl bg-astro-navy/60 border border-astro-border p-6 shadow-navyGlow">
        <div className="mb-6">
          <h3 className="font-heading text-base font-bold text-astro-ivory">
            Astrology Service Popularity
          </h3>
          <p className="text-astro-slate text-xs mt-0.5">
            Most requested consultations and Vidhan ceremonies
          </p>
        </div>

        <div className="h-64 w-full">
          {servicePopularity.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={servicePopularity} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <XAxis
                  dataKey="name"
                  stroke="#64748B"
                  fontSize={11}
                  tick={{ fill: '#8F9CAE' }}
                  interval={0}
                  angle={-10}
                  textAnchor="end"
                />
                <YAxis stroke="#64748B" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0C1433',
                    borderColor: 'rgba(214, 181, 109, 0.4)',
                    borderRadius: '12px',
                    color: '#F5F0E6',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" name="Enquiry Count" fill="#D6B56D" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-astro-slate text-xs">
              No service popularity records yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
