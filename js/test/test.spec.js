import { Shop, Item } from '../src/gilded_rose';

describe('Testing gilded rose updateQuality ', () => {

  describe('with a regular item ', () => {
    let item, shop

    beforeEach(() => {
      item = new Item('regular', 0, 10);

      shop = new Shop([ item ]);
    })

    describe('when sellIn is zero ', () => {
      beforeEach(() => {
        item.sellIn = 0;
      })

      test('then quality should decrease by two', () => {
        shop.updateQuality();
    
        expect(item.sellIn).toBe(-1);
        expect(item.quality).toBe(8);
      })
    })

    describe('when sellIn is positive ', () => {
      beforeEach(() => {
        item.sellIn = 10;
      })

      test('then quality and sellIn should decrease by one', () => {
        shop.updateQuality();
    
        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(9);
      })

      test('and quality is zero then quality should not decrease ', () => {
        item.quality = 0;
    
        shop.updateQuality();
    
        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(0);
      })
    })

    describe('when sellIn is negative ', () => {
      beforeEach(() => {
        item.sellIn = -10;
      })

      test('then quality should decrease by two ', () => {
        shop.updateQuality();
    
        expect(item.sellIn).toBe(-11);
        expect(item.quality).toBe(8);
      })
  
      test('and quality is zero then quality should not decrease ', () => {
        item.quality = 0;
        
        shop.updateQuality();
    
        expect(item.sellIn).toBe(-11);
        expect(item.quality).toBe(0);
      })
    })
  })

  describe('with aged brie item ', () => {
    let item, shop

    beforeEach(() => {
      item = new Item('Aged Brie', 10, 10);

      shop = new Shop([ item ]);
    })

    test('then quality should increase by one', () => {
      shop.updateQuality();
  
      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(11);
    })

    describe('when sellIn is negative ', () => {
      beforeEach(() => {
        item.sellIn = -10;
      })

      test('then quality should increase by two', () => {
        shop.updateQuality();
    
        expect(item.sellIn).toBe(-11);
        expect(item.quality).toBe(12);
      })
  
      test('and quality is forty-nine then quality should not increase more than fifty', () => {
        item.sellIn = -10;
        item.quality = 49;
        
        shop.updateQuality();
    
        expect(item.sellIn).toBe(-11);
        expect(item.quality).toBe(50);
      })
    })
  })

  describe('with Sulfuras Hand of Ragnaros item ', () => {
    let item, shop

    beforeEach(() => {
      item = new Item('Sulfuras, Hand of Ragnaros', 10, 80);

      shop = new Shop([ item ]);
    })

    test('should never change', () => {
      shop.updateQuality();
  
      expect(item.sellIn).toBe(10);
      expect(item.quality).toBe(80);
    })
  
    test('when sellIn is negative, should never change', () => {
      item.sellIn = -10;
  
      shop.updateQuality();
  
      expect(item.sellIn).toBe(-10);
      expect(item.quality).toBe(80);
    })
  })

  describe('with Backstage passes to a TAFKAL80ETC concert item ', () => {
    let item, shop

    beforeEach(() => {
      item = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10);

      shop = new Shop([ item ]);
    })

    describe('when concert its in twenty days ', () => {
      beforeEach(() => {
        item.sellIn = 20;
      })

      test('should increase quality by one', () => {
        shop.updateQuality();
    
        expect(item.sellIn).toBe(19);
        expect(item.quality).toBe(11);
      })
    })

    describe('when concert its in ten days ', () => {
      beforeEach(() => {
        item.sellIn = 10;
      })

      test('should increase quality by two', () => {
        shop.updateQuality();
    
        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(12);
      })
  
      test('with max quality should not increase quality', () => {
        item.quality = 50;
        
        shop.updateQuality();
    
        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(50);
      })
    })

    describe('when concert its in five days ', () => {
      beforeEach(() => {
        item.sellIn = 5;
      })

      test('should increase quality by three', () => {
        shop.updateQuality();
    
        expect(item.sellIn).toBe(4);
        expect(item.quality).toBe(13);
      })
  
      test('with max quality should not increase quality', () => {
        item.quality = 50;
    
        shop.updateQuality();
    
        expect(item.sellIn).toBe(4);
        expect(item.quality).toBe(50);
      })
    })

    describe('when concert was yesterday ', () => {
      beforeEach(() => {
        item.sellIn = 0;
      })

      test('should update quality to zero', () => {
        shop.updateQuality();
    
        expect(item.sellIn).toBe(-1);
        expect(item.quality).toBe(0);
      })
    })
  })
})