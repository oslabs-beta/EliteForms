// below are unit tests for methods inside internalValMethod object. import internalValMethod object
// into this file, install jest, and add script for jest into package.json file to run

describe('Validation Rules Unit Tests', () => {

  const noError = {
    message: null,
    error: false
  }

  let node

  beforeEach(() => {
    node = {
      name: 'test'
    }    
  })

  describe('email Method Unit Tests', () => {
    it('Valid emails return noError object', () => {
      node.value = 'test@test.com'
      const result = internalValMethods.email(node)
      expect(result).toEqual(noError)
    })

    it('Invalid emails return error object', () => {
      node.value = 'abcdTEST'
      const result1 = internalValMethods.email(node)
      expect(typeof result1.message).toBe('string')
      expect(result1.error).toBe(true)

      node.value = 'abcdTEST@test'
      const result2 = internalValMethods.email(node)
      expect(typeof result2.message).toBe('string')
      expect(result2.error).toBe(true)

      node.value = 'abcdTEST.test'
      const result3 = internalValMethods.email(node)
      expect(typeof result3.message).toBe('string')
      expect(result3.error).toBe(true)
    })

    it('Undefined email values return error object', () => {
      node.value = undefined
      const result = internalValMethods.email(node)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
    })

  })

  describe('endsWith Method Unit Tests', () => {

    const devInput = ['ending', 'something']

    it('Valid strings return noError object', () => {
      node.value = 'testending'
      const result1 = internalValMethods.endsWith(node, devInput)
      expect(result1).toEqual(noError)

      node.value = 'testsomething'
      const result2 = internalValMethods.endsWith(node, devInput)
      expect(result2).toEqual(noError)
    })

    it('Invalid strings return error object', () => {
      node.value = 'testend'
      const result1 = internalValMethods.endsWith(node, devInput)
      expect(typeof result1.message).toBe('string')

      node.value = 'testsome'
      const result2 = internalValMethods.endsWith(node, devInput)
      expect(result2.error).toBe(true)
    })

    it('Undefined string values return error object', () => {
      node.value = undefined
      const result = internalValMethods.endsWith(node, devInput)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
    })

  })

  describe('matches Method Unit Tests', () => {

    const devInput1 = {
      type: 'string',
      values: ['foo', 'test']
    }

    it('Valid string matches return noError object', () => {
      node.value = 'foo'
      const result1 = internalValMethods.matches(node, devInput1)
      expect(result1).toEqual(noError)

      node.value = 'test'
      const result2 = internalValMethods.matches(node, devInput1)
      expect(result2).toEqual(noError)
    })

    it('Invalid string matches return error object', () => {
      node.value = 'food'
      const result1 = internalValMethods.matches(node, devInput1)
      expect(typeof result1.message).toBe('string')

      node.value = 'Test'
      const result2 = internalValMethods.matches(node, devInput1)
      expect(result2.error).toBe(true)
    })

    it('Undefined string value for string matches return error object', () => {
      node.value = undefined
      const result = internalValMethods.matches(node, devInput1)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
    })

    const devInput2 = {
      regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    }

    it('Valid regex matches return noError object', () => {
      node.value = 'test@gmail.com'
      const result1 = internalValMethods.matches(node, devInput2)
      expect(result1).toEqual(noError)

      
      node.value = 'foo@bing.com'
      const result2 = internalValMethods.matches(node, devInput2)
      expect(result2).toEqual(noError)
    })

    it('Invalid regex matches return error object', () => {
      node.value = 'foo@test'
      const result1 = internalValMethods.matches(node, devInput2)
      expect(typeof result1.message).toBe('string')

      node.value = 'test.foo'
      const result2 = internalValMethods.matches(node, devInput2)
      expect(result2.error).toBe(true)
    })

    it('Undefined string value for regex matches return error object', () => {
      node.value = undefined
      const result = internalValMethods.matches(node, devInput2)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
    })
  })

  describe('not Method Unit Tests', () => {

    const devInput1 = {
      type: 'string',
      values: ['foo', 'test']
    }

    it('Valid string entries return noError object', () => {
      node.value = 'Test'
      const result1 = internalValMethods.not(node, devInput1)
      expect(result1).toEqual(noError)

      node.value = 'food'
      const result2 = internalValMethods.not(node, devInput1)
      expect(result2).toEqual(noError)
    })

    it('Invalid string entries return error object', () => {
      node.value = 'foo'
      const result1 = internalValMethods.not(node, devInput1)
      expect(typeof result1.message).toBe('string')

      node.value = 'test'
      const result2 = internalValMethods.not(node, devInput1)
      expect(result2.error).toBe(true)
    })

    it('Undefined string value for string entries return error object', () => {
      //this is a problem******************
      node.value = undefined
      const result = internalValMethods.not(node, devInput1)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
      //this is a problem******************
    })

    const devInput2 = {
      regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    }

    it('Valid regex entries return noError object', () => {
      node.value = 'test@gmail'
      const result1 = internalValMethods.not(node, devInput2)
      expect(result1).toEqual(noError)

      
      node.value = 'foo.com'
      const result2 = internalValMethods.not(node, devInput2)
      expect(result2).toEqual(noError)
    })

    it('Invalid regex entries return error object', () => {
      node.value = 'testing@gmail.com'
      const result1 = internalValMethods.not(node, devInput2)
      expect(typeof result1.message).toBe('string')

      node.value = 'foofoo@bing.com'
      const result2 = internalValMethods.not(node, devInput2)
      expect(result2.error).toBe(true)
    })

    it('Undefined string value for regex entries return error object', () => {
      //this is a problem******************
      node.value = undefined
      const result = internalValMethods.not(node, devInput2)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
      //this is a problem******************
    })

  })

  describe('required Method Unit Tests', () => {
    it('Valid values return noError object', () => {
      node.value = 'foo'
      const result1 = internalValMethods.required(node)
      expect(result1).toEqual(noError)
  
      node.value = 'test'
      const result2 = internalValMethods.required(node)
      expect(result2).toEqual(noError)
    })
  
    it('Empty string value returns error object', () => {
      node.value = ''
      const result = internalValMethods.required(node)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
    })
  
    it('Undefined value returns error object', () => {
      node.value = undefined
      const result = internalValMethods.required(node)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
    })
  })

  describe('alphanumeric Method Unit Tests', () => {
    it('Valid values return noError object', () => {
      node.value = 'foo123'
      const result1 = internalValMethods.alphanumeric(node)
      expect(result1).toEqual(noError)

      node.value = 'F1O2O3'
      const result2 = internalValMethods.alphanumeric(node)
      expect(result2).toEqual(noError)

      node.value = 'Foo123Test'
      const result3 = internalValMethods.alphanumeric(node)
      expect(result3).toEqual(noError)
    })

    it('Invalid values return error object', () => {
      //this is a problem******************
      node.value = ''
      const result1 = internalValMethods.alphanumeric(node)
      expect(typeof result1.message).toBe('string')
      expect(result1.error).toBe(true)
      //this is a problem******************


      node.value = 'abcdT12EST@test'
      const result2 = internalValMethods.alphanumeric(node)
      expect(typeof result2.message).toBe('string')
      expect(result2.error).toBe(true)

      node.value = 'ab@34te!s?t'
      const result3 = internalValMethods.alphanumeric(node)
      expect(typeof result3.message).toBe('string')
      expect(result3.error).toBe(true)
    })

    it('Undefined values return error object', () => {
      //this is a problem******************
      node.value = undefined
      const result = internalValMethods.alphanumeric(node)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
      //this is a problem******************
    })

  })

  describe('alpha Method Unit Tests', () => {
    it('Valid values return noError object', () => {
      node.value = 'abcd'
      const result1 = internalValMethods.alpha(node)
      expect(result1).toEqual(noError)

      node.value = 'foo'
      const result2 = internalValMethods.alpha(node)
      expect(result2).toEqual(noError)
    })

    it('Invalid values return error object', () => {
      //this is a problem******************
      node.value = ''
      const result1 = internalValMethods.alpha(node)
      expect(typeof result1.message).toBe('string')
      expect(result1.error).toBe(true)
      //this is a problem******************


      node.value = 'abcdTEST@test'
      const result2 = internalValMethods.alpha(node)
      expect(typeof result2.message).toBe('string')
      expect(result2.error).toBe(true)

      node.value = 'ab@te!s?t'
      const result3 = internalValMethods.alpha(node)
      expect(typeof result3.message).toBe('string')
      expect(result3.error).toBe(true)
    })

    it('Undefined values return error object', () => {
      //this is a problem******************
      node.value = undefined
      const result = internalValMethods.alpha(node)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
      //this is a problem******************
    })

  })

  describe('number Method Unit Tests', () => {
    it('Valid values return noError object', () => {
      node.value = '1234'
      const result1 = internalValMethods.number(node)
      expect(result1).toEqual(noError)

      node.value = '8'
      const result2 = internalValMethods.number(node)
      expect(result2).toEqual(noError)
    })

    it('Invalid values return error object', () => {
      //this is a problem******************
      node.value = ''
      const result1 = internalValMethods.number(node)
      expect(typeof result1.message).toBe('string')
      expect(result1.error).toBe(true)
      //this is a problem******************


      node.value = 'abc12dTESTt89est'
      const result2 = internalValMethods.number(node)
      expect(typeof result2.message).toBe('string')
      expect(result2.error).toBe(true)

      node.value = 'ab@t234e!s?t'
      const result3 = internalValMethods.number(node)
      expect(typeof result3.message).toBe('string')
      expect(result3.error).toBe(true)
    })

    it('Undefined values return error object', () => {
      node.value = undefined
      const result = internalValMethods.number(node)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
    })

  })

  describe('password Method Unit Tests', () => {
    it('Valid values return noError object', () => {
      node.value = 'aA1!bB2@'
      const result1 = internalValMethods.password(node)
      expect(result1).toEqual(noError)

      node.value = 'aaAA11!!abc'
      const result2 = internalValMethods.password(node)
      expect(result2).toEqual(noError)
    })

    it('Invalid values return error object', () => {
      node.value = ''
      const result1 = internalValMethods.password(node)
      expect(typeof result1.message).toBe('string')
      expect(result1.error).toBe(true)


      node.value = 'aA1!'
      const result2 = internalValMethods.password(node)
      expect(typeof result2.message).toBe('string')
      expect(result2.error).toBe(true)

      node.value = 'aaAA11abcd'
      const result3 = internalValMethods.password(node)
      expect(typeof result3.message).toBe('string')
      expect(result3.error).toBe(true)
    })

    it('Undefined values return error object', () => {
      node.value = undefined
      const result = internalValMethods.password(node)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
    })

  })

  describe('min Method Unit Tests', () => {

    describe('Testing text type inputs', () => {

      const devInput1 = 5
      const devInput2 = 10
  
      it('Valid strings return noError object', () => {
        node.value = 'te$tfoo'
        const result1 = internalValMethods.min(node, devInput1)
        expect(result1).toEqual(noError)
  
        node.value = 'te$ts0mething'
        const result2 = internalValMethods.min(node, devInput2)
        expect(result2).toEqual(noError)
      })
  
      it('Invalid strings return error object', () => {
        node.value = 'te$t'
        const result1 = internalValMethods.min(node, devInput1)
        expect(typeof result1.message).toBe('string')
  
        node.value = 'te$ts0me'
        const result2 = internalValMethods.min(node, devInput2)
        expect(result2.error).toBe(true)
      })
  
      it('Undefined string values return error object', () => {
        node.value = undefined
        const result1 = internalValMethods.min(node, devInput1)
        expect(typeof result1.message).toBe('string')
        expect(result1.error).toBe(true)
  
        node.value = undefined
        const result2 = internalValMethods.min(node, devInput2)
        expect(typeof result2.message).toBe('string')
        expect(result2.error).toBe(true)
      })

    })

    describe('Testing range type inputs', () => {

      const devInput1 = 5
      const devInput2 = 10
  
      it('Valid range values return noError object', () => {
        node.value = '7'
        node.type = 'range'
        const result1 = internalValMethods.min(node, devInput1)
        expect(result1).toEqual(noError)
  
        node.value = '17'
        node.type = 'range'
        const result2 = internalValMethods.min(node, devInput2)
        expect(result2).toEqual(noError)
      })
  
      it('Invalid range values return error object', () => {
        node.value = '4'
        node.type = 'range'
        const result1 = internalValMethods.min(node, devInput1)
        expect(typeof result1.message).toBe('string')
  
        node.value = '8'
        node.type = 'range'
        const result2 = internalValMethods.min(node, devInput2)
        expect(result2.error).toBe(true)
      })
  
      it('Undefined range values return error object', () => {
        node.value = undefined
        node.type = 'range'
        const result1 = internalValMethods.min(node, devInput1)
        expect(typeof result1.message).toBe('string')
        expect(result1.error).toBe(true)
  
        node.value = undefined
        node.type = 'range'
        const result2 = internalValMethods.min(node, devInput2)
        expect(typeof result2.message).toBe('string')
        expect(result2.error).toBe(true)
      })

    })

    describe('Testing checkbox type inputs', () => {

      const devInput1 = 2
      const devInput2 = 5
  
      it('Valid number of selections return noError object', () => {
        node.value = ['foo1', 'foo2', 'foo3']
        node.type = 'checkbox'
        const result1 = internalValMethods.min(node, devInput1)
        expect(result1).toEqual(noError)
  
        node.value = ['foo1', 'foo2', 'foo3', 'foo4', 'foo5', 'foo6']
        node.type = 'checkbox'
        const result2 = internalValMethods.min(node, devInput2)
        expect(result2).toEqual(noError)
      })
  
      it('Invalid number of selections return error object', () => {
        node.value = []
        node.type = 'checkbox'
        const result1 = internalValMethods.min(node, devInput1)
        expect(typeof result1.message).toBe('string')
  
        node.value = ['foo1', 'foo2', 'foo3']
        node.type = 'checkbox'
        const result2 = internalValMethods.min(node, devInput2)
        expect(result2.error).toBe(true)
      })
  
      it('Undefined value return error object', () => {
        node.value = undefined
        node.type = 'checkbox'
        const result1 = internalValMethods.min(node, devInput1)
        expect(typeof result1.message).toBe('string')
        expect(result1.error).toBe(true)
  
        node.value = undefined
        node.type = 'checkbox'
        const result2 = internalValMethods.min(node, devInput2)
        expect(typeof result2.message).toBe('string')
        expect(result2.error).toBe(true)
      })

    })
    
  })

  describe('max Method Unit Tests', () => {

    describe('Testing text type inputs', () => {

      const devInput1 = 5
      const devInput2 = 10
  
      it('Valid strings return noError object', () => {
        node.value = 'te$t'
        const result1 = internalValMethods.max(node, devInput1)
        expect(result1).toEqual(noError)
  
        node.value = 'te$ts0me'
        const result2 = internalValMethods.max(node, devInput2)
        expect(result2).toEqual(noError)
      })
  
      it('Invalid strings return error object', () => {
        node.value = 'te$tf00'
        const result1 = internalValMethods.max(node, devInput1)
        expect(typeof result1.message).toBe('string')
  
        node.value = 'te$ts0mething'
        const result2 = internalValMethods.max(node, devInput2)
        expect(result2.error).toBe(true)
      })
  
      it('Undefined string values return error object', () => {
        //this is a problem******************
        node.value = undefined
        const result1 = internalValMethods.max(node, devInput1)
        expect(typeof result1.message).toBe('string')
        expect(result1.error).toBe(true)
  
        node.value = undefined
        const result2 = internalValMethods.max(node, devInput2)
        expect(typeof result2.message).toBe('string')
        expect(result2.error).toBe(true)
        //this is a problem******************
      })

    })

    describe('Testing range type inputs', () => {

      const devInput1 = 5
      const devInput2 = 10
  
      it('Valid range values return noError object', () => {
        node.value = '2'
        node.type = 'range'
        const result1 = internalValMethods.max(node, devInput1)
        expect(result1).toEqual(noError)
  
        node.value = '7'
        node.type = 'range'
        const result2 = internalValMethods.max(node, devInput2)
        expect(result2).toEqual(noError)
      })
  
      it('Invalid range values return error object', () => {
        node.value = '9'
        node.type = 'range'
        const result1 = internalValMethods.max(node, devInput1)
        expect(typeof result1.message).toBe('string')
  
        node.value = '18'
        node.type = 'range'
        const result2 = internalValMethods.max(node, devInput2)
        expect(result2.error).toBe(true)
      })
  
      it('Undefined range values return error object', () => {
        //this is a problem******************
        node.value = undefined
        node.type = 'range'
        const result1 = internalValMethods.max(node, devInput1)
        expect(typeof result1.message).toBe('string')
        expect(result1.error).toBe(true)
  
        node.value = undefined
        node.type = 'range'
        const result2 = internalValMethods.max(node, devInput2)
        expect(typeof result2.message).toBe('string')
        expect(result2.error).toBe(true)
        //this is a problem******************
      })

    })

    describe('Testing checkbox type inputs', () => {

      const devInput1 = 2
      const devInput2 = 5
  
      it('Valid number of selections return noError object', () => {
        node.value = ['foo1', 'foo2']
        node.type = 'checkbox'
        const result1 = internalValMethods.max(node, devInput1)
        expect(result1).toEqual(noError)
  
        node.value = ['foo1', 'foo2']
        node.type = 'checkbox'
        const result2 = internalValMethods.max(node, devInput2)
        expect(result2).toEqual(noError)
      })
  
      it('Invalid number of selections return error object', () => {
        node.value = ['foo1', 'foo2', 'foo3']
        node.type = 'checkbox'
        const result1 = internalValMethods.max(node, devInput1)
        expect(typeof result1.message).toBe('string')
  
        node.value = ['foo1', 'foo2', 'foo3', 'foo4', 'foo5', 'foo6']
        node.type = 'checkbox'
        const result2 = internalValMethods.max(node, devInput2)
        expect(result2.error).toBe(true)
      })
  
      it('Undefined value return error object', () => {
        //this is a problem******************
        node.value = undefined
        node.type = 'checkbox'
        const result1 = internalValMethods.max(node, devInput1)
        expect(typeof result1.message).toBe('string')
        expect(result1.error).toBe(true)
  
        node.value = undefined
        node.type = 'checkbox'
        const result2 = internalValMethods.max(node, devInput2)
        expect(typeof result2.message).toBe('string')
        expect(result2.error).toBe(true)
        //this is a problem******************
      })

    })
    
  })

  describe('minWords Method Unit Tests', () => {

    const devInput1 = 5
    const devInput2 = 10

    it('Valid strings return noError object', () => {
      node.value = 'the quick, brown fox! jumps over the lazy dog'
      const result1 = internalValMethods.minWords(node, devInput1)
      expect(result1).toEqual(noError)

      node.value = 'the quick, brown fox! jumps over the lazy dog. if the dog reacted, was it lazy?'
      const result2 = internalValMethods.minWords(node, devInput2)
      expect(result2).toEqual(noError)
    })

    it('Invalid strings return error object', () => {
      node.value = 'the quick?'
      const result1 = internalValMethods.minWords(node, devInput1)
      expect(typeof result1.message).toBe('string')

      node.value = 'the quick brown fox? jumped!'
      const result2 = internalValMethods.minWords(node, devInput2)
      expect(result2.error).toBe(true)
    })

    it('Undefined string values return error object', () => {
      //this is a problem******************
      node.value = undefined
      const result = internalValMethods.minWords(node, devInput1)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
      //this is a problem******************
    })
  })

  describe('maxWords Method Unit Tests', () => {

    const devInput1 = 5
    const devInput2 = 10

    it('Valid strings return noError object', () => {
      node.value = 'test sentance?'
      const result1 = internalValMethods.maxWords(node, devInput1)
      expect(result1).toEqual(noError)

      node.value = 'a longer. test? sentance! will this work?'
      const result2 = internalValMethods.maxWords(node, devInput2)
      expect(result2).toEqual(noError)
    })

    it('Invalid strings return error object', () => {
      node.value = 'the quick, brown fox! jumps over the lazy dog?'
      const result1 = internalValMethods.maxWords(node, devInput1)
      expect(typeof result1.message).toBe('string')

      node.value = 'the quick, brown fox! jumps over the lazy dog? if the dog jumps... was it really lazy??'
      const result2 = internalValMethods.maxWords(node, devInput2)
      expect(result2.error).toBe(true)
    })

    it('Undefined string values return error object', () => {
      //this is a problem******************
      node.value = undefined
      const result = internalValMethods.maxWords(node, devInput1)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
      //this is a problem******************
    })
  })

  describe('between Method Unit Tests', () => {

    describe('Testing text type inputs', () => {

      const devInput1 = [2,10]
      const devInput2 = [5,15]
  
      it('Valid strings return noError object', () => {
        node.value = 'te$t'
        const result1 = internalValMethods.between(node, devInput1)
        expect(result1).toEqual(noError)
  
        node.value = 'te$ts0me'
        const result2 = internalValMethods.between(node, devInput2)
        expect(result2).toEqual(noError)
      })
  
      it('Invalid strings return error object', () => {
        node.value = '!'
        const result1 = internalValMethods.between(node, devInput1)
        expect(typeof result1.message).toBe('string')
  
        node.value = 'te$ts0mething12345!!abcd'
        const result2 = internalValMethods.between(node, devInput2)
        expect(result2.error).toBe(true)
      })
  
      it('Undefined string values return error object', () => {
        //this is a problem******************
        node.value = undefined
        const result1 = internalValMethods.between(node, devInput1)
        expect(typeof result1.message).toBe('string')
        expect(result1.error).toBe(true)
  
        node.value = undefined
        const result2 = internalValMethods.between(node, devInput2)
        expect(typeof result2.message).toBe('string')
        expect(result2.error).toBe(true)
        //this is a problem******************
      })

    })

    describe('Testing range type inputs', () => {

      const devInput1 = [2,10]
      const devInput2 = [5,15]
  
      it('Valid range values return noError object', () => {
        node.value = '4'
        node.type = 'range'
        const result1 = internalValMethods.between(node, devInput1)
        expect(result1).toEqual(noError)
  
        node.value = '11'
        node.type = 'range'
        const result2 = internalValMethods.between(node, devInput2)
        expect(result2).toEqual(noError)
      })
  
      it('Invalid range values return error object', () => {
        node.value = '100'
        node.type = 'range'
        const result1 = internalValMethods.between(node, devInput1)
        expect(typeof result1.message).toBe('string')
  
        node.value = '1'
        node.type = 'range'
        const result2 = internalValMethods.between(node, devInput2)
        expect(result2.error).toBe(true)
      })
  
      it('Undefined range values return error object', () => {
        //this is a problem******************
        node.value = undefined
        node.type = 'range'
        const result1 = internalValMethods.between(node, devInput1)
        expect(typeof result1.message).toBe('string')
        expect(result1.error).toBe(true)
  
        node.value = undefined
        node.type = 'range'
        const result2 = internalValMethods.between(node, devInput2)
        expect(typeof result2.message).toBe('string')
        expect(result2.error).toBe(true)
        //this is a problem******************
      })

    })

    describe('Testing checkbox type inputs', () => {

      const devInput1 = [2,10]
      const devInput2 = [5,15]
  
      it('Valid number of selections return noError object', () => {
        node.value = ['foo1', 'foo2', 'foo3']
        node.type = 'checkbox'
        const result1 = internalValMethods.between(node, devInput1)
        expect(result1).toEqual(noError)
  
        node.value = ['foo1', 'foo2', 'foo3', 'foo4', 'foo5', 'foo6', 'foo7']
        node.type = 'checkbox'
        const result2 = internalValMethods.between(node, devInput2)
        expect(result2).toEqual(noError)
      })
  
      it('Invalid number of selections return error object', () => {
        node.value = ['foo1', 'foo2', 'foo3', 'foo4', 'foo5', 'foo6', 'foo7', 'foo8', 'foo9', 'foo10', 'foo11']
        node.type = 'checkbox'
        const result1 = internalValMethods.between(node, devInput1)
        expect(typeof result1.message).toBe('string')
  
        node.value = ['foo1', 'foo2']
        node.type = 'checkbox'
        const result2 = internalValMethods.between(node, devInput2)
        expect(result2.error).toBe(true)
      })
  
      it('Undefined value return error object', () => {
        //this is a problem******************
        node.value = undefined
        node.type = 'checkbox'
        const result1 = internalValMethods.between(node, devInput1)
        expect(typeof result1.message).toBe('string')
        expect(result1.error).toBe(true)
  
        node.value = undefined
        node.type = 'checkbox'
        const result2 = internalValMethods.between(node, devInput2)
        expect(typeof result2.message).toBe('string')
        expect(result2.error).toBe(true)
        //this is a problem******************
      })

    })
    
  })

  describe('reqNumber Method Unit Tests', () => {
    it('Valid strings return noError object', () => {
      node.value = '12345'
      const result1 = internalValMethods.reqNumber(node)
      expect(result1).toEqual(noError)

      node.value = 'ab!1A$@lkja'
      const result2 = internalValMethods.reqNumber(node)
      expect(result2).toEqual(noError)
    })

    it('Invalid strings return error object', () => {
      node.value = 'abcdTEST'
      const result1 = internalValMethods.reqNumber(node)
      expect(typeof result1.message).toBe('string')
      expect(result1.error).toBe(true)

      node.value = 'ab!A$@lkja'
      const result2 = internalValMethods.reqNumber(node)
      expect(typeof result2.message).toBe('string')
      expect(result2.error).toBe(true)
    })

    it('Undefined values return error object', () => {
      node.value = undefined
      const result = internalValMethods.reqNumber(node)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
    })

  })

  describe('reqUpper Method Unit Tests', () => {
    it('Valid strings return noError object', () => {
      node.value = 'ABCD'
      const result1 = internalValMethods.reqUpper(node)
      expect(result1).toEqual(noError)

      node.value = 'ab!1A$@lkja'
      const result2 = internalValMethods.reqUpper(node)
      expect(result2).toEqual(noError)
    })

    it('Invalid strings return error object', () => {
      node.value = 'abcd1234'
      const result1 = internalValMethods.reqUpper(node)
      expect(typeof result1.message).toBe('string')
      expect(result1.error).toBe(true)

      node.value = 'ab!1$@lkja'
      const result2 = internalValMethods.reqUpper(node)
      expect(typeof result2.message).toBe('string')
      expect(result2.error).toBe(true)
    })

    it('Undefined values return error object', () => {
      node.value = undefined
      const result = internalValMethods.reqUpper(node)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
    })

  })

  describe('reqLower Method Unit Tests', () => {
    it('Valid strings return noError object', () => {
      node.value = 'abcd'
      const result1 = internalValMethods.reqLower(node)
      expect(result1).toEqual(noError)

      node.value = 'BC!S$1a2AS32'
      const result2 = internalValMethods.reqLower(node)
      expect(result2).toEqual(noError)
    })

    it('Invalid strings return error object', () => {
      node.value = 'ABCD1234'
      const result1 = internalValMethods.reqLower(node)
      expect(typeof result1.message).toBe('string')
      expect(result1.error).toBe(true)

      node.value = 'BC!S$12AS32'
      const result2 = internalValMethods.reqLower(node)
      expect(typeof result2.message).toBe('string')
      expect(result2.error).toBe(true)
    })

    it('Undefined values return error object', () => {
      //this is a problem******************
      node.value = undefined
      const result = internalValMethods.reqLower(node)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
      //this is a problem******************
    })

  })

  describe('reqSpecialChar Method Unit Tests', () => {
    it('Valid strings return noError object', () => {
      node.value = '!@#$'
      const result1 = internalValMethods.reqSpecialChar(node)
      expect(result1).toEqual(noError)

      node.value = 'ab1A$lkja'
      const result2 = internalValMethods.reqSpecialChar(node)
      expect(result2).toEqual(noError)
    })

    it('Invalid strings return error object', () => {
      node.value = 'abcd1234'
      const result1 = internalValMethods.reqSpecialChar(node)
      expect(typeof result1.message).toBe('string')
      expect(result1.error).toBe(true)

      node.value = 'ab1lkja'
      const result2 = internalValMethods.reqSpecialChar(node)
      expect(typeof result2.message).toBe('string')
      expect(result2.error).toBe(true)
    })

    it('Undefined values return error object', () => {
      node.value = undefined
      const result = internalValMethods.reqSpecialChar(node)
      expect(typeof result.message).toBe('string')
      expect(result.error).toBe(true)
    })

  })

  describe('before Method Unit Tests', () => {
    describe('If only YEAR is provided', () => {

      const devInput = [2020]

      it('Valid dates return noError object', () => {
        node.value = '2000-02-25'
        const result1 = internalValMethods.before(node, devInput)
        expect(result1).toEqual(noError)

        node.value = '2019-12-31'
        const result2 = internalValMethods.before(node, devInput)
        expect(result2).toEqual(noError)
      })
  
      it('Invalid dates return error object', () => {
        node.value = '2023-01-20'
        const result1 = internalValMethods.before(node, devInput)
        expect(typeof result1.message).toBe('string')
        expect(result1.error).toBe(true)
  
        node.value = '2020-01-01'
        const result2 = internalValMethods.before(node, devInput)
        expect(typeof result2.message).toBe('string')
        expect(result2.error).toBe(true)
      })
  
      it('Undefined date values return error object', () => {
        //this HHHUUUGGGEEE is a problem******************
        node.value = undefined
        const result = internalValMethods.before(node, devInput)
        expect(typeof result.message).toBe('string')
        expect(result.error).toBe(true)
        //this HHHUUUGGGEEE is a problem******************
      })
    })

    describe('If YEAR and MONTH are provided', () => {

      const devInput = [2020, 4]

      it('Valid dates return noError object', () => {
        node.value = '2000-02-25'
        const result1 = internalValMethods.before(node, devInput)
        expect(result1).toEqual(noError)

        node.value = '2020-03-31'
        const result2 = internalValMethods.before(node, devInput)
        expect(result2).toEqual(noError)
      })
  
      it('Invalid dates return error object', () => {
        node.value = '2023-01-20'
        const result1 = internalValMethods.before(node, devInput)
        expect(typeof result1.message).toBe('string')
        expect(result1.error).toBe(true)
  
        node.value = '2020-04-01'
        const result2 = internalValMethods.before(node, devInput)
        expect(typeof result2.message).toBe('string')
        expect(result2.error).toBe(true)
      })
  
      it('Undefined date values return error object', () => {
        //this HHHUUUGGGEEE is a problem******************
        node.value = undefined
        const result = internalValMethods.before(node, devInput)
        expect(typeof result.message).toBe('string')
        expect(result.error).toBe(true)
        //this HHHUUUGGGEEE is a problem******************
      })
    })

    describe('If YEAR, MONTH and DAY are provided', () => {

      const devInput = [2020, 4, 15]

      it('Valid dates return noError object', () => {
        node.value = '2000-02-25'
        const result1 = internalValMethods.before(node, devInput)
        expect(result1).toEqual(noError)

        node.value = '2020-04-15'
        const result2 = internalValMethods.before(node, devInput)
        expect(result2).toEqual(noError)
      })
  
      it('Invalid dates return error object', () => {
        node.value = '2023-01-20'
        const result1 = internalValMethods.before(node, devInput)
        expect(typeof result1.message).toBe('string')
        expect(result1.error).toBe(true)
  
        node.value = '2020-04-16'
        const result2 = internalValMethods.before(node, devInput)
        expect(typeof result2.message).toBe('string')
        expect(result2.error).toBe(true)
      })
  
      it('Undefined date values return error object', () => {
        //this HHHUUUGGGEEE is a problem******************
        node.value = undefined
        const result = internalValMethods.before(node, devInput)
        expect(typeof result.message).toBe('string')
        expect(result.error).toBe(true)
        //this HHHUUUGGGEEE is a problem******************
      })
    })

  })

  describe('after Method Unit Tests', () => {
    describe('If only YEAR is provided', () => {

      const devInput = [2020]

      it('Valid dates return noError object', () => {
        node.value = '2040-09-17'
        const result1 = internalValMethods.after(node, devInput)
        expect(result1).toEqual(noError)

        node.value = '2021-01-01'
        const result2 = internalValMethods.after(node, devInput)
        expect(result2).toEqual(noError)
      })
  
      it('Invalid dates return error object', () => {
        node.value = '2019-04-15'
        const result1 = internalValMethods.after(node, devInput)
        expect(typeof result1.message).toBe('string')
        expect(result1.error).toBe(true)
  
        node.value = '2019-12-31'
        const result2 = internalValMethods.after(node, devInput)
        expect(typeof result2.message).toBe('string')
        expect(result2.error).toBe(true)
      })
  
      it('Undefined date values return error object', () => {
        //this HHHUUUGGGEEE is a problem******************
        node.value = undefined
        const result = internalValMethods.after(node, devInput)
        expect(typeof result.message).toBe('string')
        expect(result.error).toBe(true)
        //this HHHUUUGGGEEE is a problem******************
      })
    })

    describe('If YEAR and MONTH are provided', () => {

      const devInput = [2020, 4]

      it('Valid dates return noError object', () => {
        node.value = '2023-01-20'
        const result1 = internalValMethods.after(node, devInput)
        expect(result1).toEqual(noError)

        node.value = '2020-05-01'
        const result2 = internalValMethods.after(node, devInput)
        expect(result2).toEqual(noError)
      })
  
      it('Invalid dates return error object', () => {
        node.value = '2000-02-25'
        const result1 = internalValMethods.after(node, devInput)
        expect(typeof result1.message).toBe('string')
        expect(result1.error).toBe(true)
        
        node.value = '2020-04-31'
        const result2 = internalValMethods.after(node, devInput)
        expect(typeof result2.message).toBe('string')
        expect(result2.error).toBe(true)
      })
  
      it('Undefined date values return error object', () => {
        //this HHHUUUGGGEEE is a problem******************
        node.value = undefined
        const result = internalValMethods.after(node, devInput)
        expect(typeof result.message).toBe('string')
        expect(result.error).toBe(true)
        //this HHHUUUGGGEEE is a problem******************
      })
    })

    describe('If YEAR, MONTH and DAY are provided', () => {

      const devInput = [2020, 4, 15]

      it('Valid dates return noError object', () => {
        node.value = '2023-01-20'
        const result1 = internalValMethods.after(node, devInput)
        expect(result1).toEqual(noError)

        node.value = '2020-04-15'
        const result2 = internalValMethods.after(node, devInput)
        expect(result2).toEqual(noError)
      })
  
      it('Invalid dates return error object', () => {
        node.value = '2000-02-25'
        const result1 = internalValMethods.after(node, devInput)
        expect(typeof result1.message).toBe('string')
        expect(result1.error).toBe(true)
  
        node.value = '2020-04-14'
        const result2 = internalValMethods.after(node, devInput)
        expect(typeof result2.message).toBe('string')
        expect(result2.error).toBe(true)
      })
  
      it('Undefined date values return error object', () => {
        //this HHHUUUGGGEEE is a problem******************
        node.value = undefined
        const result = internalValMethods.after(node, devInput)
        expect(typeof result.message).toBe('string')
        expect(result.error).toBe(true)
        //this HHHUUUGGGEEE is a problem******************
      })
    })
    
  })

})

