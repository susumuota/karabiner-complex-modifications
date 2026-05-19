# Karabiner Complex Modifications

Deno + TypeScript project that generates Karabiner-Elements complex modification rules using the
[karabiner.ts](https://github.com/evan-liu/karabiner.ts) library.

## Structure

- `karabiner_mods.ts` - Main source file defining all keyboard modification rules
- `karabiner_mods.json` - Generated JSON output
- `deno.json` - Deno configuration, tasks, and dependencies

## Tasks

- `deno task dev` - Run with `--watch` and write rules directly to Karabiner profile
- `deno task json` - Generate JSON to `karabiner_mods.json`
- `deno task format` - Check formatting with `deno fmt`
- `deno task lint` - Lint with `deno lint`

## Conventions

- Use `karabiner.ts` API (`rule`, `map`, `ifDevice`, `ifApp`, etc.) to define rules
- Tap/hold pattern: `map(key, 'any').to(holdKey).toIfAlone(tapKey)`
- Simple remap pattern: `map(key, 'optionalAny').to(targetKey)`
- Place simple remaps (`optionalAny`) before tap/hold rules (`any` + `toIfAlone`) within a rule
- Each physical keyboard gets its own `rule()` with `ifDevice()` condition
- Formatting: no semicolons, single quotes, 119 char line width
