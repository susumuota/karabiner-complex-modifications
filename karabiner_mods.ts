import { parseArgs } from 'jsr:@std/cli/parse-args'
import {
  complexModifications,
  ifApp,
  ifDevice,
  map,
  rule,
  writeToProfile,
} from 'https://deno.land/x/karabinerts/deno.ts'

const title = 'My Karabiner Complex Modifications'
const maintainers = ['susumuota']

const createMods = () => {
  return complexModifications(
    [
      rule('Claude Desktop: map ⏎ to ⇧⏎').manipulators([
        map('⏎')
          .to('⏎', '⇧')
          .condition(ifApp('^com\\.anthropic\\.claudefordesktop$')),
      ]),
      rule(
        'Crush 80: map left⌘ to 英数, right⌘ to かな',
        ifDevice([
          { vendor_id: 0x320f, product_id: 0x5055 },
          { vendor_id: 0x245a, product_id: 0x8276 },
        ]),
      ).manipulators([
        map('<⌘', '??').to('<⌘').toIfAlone('japanese_eisuu'),
        map('>⌘', '??').to('>⌘').toIfAlone('japanese_kana'),
      ]),
    ],
    { 'basic.to_if_alone_timeout_milliseconds': 10000 },
  ) // 10 seconds
}

const main = () => {
  const flags = parseArgs(Deno.args, {
    boolean: ['writeToProfile'],
    default: { writeToProfile: false },
  })
  const mods = createMods()

  if (flags.writeToProfile) {
    writeToProfile('Default profile', mods.rules, mods.parameters)
  } else {
    console.log(
      JSON.stringify(
        { title: title, maintainers: maintainers, rules: mods.rules },
        null,
        '  ',
      ),
    )
  }
}

main()
