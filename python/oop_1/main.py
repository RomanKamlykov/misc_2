item1 = 'Phone'  # equal to: item1 = str('Phone')
item1_price = 100
item1_quantity = 5
item1_price_total = item1_price * item1_quantity


class Item:
    pass


item1 = Item()
item1.name = "Phone"
item1.price = 100
item1.quantity = 5


class Item2:
    def calc_total_price(self, x, y):
        return x * y


item2 = Item2()
print(item2.calc_total_price(2, 2))


class Item3:
    pay_rate = 0.8  # The pay rate after 20% discount
    all = []

    def __init__(self, name: str, price: float, quantity: float = 0):
        # Run validations to the received arguments
        assert price >= 0, f"Price {price} is not greater or equal to zero!"
        assert quantity >= 0

        # Assign to self object
        self.name = name
        self.price = price
        self.quantity = quantity

        # Actions to execute
        Item3.all.append(self)

    def calc_total_price(self):
        return self.price * self.quantity

    def apply_discount(self):
        self.price = self.price * self.pay_rate

    def __repr__(self):
        return f"Item('{self.name}', {self.price}, {self.quantity})"


item3 = Item3('Phone', 100, 5)
item3.has_numpad = False
print(item3.calc_total_price())
item3.apply_discount()
print(item3.price)


class Item4:
    pay_rate = 0.8  # The pay rate after 20% discount


print(Item.__dict__)  # All the attributes for Class level
print(item1.__dict__)  # All the attributes for instance level

item1 = Item3("Phone", 100, 1)
item2 = Item3("Laptop", 1000, 3)
item3 = Item3("Cable", 10, 5)
item4 = Item3("Mouse", 50, 5)
item5 = Item3("Keyboard", 75, 5)

print(Item3.all)

for instance in Item3.all:
    print(instance.name)
