"use client";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { languageUsage, categoryBreakdown, projectScores } from "@/data/stats";

const tooltipStyle = {
  backgroundColor: "#1e1b18",
  border: "1px solid #2a2621",
  borderRadius: "8px",
  fontSize: "12px",
  color: "#f0ebe3",
};

const PIE_COLORS = ["#e0913a", "#c96f4a", "#7fa650", "#d9a441", "#a8735f", "#8c9b6e"];

export function LanguageChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={languageUsage} layout="vertical" margin={{ left: 20, right: 20 }}>
        <XAxis type="number" stroke="#a09587" fontSize={11} tickLine={false} />
        <YAxis
          type="category"
          dataKey="name"
          stroke="#a09587"
          fontSize={11}
          width={90}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ fill: "rgba(56,189,248,0.06)" }}
          formatter={(v) => [`${Number(v).toLocaleString()} lines`, "Code"]}
        />
        <Bar dataKey="lines" radius={[0, 4, 4, 0]}>
          {languageUsage.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CategoryChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={categoryBreakdown}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          // Without this the slice paths render empty on first paint.
          isAnimationActive={false}
        >
          {categoryBreakdown.map((entry, i) => (
            <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v) => [`${Number(v).toLocaleString()} lines`, "Code"]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ScoreRadar() {
  const data = [
    { axis: "Complexity", ...Object.fromEntries(projectScores.map((p) => [p.project, p.complexity])) },
    { axis: "Architecture", ...Object.fromEntries(projectScores.map((p) => [p.project, p.architecture])) },
    { axis: "Code quality", ...Object.fromEntries(projectScores.map((p) => [p.project, p.quality])) },
    { axis: "Relevance", ...Object.fromEntries(projectScores.map((p) => [p.project, p.relevance])) },
    { axis: "Testing", ...Object.fromEntries(projectScores.map((p) => [p.project, p.testing])) },
  ];

  const top = projectScores.slice(0, 3);

  return (
    <ResponsiveContainer width="100%" height={340}>
      <RadarChart data={data}>
        <PolarGrid stroke="#2a2621" />
        <PolarAngleAxis dataKey="axis" stroke="#a09587" fontSize={11} />
        <Tooltip contentStyle={tooltipStyle} />
        {top.map((p, i) => (
          <Radar
            key={p.project}
            name={p.project}
            dataKey={p.project}
            stroke={PIE_COLORS[i]}
            fill={PIE_COLORS[i]}
            fillOpacity={0.14}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function ScoreLegend() {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {projectScores.slice(0, 3).map((p, i) => (
        <div key={p.project} className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: PIE_COLORS[i] }}
            aria-hidden
          />
          <span className="text-xs text-[var(--muted)]">{p.project}</span>
        </div>
      ))}
    </div>
  );
}
