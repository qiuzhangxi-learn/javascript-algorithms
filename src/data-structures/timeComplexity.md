# 时间复杂度与空间复杂度
* 最坏时间复杂度
* 最好时间复杂度
* 平均时间复杂度（一般用的是这个）

## 链表

### 为什么是链表
数组可用于存储类似类型的线性数据，但数组有以下限制:

* 数组的大小是固定的：所以我们必须提前知道元素数量的上限。此外，通常，无论使用情况如何，分配的内存都等于上限。
* 在元素数组中插入新元素/删除现有元素是昂贵的：必须为新元素创建房间并创建房间现有元素必须移动但如果我们有头节点则在链接列表中我们可以通过它遍历任意一个节点，在需要的位置插入新节点。

相对于数组的优势：

* 动态数组。
* 易于插入/删除。

缺点：

* 不允许随机访问。我们必须从第一个节点（头节点）开始顺序访问元素。因此，我们无法使用默认实现有效地对链表进行二分搜索。
* 列表的每个元素都需要为指针提供额外的内存空间。 
* 对缓存不友好。由于数组元素是连续的位置，因此存在引用的局部性，而在链表的情况下则不存在。

### 链表复杂度

* 时间复杂度：

| Access    | Search    | Insertion(index) | Deletion(index)  |
| :-------: | :-------: | :-------: | :-------: |
| O(n)      | O(n)      | O(n)      | O(n)      |

* 空间复杂度：O(n)


##双向链表

### 为什么是双向链表

优点：

* 列表可以从两个方向遍历，即从头到尾或从​​尾到头。
* 可实现循环双向链表，用于实现高级数据结构。

缺点：

* 每个节点都需要稍微额外的内存来容纳前一个指针。
* 在列表上实现或执行操作时涉及大量指针。因此，应该小心处理指针，否则列表的数据可能会丢失。


循环双向链表的应用：

* 管理媒体播放器应用程序中的歌曲播放列表
* 管理在线购物中的购物车

### 双向链表复杂度

* 时间复杂度

| Access    | Search    | Insertion(index) | Deletion(index)  |
| :-------: | :-------: | :-------: | :-------: |
| O(n)      | O(n)      | O(n)      | O(n)      |

* 空间复杂度O(n)

## 队列

###类型

* 简单队列：简单队列也称为线性队列，是队列的最基本版本。这里，元素的插入（即入队操作）发生在后端，元素的移除（即出队操作）发生在前端
* 循环队列：  在循环队列中，队列的元素充当一个圆环。循环队列的工作类似于线性队列，除了最后一个元素连接到第一个元素。它的优点是可以更好地利用内存。这是因为如果有一个空白空间，即如果队列中的某个位置没有元素存在，那么可以很容易地在该位置添加一个元素。
* 优先队列：该队列是一种特殊类型的队列。它的特点是它根据某些优先级将元素排列在队列中。优先级可以是具有最高值的元素具有优先级，因此它会创建一个值递减顺序的队列。优先级也可以使得具有最低值的元素获得最高优先级，因此它依次创建一个值顺序递增的队列

### 应用
当事情不必立即处理，但必须 像广度优先 搜索一样按优先 顺序 处理时使用队列。Queue 的这一属性使其在以下场景中也很有用。

* 当一个资源在多个消费者之间共享时。示例包括 CPU 调度、磁盘调度。
* 当数据在两个进程之间异步传输时（数据不一定以与发送相同的速率接收）。示例包括 IO 缓冲区、管道、文件 IO 等。


### 实现方式
数组实现：

* 优点：易于实施。
* 缺点：静态数据结构，固定大小。

链表实现：

* 优点：易于实施，动态数据结构。


### 队列复杂度

* 时间复杂度

| Enque(insertion)    | Deque(deletion)    | Front(Get front)  | Rear(Get Rear)   |
| :-------: | :-------: | :-------: | :-------: |
| O(1)      | O(1)      | O(1)      | O(1)      |

* 空间复杂度O(n)

##堆栈

### 实现方式
####两个队列或一个队列实现

* 时间复杂度

| push    | pop   |
| :-------: | :-------: |
| O(n)      | O(1)      |

* 空间复杂度

O(n)

####链表(prepend)实现

* 时间复杂度

| push    | pop   |
| :-------: | :-------: |
| O(1)      | O(1)      |

* 空间复杂度O(n)

## 哈希表

### 为什么使用哈希表

如果您仔细观察，在平衡二叉搜索树中，如果我们尝试搜索、插入或删除任何元素，那么相同的时间复杂度为 O(logn)。现在可能会出现这样一种情况，我们的应用程序希望以更快的方式（即以更优化的方式）执行相同的操作，此时散列开始发挥作用。在散列中，上述所有操作都可以在 O(1) 即恒定时间内执行。重要的是要了解散列的最坏情况时间复杂度仍然是 O(n)，但平均情况时间复杂度是 O(1)。

### 操作方法

* HashTable：此操作用于创建新的哈希表。
* delete：此操作用于从哈希表中删除特定的键值对。
* Get：此操作用于在哈希表中搜索键并返回与该键关联的值。
* Put：此操作用于在哈希表中插入新的键值对。

### 哈希的条件
* 哈希表：存储指向与给定电话号码对应的记录的指针的数组。如果没有现有电话号码的哈希函数值等于条目的索引，则哈希表中的条目为 NIL。简单来说，我们可以说哈希表是数组的泛化。哈希表提供了一种功能，其中数据集合以这样一种方式存储，以便以后在需要时很容易找到这些项目。这使得元素的搜索非常有效。


* 散列函数：将给定的大电话号码转换为小的实用整数值的函数。映射的整数值用作哈希表中的索引。因此，简单来说，我们可以说散列函数用于将给定的键转换为特定的槽索引。它的主要工作是将每一个可能的键映射到一个唯一的槽索引中。如果每个键都映射到唯一的槽索引中，则散列函数称为完美散列函数。创建一个完美的散列函数是非常困难的，但我们作为程序员的工作就是创建这样一个散列函数，以尽可能减少冲突的次数。碰撞将在前面讨论。


* 冲突处理：由于散列函数为我们提供了一个大键的小数字，因此两个键可能产生相同的值。新插入的键映射到哈希表中已占用的槽的情况称为冲突，必须使用某种冲突处理技术来处理。以下是处理碰撞的方法：


链接：想法是使哈希表的每个单元格指向具有相同哈希函数值的记录的链接列表。链接很简单，但需要表外的额外内存

开放寻址：在开放寻址中，所有元素都存储在哈希表本身中。每个表条目都包含一条记录或 NIL。搜索元素时，我们会逐个检查表槽，直到找到所需元素或明确该元素不在表中。

### 实现方法
* 数组+链表

### 操作方法

* hash
* set
* get
* delete

### 堆复杂度
* 时间复杂度

| hash    | set    | get  | delete   |
| :-------: | :-------: | :-------: | :-------: |
| 取决于哈希函数| O(1)      | O(1)       | O(1)      |

* 空间复杂度
O(n)

## 堆

二叉堆是具有以下属性的二叉树: 

* 它是一棵完全二叉树树（除了可能的最后一层，所有层都被完全填满，最后一层的所有键都尽可能左）。二叉堆的这一特性使它们适合存储在数组中。

*  二叉堆是最小堆或最大堆。在最小二叉堆中，根处的键必须是二叉堆中所有键中的最小值。对于二叉树中的所有节点，相同的属性必须递归地为真。Max Binary Heap 类似于 MinHeap。

### 构建堆
* heapifyUp O(logn)
* add n次
因此初步时间复杂度是O(nlogn)

仔细计算：

通过观察Heapify的运行时间取决于树“h”的高度（等于 lg(n)，其中 n 是节点数）和大多数子树的高度，我们可以得出更严格的界限很小。当我们沿着树向上移动时，高度“h”会增加。Build-Heap的第 3 行从最后一个内部节点 (heapsize/2) 的高度 = 1 的索引到高度 = lg(n) 的根 (1) 的索引运行一个循环。因此，Heapify为每个节点花费不同的时间，即：
sum（0->logn）[n/2^(h+1)]*O(h) = O(n)


### 表示

二叉堆是一棵完全二叉树（不一定是满二叉树）。二叉堆通常表示为一个数组
* 根元素将位于 Arr[0]。

* 下表显示了第 i个节点的其他节点的索引，即 Arr[i]：
Arr[(i-1)/2]	返回父节点

| 返回父节点    | 返回左子节点   |	返回右子节点	|
| :-------: | :-------: | :-------: |
| Arr[(i-1)/2]  | Arr[(2*i)+1]|Arr[(2*i)+2]|

### 操作方法
* getMini()：返回Min Heap 的根元素。此操作的时间复杂度为 O(1)。
* extractMin()：从MinHeap中移除最小元素。此操作的时间复杂度为 O(Logn)，因为此操作需要在删除 root 后维护堆属性（通过调用 heapify()）。
* reduceKey()：减小key的值。此操作的时间复杂度为 O(Logn)。如果一个节点的reduces key值大于该节点的父节点，那么我们不需要做任何事情。否则，我们需要向上遍历来修复被破坏的堆属性。
* insert()：插入一个新的key需要O(Logn)时间。我们在树的末尾添加一个新键。如果新键大于它的父键，那么我们不需要做任何事情。否则，我们需要向上遍历来修复被破坏的堆属性。
* delete()：删除一个key也需要O(Logn)时间。我们通过调用 reductionKey() 将要删除的键替换为最小无限。在 reductionKey() 之后，负无穷大的值必须到达根，所以我们调用 extractMin() 来删除键。

### 应用

* 堆排序：堆排序使用二叉堆在 O(nLogn) 时间内对数组进行排序。
* 优先级队列：优先级队列可以使用二叉堆高效实现，因为它支持在 O(logn) 时间内进行 insert()、delete() 和 extractmax()、reduceKey() 操作。二叉堆和斐波那契堆是二叉堆的变体。这些变体也有效地执行联合。
* 图算法：优先级队列特别用于图算法，如Dijkstra 的最短路径和Prim 的最小生成树。
* 使用堆可以有效地解决许多问题：数组中的第 K 个最大元素、对几乎排序的数组进行排序、合并K个排序数组。


### 堆复杂度
* 时间复杂度

| build    | peek    | pop peek  | insert   | delete   |
| :-------: | :-------: | :-------: | :-------: | :-------: |
| O(nlogn)或者O(n)      | O(1)      | O(logn)      | O(logn)      | O(logn)      |

* 空间复杂度
O(n)


## 优先队列

### 优先队列的属性
优先队列是具有以下属性 的队列的扩展。

* 每个项目都有一个与之关联的优先级
* 具有高优先级的元素在具有低优先级的元素之前出列
* 如果两个元素具有相同的优先级，则根据它们在队列中的顺序提供服务

### 操作方法

* 插入优先队列
* 在优先队列中删除  
* 查看优先队列


### 应用
* CPU调度
* 涉及优先级的所有队列应用程序。
* 霍夫曼代码中的数据压缩
* 事件驱动的模拟，例如客户排队等候。
* 查找第 K 个最大/最小元素。

### 实现方式

####数组
* 时间复杂度

| peek    | enqueue    | dequeue  |
| :-------: | :-------: | :-------: |
| O(n)      | O(1)      | O(n)      |

* 空间复杂度O(n)

####链表
* 时间复杂度

| peek    | enqueue    | dequeue  |
| :-------: | :-------: | :-------: |
| O(1)      | O(n)      | O(1)      |

* 空间复杂度O(n)

####堆
* 时间复杂度

| peek    | enqueue    | dequeue  |
| :-------: | :-------: | :-------: |
| O(1)      | O(log n)      | O(log n)      |

* 空间复杂度O(n)

####二叉搜索树
* 时间复杂度

| peek    | enqueue    | dequeue  |
| :-------: | :-------: | :-------: |
| O(1) | O(log n) | O(log n) |

* 空间复杂度O(n)


## 字典树

### 实现方式
* 树+哈希表

### 操作方法
* addWord
* deleteWord
* suggestNextAllWords（前序)遍历字典树

### 字典树复杂度

* 时间复杂度

| addWord    | deleteWord    | suggestNextAllWords  |
| :-------: | :-------: | :-------: |
| O(n) | O(n) | O(n^h) |

* 空间复杂度O(n)


## 二叉搜索树BST

二叉搜索树是一种基于节点的二叉树数据结构，具有以下属性：

* 节点的左子树仅包含键小于节点键的节点。
* 节点的右子树仅包含键大于节点键的节点。
* 左右子树也必须是二叉搜索树。



### 为什么二叉搜索树，而不选择哈希表

哈希表支持 Θ(1) 时间内的以下操作。1) 搜索 2) 插入 3) 删除 在自平衡二叉搜索树 (BST)（如红黑树、AVL 树、展开树等）中，上述操作的时间复杂度为 O(Logn)。所以哈希表似乎在所有常见操作中都击败了 BST。什么时候我们应该更喜欢 BST 而不是哈希表，有什么优势。以下是支持 BST 的一些要点。

* 我们可以通过 BST 的 Inorder Traversal 来得到所有的键。这不是哈希表中的自然操作，需要额外的努力。
* 使用BST很容易进行顺序统计、查找最接近的较低和较大元素、进行范围查询。像排序一样，这些操作不是哈希表的自然操作。
* 与哈希表相比，BST 易于实现，我们可以轻松实现自己定制的 BST。为了实现Hashing，我们一般依赖编程语言提供的库。
* 使用自平衡 BST，所有操作都可以保证在 O(Logn) 时间内工作。但是对于散列，Θ(1) 是平均时间，一些特定的操作可能成本很高，即 O(n 2 )，尤其是在表调整大小时。
* 在 BST 中，我们可以有效地进行范围搜索，但在哈希表中，我们不能有效地进行范围搜索。
* BST 是内存高效的，但哈希表不是。


### 操作方法

* search
* insert
* delete
* traversal (preorder)


### BST复杂度

* 时间复杂度

| search    | insert    | delete  | traversal (preorder)|
| :-------: | :-------: | :-------: | :-------: |
| O(logn) ~ O(n) | O(logn) ~ O(n) | O(logn) ~ O(n) | O(n) |

* 空间复杂度O(n)

## 自平衡二叉搜索树AVL Tree

在 AVL 树中，任何节点的两个子子树的高度最多相差 1；如果在任何时候它们的差异超过一个，则会进行重新平衡以恢复此属性。在平均情况和最坏情况下，查找、插入和删除都需要O(log n)时间，其中 n 是操作之前树中的节点数。插入和删除可能需要通过一个或多个树旋转来重新平衡树。


### 操作方法
* search
* insert
* delte
* traversal (preorder)


### 保持平衡的规则的方法（插入和删除）

### 插入点开始向上查看balance
### 删除点父节点向上查看balance
node.balance = left.height - right.high

* node.balance > 1 && node.left.balance > 0: RR rotate(node)
* ode.balance > 1 && node.left.balance < 0: LR rotate(node) = LL rotate(node.left) RR rotate(node)
* node.balance < -1 && node.left.balance < 0: LL rotate(node)
* node.balance > 1 && node.left.balance < 0: RL rotate(node) = RR rotate(node.right) LL rotate(node)

### 与红黑树的比较：

比较：AVL 树和其他自平衡搜索树（如红黑）对于在 O(log n) 时间内完成所有基本操作很有用。与红黑树相比，AVL 树更平衡，但它们在插入和删除过程中可能会导致更多的旋转。因此，如果您的应用程序涉及许多频繁的插入和删除，那么应该首选红黑树。如果插入和删除不那么频繁，而搜索是更频繁的操作，那么 AVL 树应该优先于红黑树。



### AVL复杂度

* 时间复杂度

| search    | insert    | delete  | traversal (preorder)|
| :-------: | :-------: | :-------: | :-------: |
| O(logn)| O(logn) | O(logn)) |O(n)|

旋转操作（左旋转和右旋转）需要恒定的时间，因为那里只有几个指针被改变。更新高度和获取平衡因子也需要一定的时间。因此 AVL 插入的时间复杂度与 BST 插入的时间复杂度相同，即 O(h)，其中 h 是树的高度。由于 AVL 树是平衡的，因此高度为 O(Logn)。所以 AVL 插入的时间复杂度是 O(Logn)。

* 空间复杂度O(n)

## 红黑树

红黑树是一种自平衡二叉搜索树，其中每个节点都有一个额外的位，并且该位通常被解释为颜色（红色或黑色）。这些颜色用于确保树在插入和删除期间保持平衡。虽然树的平衡并不完美，但减少搜索时间并将其保持在 O(log n) 时间左右就足够了，其中 n 是树中元素的总数。

###每棵红黑树都遵循的规则： 
* 每个节点都有红色或黑色的颜色。（插入的节点总是红的，后根据规则作作变换）
* 树的根总是黑色的。
* 没有两个相邻的红色节点（红色节点不能有红色父节点或红色子节点）。
* 从节点（包括根）到其任何后代 NULL 节点的每条路径都具有相同数量的黑色节点。
* 所有叶子节点(null)都是黑色节点。

### 红黑树的其他特性
* 红黑树的黑色高度是从根节点到叶节点的路径上的黑色节点数。叶节点也算作黑色节点。因此，高度为 h 的红黑树的黑色高度 >= h/2。
* 具有 n 个节点的红黑树的高度为 h<= 2 log 2 (n + 1)。
* 所有叶子 (NIL) 都是黑色的。
* 节点的黑色深度定义为从根到该节点的黑色节点数，即黑色祖先的数量。
* 每棵红黑树都是二叉树的特例。


## 保持红黑树规则的方法

### 插入

balance:{}

* isNodeBlack(node.parent): none

		if (this.isNodeBlack(node.parent)) {
            return;
        }
* node.uncle && this.isNodeRed(node.uncle)： change color 后递归向上

		if (node.uncle && this.isNodeRed(node.uncle)) {
            this.makeNodeBlack(node.parent);
            this.makeNodeBlack(node.uncle);
            this.makeNodeRed(grandParent);
            if (this.nodeComparator.equal(grandParent, this.root)) {
                this.makeNodeBlack(this.root);
                return;
            }
            this.balance(grandParent);
        }

*  !node.uncle || isNodeBlack(node.uncle):LL LR RR RL(node.parent.parent)


		else if (!node.uncle || this.isNodeBlack(node.uncle)) {
            if (grandParent) {
                let newGrandParent;
                if (this.nodeComparator.equal(node.parent, grandParent.left)) {
                    if (this.nodeComparator.equal(node, node.parent.left)) {
                        newGrandParent = this.rotateRightRight(grandParent);
                    } else {
                        newGrandParent = this.rotateLeftRight(grandParent);
                    }
                } else {
                    if (this.nodeComparator.equal(node, node.parent.right)) {
                        newGrandParent = this.rotateLeftLeft(grandParent);
                    } else {
                        newGrandParent = this.rotateRightLeft(grandParent);
                    }
                }

                if (newGrandParent && !newGrandParent.parent) {
                    this.root = newGrandParent;
                    this.makeNodeBlack(this.root);
                }
            }
        }

### 删除
		nodeToReplace as u
		replaceNode as v
		const deleteAndReplaceBlack = ((replaceNode == null || this.isNodeBlack(replaceNode)) && this.isNodeBlack(nodeToReplace));

#### step1: judege delete leaf node (case1)
#### step2: judege delete node that have one children(those nodes have two children will be recursed to leaf node or have one children) (case2)
#### step3: remove(value)

* case 1.a deleteAndReplaceBlack: fixDoubleBlack(nodeToReplace)

		if (!replaceNode) {
            if (deleteAndReplaceBlack) {
                //case 1.2 deleteAndReplaceBlack
                this.fixDoubleBlack(nodeToReplace);
            }
            //case 1.3 delete and replace one red one black
            //because null node always is black node, so if leaf node is red, just delete. That does not change black deep.
        } 

* case 2.a deleteAndReplaceBlack: fixDoubleBlack(nodeToReplace)

* case 2.b !deleteAndReplaceBlack: makeNodeBlack(replaceNode);

		else {
            //case 2 delete node that have one children(those nodes have two children will be recursed to leaf node or have one children)
            if (deleteAndReplaceBlack) {
                //case a deleteAndReplaceBlack
                this.fixDoubleBlack(nodeToReplace);
            } else {
                //case b delete and replace one red one black
                // if delete node is red, no need to change
                // if delete node is black, just need to make replace node as black node
                this.makeNodeBlack(replaceNode);
            }
        }

#### fixDoubleBlack双黑 势必一个分支黑色高度会减1

##### step1 judge no sibling(case1): 向上递归fixDoubleBlack
##### step2 jude have sibling(case2): LL、RR、LR、RL、changeColor

* case1.1 no sibling

		if (!nodeToReplace.sibling) {
            //case 1 no sibling
            //because one branch's black deep reduce one, so the other also branch need to reduce.
            //just recurse to the parent of nodeToReplace
            this.fixDoubleBlack(nodeToReplace.parent);
        }

* case 2.1 sibling is black node and at least one of sibling's children is red
* case 2.2 sibling is black node and both two children are black
* case 2.1.1 sibling is black left node and have left red or both red children:  makeNodeBlack + rotateRightRight
* case 2.1.2 sibling is black left node and just have right red children: makeNodeBlack + rotateLeftLeft + rotateRightRight
* case 2.1.3 sibling is black right node and have right red or both red children： makeNodeBlack + rotateLeftLeft
* case 2.1.4 sibling is black left node and just have right red children： makeNodeBlack + rotateRightRight + rotateLeftLeft

* case 2.2.1 sibling is black node and both two children are black and sibling parent  is red : makeNodeRed + makeNodeBlack
* case 2.2.1 sibling is black node and both two children are black and sibling parent  is black： makeNodeRed + 向上递归fixDoubleBlack

		else {
            //case 2 have sibling
            if (this.isNodeBlack(nodeToReplace.sibling) && (this.haveRedLeftChildren(nodeToReplace.sibling)
            || this.haveRedRightChildren(nodeToReplace.sibling))) {
                //case 2.1 sibling is black node and at least one of sibling's children is red
                // one brach black deep +1 by this red node, that leads to balance

                if (this.nodeComparator.equal(nodeToReplace.sibling, nodeToReplace.parent.left)) {
                    if (this.haveRedLeftChildren(nodeToReplace.sibling)) {
                        //case 2.1.1 sibling is black left node and have left red or both red children
                        //make this left node as black children
                        this.makeNodeBlack(nodeToReplace.sibling.left);
                        //perform right right rotation
                        this.rotateRightRight(nodeToReplace.sibling.parent);
                    } else {
                        //case 2.1.2 sibling is black left node and just have right red children
                        //make this red left children as black children
                        this.makeNodeBlack(nodeToReplace.sibling.right);
                        //perform left right rotation
                        this.rotateLeftLeft(nodeToReplace.sibling);
                        this.rotateRightRight(nodeToReplace.sibling.parent);
                    }
                } else {
                    if (this.haveRedRightChildren(nodeToReplace.sibling)) {
                        //case 2.1.3 sibling is black right node and have right red or both red children
                        //make this right node as black children
                        this.makeNodeBlack(nodeToReplace.sibling.right);
                        //perform left left rotation
                        this.rotateLeftLeft(nodeToReplace.sibling.parent);
                    } else {
                        //case 2.1.4 sibling is black left node and just have right red children
                        //make this red right children as black children
                        this.makeNodeBlack(nodeToReplace.sibling.left);
                        //perform right left rotation
                        this.rotateRightRight(nodeToReplace.sibling);
                        this.rotateLeftLeft(nodeToReplace.sibling.parent);
                    }
                }
            } else if (this.isNodeBlack(nodeToReplace.sibling) && !this.haveRedLeftChildren(nodeToReplace.sibling)
            && !this.haveRedRightChildren(nodeToReplace.sibling)) {
                //case 2.2 sibling is black node and both two children are black
                //one branch black deep reduce one by make black Node as red node
                // first change the sibling to red
                this.makeNodeRed(nodeToReplace.sibling);
                if (this.isNodeRed(nodeToReplace.sibling.parent)) {
                    // if nodeToReplace.sibling.parent is red,
                    //let it also to be black so the higher and other branch black deep increase one so that the tree balance
                    this.makeNodeBlack(nodeToReplace.sibling.parent);
                } else {
                    // if nodeToReplace.sibling.parent is black, keep recurse to make other branch black deep increase one so that the tree balance
                    this.fixDoubleBlack(nodeToReplace.sibling.parent);
                }
            }
        }






### 红黑树复杂度

* 时间复杂度

| search    | insert    | delete  | traversal (preorder)|
| :-------: | :-------: | :-------: | :-------: |
| O(logn)| O(logn) | O(logn)) |O(n)|


* 空间复杂度O(n)


## 线段树

在计算机科学中，段树也称为统计树，是一种树数据结构，用于存储有关区间或段的信息。它允许查询哪些存储的段包含给定点。原则上（可变化），它是一个静态结构；也就是说，它是一种一旦建成就无法修改的结构。一个类似的数据结构是区间树。

段树是二叉树。树的根代表整个数组。根的两个孩子代表数组的前半部分和后半部分。同样，每个节点的子节点对应于该节点对应的数组的两半。

### 为什么线段树
线段树专门用于解决以下问题：

* 范围化操作： 如求从索引 l 到 r 的元素之和，其中 0 <= l <= r <= n-1
* 更新数组某一指定元素

一般情况下的解决方案：

* method1 arr[n] 存储各元素的值

更新一个值：O(1)

范围话操作：O(n)

* method2 arr[i] 存储start~ i元素的和

更新一个值：O(n)

范围话操作：O(1)

*线段树
更新一个值：O(logn)

范围话操作：O(logn)


### 线段树复杂度

* 时间复杂度

| build    | search  segemtn | update one element |
| :-------: | :-------: | :-------: |
| O(n)| O(logn) | O(logn)) |


* 空间复杂度O(2*n): segment[2n-1]

## 二叉索引树

Fenwick 树或二叉索引树是一种数据结构与线段树类似，可以有效地更新元素并计算数字表中的前缀和。


### 为什么二叉索引树

线段树专门用于解决以下问题：

* 范围化(所有前缀)操作： 如求从索引 l 到 i 的元素之和
* 更新数组某一指定元素

但它的结构是存放0到i的范围操作 可以通过其他操作转而进行l到i的操作


* method1 arr[n] 存储各元素的值

更新一个值：O(1)

范围话操作：O(n)

* method2 arr[i] 存储0~ i元素的和

更新一个值：O(n)

范围话操作：O(1)

* method3 使用在 O(Logn) 时间内执行这两种操作的Segment Tree 。

更新一个值：O(logn)

范围话操作：O(logn)

* method 4 二叉索引树

更新一个值：O(logn)

范围话操作：O(logn)



### 线段树复杂度

* 时间复杂度

| build    | search  segemtn | update one element |
| :-------: | :-------: | :-------: |
| O(n)| O(logn) | O(logn)) |


* 空间复杂度O(n): segment[n+1]




 



