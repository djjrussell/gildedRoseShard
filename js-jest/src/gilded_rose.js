class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class SimpleItem extends Item {
  age () {
    this.sellIn -= 1;
  }
}

class RegularItem extends SimpleItem {

  age() {
    super.age();
    this.sellIn < 0
        ? this.quality -= 2
        : this.quality -= 1;

    if (this.quality < 0) {
      this.quality = 0;
    }
  }
}

class BrieItem extends SimpleItem {
  age () {
    super.age();
    this.quality += 1
    if (this.quality > 50) {
      this.quality = 50;
    }
  }
}

class ConjuredItem extends SimpleItem {
  age () {
    super.age();
    this.sellIn < 0
        ? this.quality -= 4
        : this.quality -= 2;

    if (this.quality < 0) {
      this.quality = 0;
    }
  }
}

class BackstageItem extends SimpleItem {
  age () {
    super.age();
    this.quality += 1

    if (this.sellIn < 11) {
      this.quality += 1
    }

    if(this.sellIn < 6) {
      this.quality += 1
    }

    if(this.quality > 50) {
      this.quality = 50;
    }
    if(this.sellIn < 0) {
      this.quality = 0;
    }
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    const updatedItems = [];
    this.items.forEach((item) => {

      let obj;

      const {
        name,
        sellIn,
        quality
      } = item;

      if (name.includes('Brie')) {

        obj = new BrieItem(name, sellIn, quality);

      } else if (name.includes('Sulfuras')) {

        obj = new SimpleItem(name, sellIn, quality);

      } else if (name.includes('Backstage')) {

        obj = new BackstageItem(name, sellIn, quality);

      } else if (name.includes('Conjured')) {

        obj = new ConjuredItem(name, sellIn, quality);

      } else {

        obj = new RegularItem(name, sellIn, quality);

      }

      obj.age();
      updatedItems.push(obj);
    })

    this.items = updatedItems;
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
