import cv2 
import numpy as np 
import base64


# jpg_img = cv2.imEncode('.jpg', img)
# b64_string = base64.b64encode(jpg_img[1]).decode('utf-8')

#[[0] * len(grid) for _ in range(len(grid))]

class Node:

    def __init__(self,data,next=None):
        self.data = data
        self.next_node = next


class LL:

    def __init__(self,data):
        self.head = Node(data)
        self.head.next_node = self.head
        self.last = self.head
        self.size = 1

    def add(self,data,reverse=False):
        
        if reverse == False:
            
            self.head = Node(data,self.head)
            self.last.next_node = self.head
            
        else:
            node = self.head 
            while node.next_node is not None:
                node = node.next_node
                
            node.next_node = Node(data)
        
        self.size += 1
    def print_LL (self):

        node = self.head
        while node is not None:
            print(node.data)
            node = node.next_node

            if node == self.last:
                print(node.data)
                print('last node')
                break

    def delete(self,data):

        node = self.head

        if node.data == data:
            self.head = self.head.next_node
            return 

        while node is not None:
            if node.next_node is not None and node.next_node.data == data:
                node.next_node = node.next_node.next_node
                return
            node = node.next_node
        print("not in list")


class Node2:

    def __init__(self,data,next=None,prev=None):
        self.data = data
        self.prev = prev
        self.next = next


class LL2:

    def __init__(self,data):
        self.head = Node2(data)
        self.size = 0

    def add(self,data):
        self.head = Node2(data,self.head)
        self.head.next.prev = self.head
        self.size += 1

    def delete(self,data):
        node = self.head
        while node is not None:
            if node.data == data:
                temp = node 
                node = node.prev 
                node.next = temp.next 
                node.next.prev = temp.prev 
            else:
                node = node.next


    def print_LL (self):

        node = self.head
        while node is not None:
            print(node.data)
            node = node.next

           


# x = LL(1)
# x.add(69)
# x.add(33)
# x.add(53)
# x.add(23)

# # temp = x.head
# # for i in range(7):
# #     print(temp.data)
# #     temp = temp.next_node

# # x.delete(33)
# x.print_LL()

x = LL2(1)
x.add(69)
x.add(33)
x.add(53)
x.add(23)



x.delete(33)
# x.print_LL()
temp = x.head
temp = temp.next.next
print(temp.data)
    


#TREEE
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
# class Solution:
#     def sortedListToBST(self, head: ListNode) -> TreeNode:
        
#         arr = []
#         node = head 
        
#         while node is not None:
#             arr.append(node.val)
#             node = node.next
        
#         tree = self.makeTree(arr,0,len(arr)-1)
        
        
        
#         return tree
        
#     def makeTree(self, arr,start,end):
#         if start > end:
#             return None
        
#         mid = int((start+end)/2)
#         root = TreeNode(arr[mid])
        
#         if start == end:
#             return root 
        
#         root.left = self.makeTree(arr,start,mid-1)
#         root.right = self.makeTree(arr,mid+1,end)
        
#         return root