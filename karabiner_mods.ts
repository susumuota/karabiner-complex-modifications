import { parseArgs } from 'jsr:@std/cli/parse-args'
import {
  complexModifications,
  ifApp,
  ifDevice,
  map,
  mapPointingButton,
  rule,
  writeToProfile,
} from 'https://deno.land/x/karabinerts/deno.ts'

const title = 'My Karabiner Complex Modifications'
const maintainers = ['susumuota']

const createMods = () => {
  return complexModifications(
    [
      rule('Claude Desktop: map return to shift+return').manipulators([
        map('return_or_enter')
          .to('return_or_enter', 'shift')
          .condition(ifApp('^com\\.anthropic\\.claudefordesktop$')),
      ]),
      rule(
        'Crush 80: map left_command to eisuu, right_command to kana',
        ifDevice([
          { vendor_id: 0x320f, product_id: 0x5055 },
          { vendor_id: 0x245a, product_id: 0x8276 },
        ]),
      ).manipulators([
        map('left_command', 'any').to('left_command').toIfAlone('japanese_eisuu'),
        map('right_command', 'any').to('right_command').toIfAlone('japanese_kana'),
      ]),
      rule(
        'Eave 65: map left_command to eisuu, right_command to kana',
        ifDevice([
          { vendor_id: 0x4a16, product_id: 0x4a16 },
        ]),
      ).manipulators([
        map('left_command', 'any').to('left_command').toIfAlone('japanese_eisuu'),
        map('right_command', 'any').to('right_command').toIfAlone('japanese_kana'),
      ]),
      rule(
        'SlimBlade Pro EQ: swap mouse button 3 and 4 for KiCad',
        ifDevice([
          { vendor_id: 0x047d, product_id: 0x80d4 },
        ]),
        ifApp(['^org\\.kicad\\..*$']),
      ).manipulators([
        mapPointingButton('button3').to({ pointing_button: 'button4' }),
        mapPointingButton('button4').to({ pointing_button: 'button3' }),
      ]),
    ],
    { 'basic.to_if_alone_timeout_milliseconds': 10000 }, // 10 seconds
  )
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
