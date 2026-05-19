import { parseArgs } from '@std/cli/parse-args'
import { complexModifications, ifApp, ifDevice, map, mapPointingButton, rule, writeToProfile } from 'karabiner.ts'

const title = 'My Karabiner Complex Modifications'
const maintainers = ['susumuota']

const createMods = () => {
  return complexModifications(
    [
      rule(
        'Claude Desktop: map return to shift+return',
      ).manipulators([
        map('return_or_enter')
          .to('return_or_enter', 'shift')
          .condition(ifApp('^com\\.anthropic\\.claudefordesktop$')),
      ]),
      rule(
        'Crush 80 and IQUNIX MQ80: map left_command to eisuu, right_command to kana',
        ifDevice([
          { vendor_id: 0x245a, product_id: 0x8276 },
          { vendor_id: 0x320f, product_id: 0x5055 },
          { vendor_id: 0x320f, product_id: 0x5088 },
        ]),
      ).manipulators([
        map('left_command', 'any').to('left_command').toIfAlone('japanese_eisuu'),
        map('right_command', 'any').to('right_command').toIfAlone('japanese_kana'),
      ]),
      rule(
        'Eave 65: map left_command to eisuu, right_command to kana',
        ifDevice([{ vendor_id: 0x4a16, product_id: 0x4a16 }]),
      ).manipulators([
        map('left_command', 'any').to('left_command').toIfAlone('japanese_eisuu'),
        map('right_command', 'any').to('right_command').toIfAlone('japanese_kana'),
      ]),
      rule(
        'Neo65 Core Plus: map left_command to eisuu, right_command to kana',
        ifDevice([{ vendor_id: 0x4e45, product_id: 0x4355 }]),
      ).manipulators([
        map('left_command', 'any').to('left_command').toIfAlone('japanese_eisuu'),
        map('right_command', 'any').to('right_command').toIfAlone('japanese_kana'),
      ]),
      rule(
        'MacBook Pro: use JIS keyboard as US layout',
        ifDevice([{ vendor_id: 0x05ac, product_id: 0x027e }]),
      ).manipulators([
        map('international3', 'optionalAny').to('backslash'),
        map('international1', 'optionalAny').to('slash'),
        map('backslash', 'optionalAny').to('return_or_enter'),
      ]),
      rule(
        'REALFORCE R3S JP TKL: use JIS keyboard as US layout',
        ifDevice([{ vendor_id: 0x0853, product_id: 0x0312 }]),
      ).manipulators([
        map('caps_lock', 'optionalAny').to('left_control'),
        map('left_control', 'optionalAny').to('caps_lock'),
        map('left_command', 'optionalAny').to('left_option'),
        map('grave_accent_and_tilde', 'optionalAny').to('escape'),
        map('escape', 'optionalAny').to('grave_accent_and_tilde'),
        map('international3', 'optionalAny').to('backslash'),
        map('international1', 'optionalAny').to('slash'),
        map('non_us_pound', 'optionalAny').to('return_or_enter'),
        map('left_option', 'any').to('left_command').toIfAlone('japanese_eisuu'),
        map('japanese_pc_nfer', 'any').to('left_command').toIfAlone('japanese_eisuu'),
        map('japanese_pc_xfer', 'any').to('right_command').toIfAlone('japanese_kana'),
        map('japanese_pc_katakana', 'any').to('right_command').toIfAlone('japanese_kana'),
      ]),
      rule(
        'SlimBlade Pro EQ: swap mouse button 3 and 4 for KiCad and Autodesk apps',
        ifDevice([{ vendor_id: 0x047d, product_id: 0x80d4 }]),
        ifApp(['^org\\.kicad\\..*$', '^com\\.autodesk\\..*$']),
      ).manipulators([
        mapPointingButton('button3').to({ pointing_button: 'button4' }),
        mapPointingButton('button4').to({ pointing_button: 'button3' }),
      ]),
    ],
    { 'basic.to_if_alone_timeout_milliseconds': 10000 }, // 10 seconds
  )
}

const main = () => {
  const flags = parseArgs(Deno.args, { boolean: ['writeToProfile'], default: { writeToProfile: false } })
  const mods = createMods()

  if (flags.writeToProfile) {
    writeToProfile('Default profile', mods.rules, mods.parameters)
  } else {
    console.log(JSON.stringify({ title: title, maintainers: maintainers, rules: mods.rules }, null, '  '))
  }
}

main()
