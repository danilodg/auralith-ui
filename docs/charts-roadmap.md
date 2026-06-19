# Dashboard Charts Roadmap

Date: 2026-04-21

## Goal

Expand Auralith UI with a dashboard-ready chart system while preserving the existing visual language, TypeScript DX, and low dependency surface.

## Current state (implemented)

- `ChartContainer`
- `ChartLegend`
- `ChartTooltip`
- `Sparkline`
- `LineChart`
- `AreaChart`
- `BarChart`
- `StackedBarChart`
- `DonutChart`
- `PieChart`
- `RadarChart`
- `HeatmapChart`

## Planned chart components (at least 10)

1. `ChartContainer` (done)
2. `ChartLegend` (done)
3. `ChartTooltip` (done)
4. `Sparkline` (done)
5. `LineChart` (done)
6. `AreaChart` (done)
7. `BarChart` (done)
8. `StackedBarChart` (done)
9. `DonutChart` (done)
10. `PieChart` (done)
11. `RadarChart` (done)
12. `HeatmapChart` (done)

## Implementation phases

### Phase 1 - Core base and first charts (completed)

- Shared chart primitives for container, legend, and tooltip.
- First production-ready chart set: sparkline, line, area, and grouped bar.
- Showcase docs entries and public exports added.

### Phase 2 - Composition charts (completed)

- Add `StackedBarChart`, `DonutChart`, `PieChart`.
- Add reusable arc/polar math helpers for donut/pie/radar.
- Extend legends and tooltip contracts for stacked/segment data.

### Phase 3 - Advanced dashboards (completed)

- Add `RadarChart` and `HeatmapChart`.
- Improve keyboard and screen-reader semantics for interactive charts.
- Add performance presets for large datasets.

## Technical decisions

- Keep chart rendering on native SVG + React.
- No external charting dependency in this phase.
- Reuse Auralith tokens (`--card-border`, `--text-soft`, `--accent-line`) for visual consistency.

## Validation checklist

- `npm run build:lib`
- `npm run pack:check`
- `VITE_BASE_PATH=/auralith-ui/ npm run build`
- Verify docs page for all newly added chart components.
