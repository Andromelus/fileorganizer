# Description

-----

**WARNING**

Months are written in french.

-----
Sort files in folders based on year and month of the mtime (modification time) of the file OR based on the date (YYYYMMDD) in the file name.

All the files should be in the very same folder.

# How to use

## Sort by mtime
```shell
node index.js mtime <pathofmyfiles>
```
## Sort by name date
```shell
node index.js namedate <pathofmyfiles>
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
