const constants = require('./helpers/constants')
const test = require('ava')
const { compare, compareUnsorted } = require('../')

test('same structure same keys', t => {
  t.true(compareUnsorted({ "Level1": { "Level2": { "Level3": "Q" } }}, { "Level1": { "Level2": { "Level3": "Q" } }}))
})

test('same structure different keys #1', t => {
  t.false(compareUnsorted({ "Level1": { "Level2": { "Level3": "Q" } }}, { "Level1_broken_key": { "Level2": { "Level3": "Q" } }}))
})

test('same structure different keys #2', t => {
  t.false(compareUnsorted({ "Level1": { "Level2": { "Level3": "Q" } }}, { "Level1": { "Level2_broken_key": { "Level3": "Q" } }}))
})

test('same structure different keys #3', t => {
  t.false(compareUnsorted({ "Level1": { "Level2": { "Level3": "Q" } }}, { "Level1": { "Level2": { "Level3_broken_key": "Q" } }}))
})
