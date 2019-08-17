# Description

**WARNING**

Months are written in french.

Sort files in folders based on year and month of the mtime (modification time) of the file.

All the files should be in the very same folder.

# How to use

```shell
node index.js <pathofmyfiles>
```

# Example

## Before

```
+-- 2019-january.file  
+-- 2018-october.file  
+-- 2018-september.file
```

## After

```
+-- 2019  
|    +-- january  
|    |   +-- 2019-januray.file  
+-- 2018  
|    +-- october  
|    |   +-- 2018-october.file  
|    +-- september  
|    |   +-- 2018-september.file
```  
