const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {

  it("Sulfuras - not to exceed 80, but sellIn to be decremented", function() {
    const sulfuras = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    let items = [sulfuras];
    const gildedRose = new Shop(items);

    for(let i = 0; i < 7; i += 1){
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(-7);
  });

  it("Regular items - quality not to dip below 0 while decrementing sellIn accordingly", function() {
    const regItem = new Item("+5 Dexterity Vest", 7, 0);
    let items = [regItem];
    const gildedRose = new Shop(items);

    for(let i = 0; i < 7; i += 1){
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(0);

    for(let i = 0; i < 7; i += 1){
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-7);
  });

  it("Regular items - degrade twice as fast after sellBy date", function() {
    const regItem = new Item("+5 Dexterity Vest", 0, 14);
    let items = [regItem];
    const gildedRose = new Shop(items);

    for(let i = 0; i < 7; i += 1){
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-7);
  });

  it("Aged Brie - gains value over time, will not go over 50", function() {
    const brie = new Item("Aged Brie", 0, 0);
    let items = [brie];
    const gildedRose = new Shop(items);

    for(let i = 0; i < 7; i += 1){
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(7);
    expect(items[0].sellIn).toBe(-7);

    for(let i = 0; i < 44; i += 1){
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(-51);
  });

  it("Conjured Items - degrade twice as fast, will not dip below 0 quality", function() {
    const conjuredItem = new Item("Conjured Mana Cake", 3, 48);
    let items = [conjuredItem];
    const gildedRose = new Shop(items);

    for(let i = 0; i < 3; i += 1){
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(42);
    expect(items[0].sellIn).toBe(0);

    for(let i = 0; i < 3; i += 1){
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(30);
    expect(items[0].sellIn).toBe(-3);

    for(let i = 0; i < 8; i += 1){
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-11);
  });


  it("Backstage Passes - increase in value", function() {
    const backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 13, 25);
    let items = [backstagePass];
    const gildedRose = new Shop(items);

    for(let i = 0; i < 2; i += 1){
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(27);
    expect(items[0].sellIn).toBe(11);

    for(let i = 0; i < 5; i += 1){
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(37);
    expect(items[0].sellIn).toBe(6);

    for(let i = 0; i < 5; i += 1){
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(1);

    for(let i = 0; i < 2; i += 1){
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  it("given example", function() {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      new Item("Conjured Mana Cake", 3, 6),
    ];

    // const days = Number(process.argv[2]) || 2;
    const days = 4;
    const gildedRose = new Shop(items);

    console.log("OMGHAI!");
    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log('name, sellIn, quality');
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  })
});
