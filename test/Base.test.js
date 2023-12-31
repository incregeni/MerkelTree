const test = require('tape')
const { Base } = require('../dist/Base')

test('bufferify', t => {
  t.plan(6)

  const base = new Base()
  t.deepEqual(base.bufferify(''), Buffer.alloc(0))
  t.deepEqual(base.bufferify('0x123'), Buffer.from('123', 'hex'))
  t.deepEqual(base.bufferify('123'), Buffer.from('123', 'hex'))
  t.deepEqual(base.bufferify(Buffer.from('123')), Buffer.from('123'))
  t.deepEqual(base.bufferify(BigInt('0x123')), Buffer.from('123', 'hex'))
  t.deepEqual(base.bufferify(new Uint8Array([123])), Buffer.from([123]))
})

test('bufferifyFn', t => {
  t.plan(5)

  const base = new Base()
  const fn = base.bufferifyFn(value => value)
  t.deepEqual(fn('123'), Buffer.from('123', 'hex'))
  t.deepEqual(fn('0x123'), Buffer.from('123', 'hex'))
  t.deepEqual(fn('XYZ'), Buffer.from('XYZ'))
  t.deepEqual(fn(BigInt('0x123')), Buffer.from('123', 'hex'))
  t.deepEqual(fn(new Uint8Array([123])), Buffer.from([123]))
})

test('bigNumberify', t => {
  t.plan(4)

  const base = new Base()
  t.deepEqual(base.bigNumberify(123), BigInt(123))
  t.deepEqual(base.bigNumberify('0x123'), BigInt('0x123'))
  t.deepEqual(base.bigNumberify(BigInt(123)), BigInt(123))
  t.deepEqual(base.bigNumberify(new Uint8Array([123])), BigInt(123))
})

test('binarySearch', t => {
  t.plan(3)

  const base = new Base()
  const compareFunction = (a, b) => {
    if (a === b) return 0
    else if (a < b) return -1
    else return 1
  }
  t.equal(base.binarySearch([2, 2, 3, 3, 3, 4, 4, 4, 4], 3, compareFunction), 2)
  t.equal(base.binarySearch([3, 3, 3, 3, 3, 4, 4, 4, 4], 3, compareFunction), 0)
  t.equal(base.binarySearch([2, 2, 3, 3, 3, 4, 4, 4, 4], 1, compareFunction), -1)
})
