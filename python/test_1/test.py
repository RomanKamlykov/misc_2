from functools import reduce

list1 = [2, 3, 4, 5, 6]

filtering_the_l1 = list(filter(lambda x: x%2 == 0, list1))
# filter function filters the list according to our wish
# in this case we are filtering the number which is divisible by 2 in list1

print(filtering_the_l1)

def add(x, y):
  return x+y
   
reduced_list = reduce(lambda x, y: x+y, list1)
# reduce function is used for doing mathematical operations in a list
# here, we are adding all the characters the list1

print(reduced_list)
