# Karabiner Complex Modifications

Deno + TypeScript project that generates Karabiner-Elements complex modification rules using the
[karabiner.ts](https://github.com/evan-liu/karabiner.ts) library.

All rules live in `karabiner_mods.ts`; `karabiner_mods.json` is generated output (`deno task json`).

## Conventions

- Tap/hold pattern: `map(key, 'any').to(holdKey).toIfAlone(tapKey)`
- Simple remap pattern: `map(key, 'optionalAny').to(targetKey)`
- Place simple remaps (`optionalAny`) before tap/hold rules (`any` + `toIfAlone`) within a rule
- Each device (or group of devices sharing a layout) gets its own `rule()` with an `ifDevice()` condition; rules that
  apply everywhere omit it, and app-specific rules use `ifApp()`
