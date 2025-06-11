export class RecentlyAccessedList<T> implements Iterable<T> {
  private readonly _items: T[] = [];

  constructor(initialItems?: T[]) {
    if (initialItems) {
      this._items = [...initialItems];
    }
  }

  add(item: T): void {
    const index = this._items.indexOf(item);
    if (index !== -1) {
      this._items.splice(index, 1);
    }
    this._items.unshift(item);
  }

  remove(item: T): boolean {
    const index = this._items.indexOf(item);
    if (index !== -1) {
      this._items.splice(index, 1);
      return true;
    }
    return false;
  }

  has(item: T): boolean {
    const index = this._items.indexOf(item);
    return index !== -1;
  }

  touch(item: T): boolean {
    const index = this._items.indexOf(item);
    if (index !== -1) {
      this._items.splice(index, 1);
      this._items.unshift(item);
      return true;
    }
    return false;
  }

  toArray(): T[] {
    return [...this._items];
  }

  [Symbol.iterator](): Iterator<T> {
    let idx = 0;
    const arr = this._items;
    return {
      next(): IteratorResult<T> {
        if (idx < arr.length) {
          return { value: arr[idx++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}
