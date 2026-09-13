# Personal Karabiner Complex Modifications

My personal [Karabiner-Elements](https://karabiner-elements.pqrs.org/) complex modification rules, written in
TypeScript with [karabiner.ts](https://github.com/evan-liu/karabiner.ts) instead of hand-written JSON. Mostly
per-keyboard tweaks: JIS keyboards used as US layout, command keys doubling as eisuu/kana, and a few app-specific
remaps.

## Requirements

- macOS with [Karabiner-Elements](https://karabiner-elements.pqrs.org/)
- [Deno](https://deno.com/) 2.x

## Usage

Watch for file changes and automatically update `~/.config/karabiner/karabiner.json`:

```shell
deno run dev
```

> [!WARNING]
> This overwrites the complex modification rules of the Karabiner profile named `Default profile` with the rules
> defined in `karabiner_mods.ts`. Back up `~/.config/karabiner/karabiner.json` first if you have rules configured
> through the GUI.

To generate `karabiner_mods.json` without touching the profile:

```shell
deno run json
```

## Development

Lint and format run automatically via [pre-commit](https://pre-commit.com/) (`pre-commit install` once after cloning),
or manually:

```shell
deno run lint
deno run format
deno run check
```
