//输入：x，y，即当前位置坐标
//      dx，dy，即目标位置
//      map，即要搜索的矩阵
//输出：nextX，nextY，即下一步位置坐标

var next={};
next.x=0;
next.y=0;
function deepSearch(x,y,dx,dy,map){//起点

}

function doSearch(){
    //如果下一节点可走，当前x，y设置为下一节点，继续判断，直到找到目标位置
    //否则当前x，y不可用
    var result=false;
    if(!result){//寻找下一个节点

    }else{
        return next;
    }
}

//三叉树数据结构
ThreeTree={}
//算法描述
/*
DFS (V, E) {
for each vertex u in V[G]   //对于图中每个节点
do color[u] ← WHITE
π[u] ← NIL
time ← 0
for each vertex u in V[G]
do if color[u] ← WHITE
then DFS-Visit(u)     //build a new DFS-tree from u
}
 

 
DFS-Visit(u) {
color[u] ← GRAY    //discover u
time ← time + 1
d[u] ← time
for each vertex v adjacent to u     // explore (u, v) 
do if color[v] ← WHITE
then π[v] ← u
DFS-Visit(v)
color[u] ← BLACK
time ← time + 1
f[u] ← time    //we are done with u 
}
*/